const redis = require('redis');

const redisClient = redis.createClient({
    socket: {
        host: '127.0.0.1',
        port: 6379
    },
    password: process.env.REDIS_PASSWORD, // Utilisation de la variable d'environnement
});

// Gérer les erreurs Redis
redisClient.on('error', (err) => {
    console.error('❌ Erreur Redis:', err);
});

// Connexion
redisClient.connect().then(() => {
    console.log('✅ Connecté à Redis');
});

module.exports = redisClient;
