const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Weather = sequelize.define('Weather', {
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    forecast: {
        type: DataTypes.JSON,
        allowNull: false
    }
});

module.exports = Weather;
