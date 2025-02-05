const redis = require('redis');

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379
    },
    password: process.env.REDIS_PASSWORD, // Variable d'environnement
});

// Gérer les erreurs Redis
redisClient.on('error', (err) => {
    console.error('Erreur Redis:', err);
    
    // Tentative de reconnexion après 5 secondes
    setTimeout(() => {
        redisClient.connect().catch(err => {
            console.error('Nouvel échec de connexion à Redis:', err);
        });
    }, 5000);
});

// Connexion
redisClient.connect().then(() => {
    console.log('✅ Connecté à Redis');
}).catch((err) => {
    console.error('❌ Échec de la connexion à Redis:', err);
});

module.exports = redisClient;
