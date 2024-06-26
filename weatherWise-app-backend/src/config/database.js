const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Enable logging in development
    pool: {
        max: 10, // Maximum number of connection in pool
        min: 0, // Minimum number of connection in pool
        acquire: 30000, // Maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 // Maximum time, in milliseconds, that a connection can be idle before being released
    }
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Error: ' + err));

module.exports = sequelize;
