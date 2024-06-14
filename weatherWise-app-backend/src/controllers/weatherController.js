const axios = require('axios');
const { validationResult } = require('express-validator');
const Weather = require('../models/weather');
const redis = require('../config/redis');
const { format, parseISO } = require('date-fns');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const getWeatherByCity = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const city = req.params.city;
    const weatherKey = city;

    try {
        const cachedWeather = await redis.get(weatherKey);
        if (cachedWeather) {
            return res.json(JSON.parse(cachedWeather));
        }

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`);
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}`);

        const weatherData = response.data;
        const forecastData = forecastResponse.data;

        const weather = {
            city: weatherData.name,
            date: new Date().toISOString().split('T')[0],
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            forecast: {
                weekly: extractWeeklyForecast(forecastData.list),
                monthly: extractMonthlyForecast(forecastData.list)
            }
        };

        await Weather.create(weather);
        await redis.set(weatherKey, JSON.stringify(weather), 'EX', 3600); // Cache for 1 hour

        res.json(weather);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getWeeklyForecast = async (req, res) => {
    const city = req.params.city;

    try {
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}`);
        const forecastData = forecastResponse.data;

        const weeklyForecast = extractWeeklyForecast(forecastData.list);

        res.json(weeklyForecast);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMonthlyForecast = async (req, res) => {
    const city = req.params.city;

    try {
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}`);
        const forecastData = forecastResponse.data;

        const monthlyForecast = extractMonthlyForecast(forecastData.list);

        res.json(monthlyForecast);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Helper functions to extract and format forecast data
function extractWeeklyForecast(data) {
    // Extract data points every 8th index (every 24 hours) for 7 days
    return data.filter((item, index) => index % 8 === 0).slice(0, 7).map(item => ({
        date: format(parseISO(item.dt_txt), 'yyyy-MM-dd'), // Format the date
        weather: item.weather[0],
        temp: item.main.temp
    }));
}

function extractMonthlyForecast(data) {
    // Extract data points every 8th index (every 24 hours) for a month (30 days)
    return data.filter((item, index) => index % 8 === 0).slice(0, 30).map(item => ({
        date: format(parseISO(item.dt_txt), 'yyyy-MM-dd'), // Format the date
        weather: item.weather[0],
        temp: item.main.temp
    }));
}

module.exports = {
    getWeatherByCity,
    getWeeklyForecast,
    getMonthlyForecast
};
