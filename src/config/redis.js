const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || null,
});

redis = redis.on('error', (err) => {
    console.error('Redis error: ', err);
});
redis = redis.on('connect', () => {
    console.log('Redis connected');
});

module.exports = redis;
