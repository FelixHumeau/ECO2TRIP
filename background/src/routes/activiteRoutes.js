const express = require('express');
const redisClient = require('../config/database'); // Import de Redis
const { findActivitiesByTags } = require('../config/redisService');
const { groupActivitiesByCity } = require('../config/redisService');

const router = express.Router();

// Route pour récupérer les 10 premières activités
router.get('/test', async (req, res) => {
    try {
        // Récupérer toutes les clés qui commencent par "activite:*"
        const keys = await redisClient.keys('activite:*');

        if (keys.length === 0) {
            return res.json({ message: 'Aucune activité trouvée dans Redis.' });
        }

        // Trier et prendre les 3 premières clés

        const first3Keys = keys.slice(0, 3);

        // Récupérer les détails des activités
        const activites = [];
        
        for (const key of first3Keys) {
            const data = await redisClient.hGetAll(key);
            if (!data.Nom_du_POI) {
                console.warn(`Activité vide ou incorrecte : ${key}`);
                continue; // Ignore les activités incomplètes
            }

            activites.push({
                key: key, // Ajoute l'identifiant
                nom: data.Nom_du_POI || "Nom inconnu",
                description: data.Description || "Description non disponible",
                adresse: data.Adresse_postale || "Adresse inconnue",
                tags: data.Tags ? JSON.parse(data.Tags.replace(/\\/g, '').replace(/'/g, '"')) : [],
                coordonnees: {
                    latitude: data.Latitude ? parseFloat(data.Latitude) : null,
                    longitude: data.Longitude ? parseFloat(data.Longitude) : null
                }
            });
        }

        res.json(activites);
    } catch (error) {
        console.error('Erreur lors de la récupération des activités:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.post('/search', async (req, res) => {
    const { from, tags, occupancyRate } = req.body;

    if (!from || !tags) {
        return res.status(400).json({ error: 'Les champs "from" et "tags" sont obligatoires.' });
    }

    try {
        const activities = await findActivitiesByTags(tags);
        const groupedActivities = await groupActivitiesByCity(activities, from, occupancyRate || 1); // Valeur par défaut = 1

        res.json(groupedActivities);
    } catch (error) {
        console.error('❌ Erreur lors de la recherche :', error.message);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

router.post('/add-activities', async (req, res) => {
    const { city } = req.body;

    if (!city) {
        return res.status(400).json({ error: "Le champ 'city' est obligatoire." });
    }

    try {
        console.log(`🔍 Recherche des activités pour la ville : ${city}`);

        // Récupérer toutes les clés d'activités
        const activityKeys = await redisClient.keys('activite:*');
        let matchingActivities = [];

        for (const key of activityKeys) {
            const activity = await redisClient.hGetAll(key);

            // Vérifier que l'activité appartient à la ville demandée et que son score est < 1.5
            if (activity.Communes_proches && activity.Communes_proches.includes(city)) {
                const score = parseFloat(activity.Score_Moyen);
                if (!isNaN(score) && score < 1.5) {
                    matchingActivities.push(activity);
                }
            }
        }

        // Trier et sélectionner les 3 premières activités
        matchingActivities = matchingActivities.sort((a, b) => parseFloat(a.Score_Moyen) - parseFloat(b.Score_Moyen));
        const selectedActivities = matchingActivities.slice(0, 3);

        console.log(`✅ Activités trouvées pour ${city} `);
        res.json({ city, activities: selectedActivities });

    } catch (error) {
        console.error('❌ Erreur lors de la récupération des activités:', error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});


module.exports = router;
