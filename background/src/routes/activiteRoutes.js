const express = require('express');
const redisClient = require('../config/database'); // Import de Redis

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
        const first10Keys = keys.slice(0, 3);

        // Récupérer les détails des activités
        const activites = [];
        for (const key of first10Keys) {
            const data = await redisClient.hGetAll(key);

            // Construire l'objet avec les champs demandés
            activites.push({
                nom: data.nom,
                description: data.description,
                adresse: data.adresse,
                tags: data.tags ? JSON.parse(data.tags.replace(/'/g, '"')) : [], // Corrige les tags mal formatés
                coordonnees: {
                    latitude: parseFloat(data.latitude),
                    longitude: parseFloat(data.longitude)
                }
            });
        }

        res.json(activites);
    } catch (error) {
        console.error('Erreur lors de la récupération des activités:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
