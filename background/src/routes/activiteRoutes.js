const express = require('express');
const redisClient = require('../config/database'); // Import de Redis
const { findActivitiesByTags } = require('../config/redisService');
const { groupActivitiesByCity } = require('../config/redisService');

const router = express.Router();

// Route pour récupérer les 10 premières activités
router.get('/test', async (req, res) => {
    try {
        // Récupérer toutes les clés qui commencent par "activite:*"
        async function getActivityKeys() {
            let cursor = '0';
            let activityKeys = [];
        
            do {
                const result = await redisClient.scan(cursor, 'MATCH', 'activite:*', 'COUNT', 100);
                cursor = result[0];
                activityKeys = activityKeys.concat(result[1]);
            } while (cursor !== '0');
        
            return activityKeys;
        }
        
        const keys = await getActivityKeys();
        

        if (keys.length === 0) {
            return res.json({ message: 'Aucune activité trouvée dans Redis.' });
        }

        // Trier et prendre les 3 premières clés
        const first3Keys = keys.slice(0, 3)
        const activites = (await Promise.all(first3Keys.map(async (key) => {
            const data = await redisClient.hGetAll(key);
            if (!data.Nom_du_POI) {
                console.warn(`Activité vide ou incorrecte : ${key}`);
                return null;
            }
        
            return {
                key: key,
                nom: data.Nom_du_POI || "Nom inconnu",
                description: data.Description || "Description non disponible",
                adresse: data.Adresse_postale || "Adresse inconnue",
                tags: data.Tags ? JSON.parse(data.Tags.replace(/\\/g, '').replace(/'/g, '"')) : [],
                coordonnees: {
                    latitude: data.Latitude ? parseFloat(data.Latitude) : null,
                    longitude: data.Longitude ? parseFloat(data.Longitude) : null
                }
            };
        }))).filter(activity => activity !== null);
        

        res.json(activites);
    } catch (error) {
        console.error('Erreur lors de la récupération des activités:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.post('/search', async (req, res) => {
    const { from, tags } = req.body;
    if (!from || !tags || !Array.isArray(tags)) {
        return res.status(400).json({ error: "La ville de départ et une liste de tags sont requises." });
    }

    try {
        // 🔍 Vérifier si le résultat est déjà en cache
        const cacheKey = `search:${from}:${tags.sort().join(',')}`;
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log("⚡ Résultat récupéré depuis le cache Redis !");
            return res.json(JSON.parse(cachedData));
        }

        // 📌 Exécuter les recherches normalement
        const activities = await findActivitiesByTags(tags);
        const groupedActivities = await groupActivitiesByCity(activities, from);

        // 🏦 Stocker le résultat en cache avec expiration (1 heure)
        await redisClient.set(cacheKey, JSON.stringify(groupedActivities), 'EX', 3600);

        res.json(groupedActivities);
    } catch (error) {
        console.error("❌ Erreur lors du regroupement des activités :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});



module.exports = router;
