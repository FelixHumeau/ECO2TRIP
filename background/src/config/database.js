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
    console.error('Erreur Redis:', err);
    console.error('Fermeture du serveur...');
    process.exit(1); // Arrêter le serveur
});

// Connexion
redisClient.connect().then(() => {
    console.log('Connecté à Redis');
}).catch((err) => {
    console.error(' Échec de la connexion à Redis:', err);
    process.exit(1); // Arrêter le serveur si la connexion échoue
});

module.exports = redisClient;
