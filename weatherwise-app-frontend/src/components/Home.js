import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Grid, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { WiDaySunny, WiRain, WiCloudy, WiSnow } from 'weather-icons-react';
import useStyles from '../styles';
import LoadingAnimation from './LoadingAnimation';
import ErrorMessage from './ErrorMessage';
import { format, parseISO, startOfMonth, endOfMonth, addMonths } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Home() {
    const classes = useStyles();
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [weeklyForecast, setWeeklyForecast] = useState([]);
    const [monthlyForecast, setMonthlyForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (weather) {
            console.log('Weather state:', weather);
            getWeeklyForecast(weather.city);
            getMonthlyForecast(weather.city);
        }
    }, [weather]);

    const getWeather = async () => {
        setLoading(true);
        setError('');
        try {
            console.log(`Fetching weather data for city: ${city}`);
            const response = await axios.get(`${API_BASE_URL}/weather/${city}`);
            console.log('Weather data:', response.data);
            setWeather(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Error fetching weather data. Please try again.');
        }
        setLoading(false);
    };

    const useCurrentLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setLoading(true);
                setError('');
                try {
                    console.log(`Fetching weather data for coordinates: lat=${latitude}, lon=${longitude}`);
                    const response = await axios.get(`${API_BASE_URL}/weather/coordinates?lat=${latitude}&lon=${longitude}`);
                    console.log('Weather data:', response.data);
                    setWeather(response.data);
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                    setError('Error fetching weather data. Please try again.');
                }
                setLoading(false);
            });
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    const getWeeklyForecast = async (city) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/weather/forecast/weekly/${city}`);
            setWeeklyForecast(response.data.slice(0, 7)); // Slice to show only first 7 days
        } catch (error) {
            console.error('Error fetching weekly forecast:', error);
        }
    };

    const getMonthlyForecast = async (city) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/weather/forecast/monthly/${city}`);
            setMonthlyForecast(response.data);
        } catch (error) {
            console.error('Error fetching monthly forecast:', error);
        }
    };

    const renderWeatherIcon = (description) => {
        switch (description.toLowerCase()) {
            case 'clear sky':
                return <WiDaySunny size={24} color='#000' />;
            case 'few clouds':
            case 'scattered clouds':
            case 'broken clouds':
            case 'overcast clouds':
                return <WiCloudy size={24} color='#000' />;
            case 'light rain':
            case 'moderate rain':
            case 'heavy intensity rain':
            case 'very heavy rain':
            case 'extreme rain':
            case 'freezing rain':
                return <WiRain size={24} color='#000' />;
            case 'snow':
            case 'light snow':
            case 'shower snow':
            case 'sleet':
                return <WiSnow size={24} color='#000' />;
            default:
                return <WiDaySunny size={24} color='#000' />;
        }
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateString = format(date, 'yyyy-MM-dd');
            const dayForecast = weeklyForecast.find(day => format(parseISO(day.date), 'yyyy-MM-dd') === dateString) ||
                                monthlyForecast.find(day => format(parseISO(day.date), 'yyyy-MM-dd') === dateString);

            if (dayForecast) {
                return (
                    <div>
                        {renderWeatherIcon(dayForecast.weather.description)}
                        <Typography variant="caption">{dayForecast.temp} K</Typography>
                    </div>
                );
            }
        }
        return null;
    };

    return (
        <div className={classes.coverImage}>
            <Container className={classes.container}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Weather Forecast
                </Typography>
                {error && <ErrorMessage message={error} />}
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <TextField
                            label="Enter city name"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item>
                        <IconButton onClick={useCurrentLocation}>
                            <LocationOnIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={getWeather} disabled={loading}>
                    {loading ? <LoadingAnimation /> : 'Get Weather'}
                </Button>

                {weather && (
                    <Grid container spacing={4} style={{ marginTop: '20px' }}>
                        <Grid item xs={12}>
                            <Typography variant="h4" component="h2">
                                {weather.city}
                            </Typography>
                            <Typography variant="h6">
                                {renderWeatherIcon(weather.description)} {weather.description}
                            </Typography>
                            <Typography variant="h5">
                                Temperature: {weather.temperature} K
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.calendarContainer}>
                                <Typography variant="h6" component="h3">
                                    Weekly Forecast
                                </Typography>
                                <Grid container spacing={2}>
                                    {weeklyForecast.map(day => (
                                        <Grid key={day.date} item xs={6} sm={4} md={2}>
                                            <div style={{ textAlign: 'center' }}>
                                                <Typography variant="subtitle2">{format(parseISO(day.date), 'EEE')}</Typography>
                                                {renderWeatherIcon(day.weather.description)}
                                                <Typography variant="caption">{day.temp} K</Typography>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.calendarContainer}>
                                <Typography variant="h6" component="h3">
                                    Monthly Forecast
                                </Typography>
                                <Calendar
                                    tileContent={tileContent}
                                    value={new Date()}
                                    view="month"
                                    minDetail="month"
                                    maxDetail="month"
                                />
                            </div>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </div>
    );
}

export default Home;
