const express = require('express');
const redisClient = require('../config/database'); // Connexion Redis

const router = express.Router();

// Route pour récupérer les 10 premiers hôtels
router.get('/test', async (req, res) => {
    try {
        // Récupérer toutes les clés des hôtels
        const keys = await redisClient.keys('hotel:*');

        if (keys.length === 0) {
            return res.json({ message: 'Aucun hôtel trouvé dans Redis.' });
        }

        // Prendre les 10 premiers hôtels
        const first10Keys = keys.slice(0, 10);
        const hotels = [];

        for (const key of first10Keys) {
            const data = await redisClient.hGetAll(key);
            hotels.push(data);
        }

        res.json(hotels);
    } catch (error) {
        console.error(' Erreur lors de la récupération des hôtels:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
