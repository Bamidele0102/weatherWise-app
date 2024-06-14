const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database');
const Weather = require('./models/weather');
const feedbackRoutes = require('./routes/feedbackRoutes');

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration
require('dotenv').config();

app.use(cors({ origin: process.env.FRONTEND_URL }));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Weather App API');
});

// Import routes
const weatherRoutes = require('./routes/weatherRoutes');
app.use('/api/weather', weatherRoutes);

// Use feedback routes
app.use('/api/feedback', feedbackRoutes);

sequelize.sync({ force: true }).then(() => {
    console.log("Database & tables created!");
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
