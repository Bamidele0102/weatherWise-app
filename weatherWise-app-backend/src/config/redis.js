// config/redis.js
const Redis = require('ioredis');

const redis = new Redis({
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || '127.0.0.1',
});

redis.on('error', (err) => {
    console.error('Redis error:', err);
});

module.exports = redis;
