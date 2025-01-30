const express = require('express');
const axios = require('axios');
const { orsApiKey, impactCo2ApiKey } = require('../config/env');

const router = express.Router();

async function geocodeLocation(location) {

    const url = `https://api.openrouteservice.org/geocode/search`;
    try {
        console.log('Requête de géocodage envoyée pour :', location);
        
        const response = await axios.get(url, {
            params: {
                api_key: orsApiKey,
                text: location,
            },
        });

        console.log('Réponse de l\'API ORS :', response.data); // Log toute la réponse

        if (response.data.features.length === 0) {
            throw new Error(`Aucun résultat trouvé pour ${location}`);
        }

        const coordinates = response.data.features[0].geometry.coordinates; // [lon, lat]
        console.log(`Coordonnées trouvées pour ${location} :`, coordinates);

        return coordinates;
    } catch (error) {
        console.error('Erreur Geocoding OpenRouteService:', error.message);
        throw new Error(`Impossible de trouver les coordonnées pour ${location}`);
    }
}

// Fonction pour obtenir la distance entre deux lieux avec OpenRouteService
async function getDistanceFromORS(from, to, mode) {
    const url = `https://api.openrouteservice.org/v2/directions/${mode}`;
    try {
        const response = await axios.post(url, {
            coordinates: [from, to], // Coordonnées GPS [lon, lat]
            units: 'km',
        }, {
            headers: {
                Authorization: orsApiKey,
            },
        });

        // Extraire la distance en km
        const distance = response.data.routes[0].summary.distance;
        return distance;
    } catch (error) {
        console.error('Erreur OpenRouteService:', error.response ? error.response.data : error.message);
        throw new Error('Impossible de calculer la distance.');
    }
}

// Fonction pour obtenir l'empreinte carbone avec ImpactCO2
async function getCarbonImpact(distance, transportId, occupencyRate) {
    try {
        const response = await axios.get('https://impactco2.fr/api/v1/transport', {
            params: {
                km: distance,
                transports: transportId, // Spécifie l'ID du transport demandé
                occupencyRate: 1, // Taux d'occupation pour les transports partagés
                displayAll: 0, // Désactive les autres transports
                language: 'fr',
            },
            headers: {
                Authorization: `Bearer ${impactCo2ApiKey}`,
                Accept: 'application/json',
            },
        });

        // Vérifier si la réponse contient des données valides
        if (!response.data.data || response.data.data.length === 0) {
            throw new Error(`Aucun transport correspondant trouvé.`);
        }

        return response.data.data[0]; // Retourne le premier élément correspondant
    } catch (error) {
        console.error('Erreur ImpactCO2:', error.response ? error.response.data : error.message);
        throw new Error('Impossible de calculer l\'empreinte carbone.');
    }
}

async function calculateDistance(fromCoordinates, toCoordinates, transportId) {
    const orsModes = {
        4: 'driving-car', // Voiture thermique
        5: 'driving-car', // Voiture électrique
        22: 'driving-car',
        23: 'driving-car',
        24: 'driving-car',
        25: 'driving-car',
        26: 'driving-car',
        27: 'driving-car',
        28: 'driving-car',
        29: 'driving-car',
        7: 'cycling-regular', // Vélo mécanique
        8: 'cycling-regular', // Vélo électrique
        9: 'foot-walking', // Bus thermique (approximé avec la marche)
        10: 'foot-walking', // Tramway (approximé avec la marche)
    };

    const approximateModes = {
        2: 0.9, // TGV : 90% de la distance voiture
        3: 0.85, // Intercités : 85% de la distance voiture
        1: 'plane', // Avion court-courrier : distance en vol d’oiseau
    };

    try {
        if (orsModes[transportId]) {
            // Utiliser OpenRouteService pour les modes pris en charge
            const mode = orsModes[transportId];
            return await getDistanceFromORS(fromCoordinates, toCoordinates, mode);
        } else if (approximateModes[transportId]) {
            // Approximation pour les modes spécifiques
            if (approximateModes[transportId] === 'plane') {
                // Calculer la distance en vol d’oiseau
                return haversine(fromCoordinates[1], fromCoordinates[0], toCoordinates[1], toCoordinates[0]);
            } else {
                // Utiliser une proportion de la distance voiture
                const carDistance = await getDistanceFromORS(fromCoordinates, toCoordinates, 'driving-car');
                return carDistance * approximateModes[transportId];
            }
        } else {
            throw new Error(`Transport avec l'ID ${transportId} non pris en charge.`);
        }
    } catch (error) {
        console.error('Erreur lors du calcul de la distance :', error.message);
        throw new Error('Impossible de calculer la distance.');
    }
}

// Calcul de la distance en vol d’oiseau (Haversine)
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en km
    const toRad = (angle) => (angle * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en km
}

router.get('/test', (req, res) => {
    res.json({ message: 'Test dans carbonRoutes fonctionnel' });
});

// Route principale
router.post('/', async (req, res) => {
    console.log('Requête reçue :', req.body); // Ajoute ceci pour voir le body reçu
    const { from, to, mode, transportId, occupencyRate } = req.body;

    if (!from || !to || !mode || !transportId) {
        return res.status(400).json({ error: 'Les champs from, to, mode et transportId sont obligatoires.' });
    }

    try {
        // Convertir les noms des lieux en coordonnées GPS
        const fromCoordinates = await geocodeLocation(from);
        const toCoordinates = await geocodeLocation(to);

        // Calculer la distance en fonction du mode de transport
        const distance = await calculateDistance(fromCoordinates, toCoordinates, parseInt(transportId, 10));

        // Appeler l'API ImpactCO2
        const carbonData = await getCarbonImpact(distance, transportId, occupencyRate || 1);

        // Retourner directement les données
        res.json({
            from,
            to,
            mode,
            transportId,
            occupencyRate: occupencyRate || null,
            distance,
            carbonData,
        });
    } catch (error) {
        console.error('Erreur interne :', error.message); // Ajoute un log pour les erreurs
        res.status(500).json({ error: error.message });
    }
});

// Route /all : Calcul pour plusieurs modes de transport
router.post('/all', async (req, res) => {
    console.log('Requête reçue pour /all :', req.body);

    const { from, to, occupencyRate } = req.body;

    if (!from || !to || !occupencyRate) {
        return res.status(400).json({ error: 'Les champs from, to et occupencyRate sont obligatoires.' });
    }

    try {
        // Convertir les noms des lieux en coordonnées GPS
        const fromCoordinates = await geocodeLocation(from);
        const toCoordinates = await geocodeLocation(to);

        // Définition des transports à évaluer
        const transports = [
            { id: 2, name: 'Train (TGV)' },
            { id: 1, name: 'Avion' },
            { id: 7, name: 'Vélo' },
            { id: 5, name: 'Voiture électrique' },
            { id: 4, name: 'Voiture thermique' },
            { id: 9, name: 'Bus thermique' },
        ];

        let results = [];

        for (const transport of transports) {
            try {
                // Calcul de la distance selon le transport
                const distance = await calculateDistance(fromCoordinates, toCoordinates, transport.id);

                // Calcul de l'empreinte carbone
                const carbonData = await getCarbonImpact(distance, transport.id, occupencyRate);

                // Stocker les résultats
                results.push({
                    transport: transport.name,
                    distance: distance.toFixed(2) + ' km',
                    carbonImpact: carbonData.value.toFixed(3) + ' kg CO₂',
                });
            } catch (error) {
                console.error(`Erreur pour ${transport.name}:`, error.message);
                results.push({
                    transport: transport.name,
                    error: 'Calcul impossible',
                });
            }
        }

        res.json({
            from,
            to,
            results,
        });

    } catch (error) {
        console.error('Erreur interne /all :', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
