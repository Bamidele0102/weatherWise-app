const express = require('express');
const { getWeatherByCity, getWeeklyForecast, getMonthlyForecast } = require('../controllers/weatherController');
const router = express.Router();

router.get('/:city', getWeatherByCity);
router.get('/forecast/weekly/:city', getWeeklyForecast);
router.get('/forecast/monthly/:city', getMonthlyForecast);

module.exports = router;
