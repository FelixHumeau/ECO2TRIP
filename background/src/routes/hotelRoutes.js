const express = require('express');
const redisClient = require('../config/database'); // Connexion Redis

const router = express.Router();
const HOTEL_LIMIT = process.env.HOTEL_LIMIT || 4; // Nombre d'hôtels à récupérer

// Fonction pour récupérer les clés des hôtels avec SCAN
async function getHotelKeys() {
    let cursor = '0';
    let hotelKeys = [];

    do {
        const result = await redisClient.scan(cursor, 'MATCH', 'hotel:*', 'COUNT', 100);
        cursor = result[0];
        hotelKeys = hotelKeys.concat(result[1]);
    } while (cursor !== '0');

    return hotelKeys;
}

// Route pour récupérer les hôtels
router.get('/test', async (req, res) => {
    try {
        const redisCacheKey = `hotels:first_${HOTEL_LIMIT}`;
        const cachedHotels = await redisClient.get(redisCacheKey);

        if (cachedHotels) {
            console.log("⚡ Résultat récupéré depuis le cache Redis !");
            return res.json(JSON.parse(cachedHotels));
        }

        // Récupérer toutes les clés des hôtels avec SCAN
        const keys = await getHotelKeys();

        if (keys.length === 0) {
            return res.json({ message: 'Aucun hôtel trouvé dans Redis.' });
        }

        // Prendre les premiers hôtels en fonction de la variable HOTEL_LIMIT
        const firstNKeys = keys.slice(0, HOTEL_LIMIT);
        const hotels = await Promise.all(firstNKeys.map(async (key) => {
            return await redisClient.hGetAll(key);
        }));

        // 🏦 Stocker les résultats en cache avec expiration (1 heure)
        await redisClient.set(redisCacheKey, JSON.stringify(hotels), 'EX', 3600);

        res.json(hotels);
    } catch (error) {
        console.error('❌ Erreur lors de la récupération des hôtels:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
