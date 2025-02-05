const axios = require('axios');
const { impactCo2ApiKey } = require('../config/env');
const Redis = require('ioredis');
const redis = new Redis({
    host: '127.0.0.1', // Adresse de Redis
    port: 6379,        // Port de Redis
    password: process.env.REDIS_PASSWORD, // Mot de passe Redis
});
const redisClient = require('../config/database');

const { getDistanceFromORS, geocodeLocation } = require('../routes/carbonRoutes');

async function findActivitiesByTags(tags) {
    try {
        console.log("🔍 Recherche des activités pour les tags :", tags);

        // Récupérer toutes les clés correspondant aux activités
        const activityKeys = await redis.keys('activite:*');
        const activitiesData = await Promise.all(activityKeys.map(async (key) => {
            const activityTagsRaw = await redis.hget(key, 'Tags');
            if (!activityTagsRaw) return null;
        
            try {
                const activityTags = JSON.parse(activityTagsRaw.replace(/\\/g, ''));
                if (tags.some(tag => activityTags.some(activityTag => normalizeText(tag) === normalizeText(activityTag)))) {
                    return await redis.hgetall(key);
                }
            } catch (parseError) {
                console.error(`❌ Erreur parsing JSON pour ${key}:`, parseError);
            }
            return null;
        }));
        
        const matchingActivities = activitiesData.filter(activity => activity !== null);
        

        console.log(`✅ Activités trouvées : ${matchingActivities.length}`);
        return matchingActivities;
    } catch (error) {
        console.error('❌ Erreur lors de la recherche dans Redis :', error);
        throw error;
    }
}

async function calculateTransportScore(city, distance) {
    const cacheKey = `transport_score:${city}:${distance}`;
    const cachedScore = await redisClient.get(cacheKey);
    if (cachedScore) return parseFloat(cachedScore);

    console.log(`🚗 Calcul du score transport pour ${city}...`);
    let totalCarbon = 0;

    for (const transportId of transports) {
        try {
            const response = await axios.get('https://impactco2.fr/api/v1/transport');

            if (response.data.data && response.data.data.length > 0) {
                totalCarbon += response.data.data[0].value;
            }
        } catch (error) {
            console.error(`❌ Erreur ImpactCO2 pour ${city} (Transport ${transportId}):`, error.message);
        }
    }

    const score_transport = Math.round((totalCarbon / 100) * 10) / 10;
    await redisClient.set(cacheKey, score_transport, 'EX', 3600); // Expiration 1h
    return score_transport;
}


async function calculateHotelScore(city) {
    console.log(`🏨 Calcul du score hôtel pour ${city}...`);

    try {
        // Récupérer toutes les clés des hôtels
        const hotelKeys = await redisClient.keys('hotel:*');

        if (!hotelKeys.length) {
            console.log(`⚠️ Aucun hôtel trouvé dans Redis.`);
            return null;
        }

        const hotelDataList = await Promise.all(hotelKeys.map(async (key) => {
            const hotelData = await redisClient.hGetAll(key);
            return hotelData.city && hotelData.city.trim().toLowerCase() === city.trim().toLowerCase()
                ? parseFloat(hotelData.eco_score)
                : null;
        }));
        
        const hotelScores = hotelDataList.filter(score => score !== null).map(score => 5 - score);
        

        // Calculer la moyenne et arrondir au dixième
        if (hotelScores.length > 0) {
            const avgScore = (hotelScores.reduce((a, b) => a + b, 0) / hotelScores.length).toFixed(1);
            console.log(`✅ Score hôtel moyen pour ${city} : ${avgScore}`);
            return parseFloat(avgScore);
        } else {
            console.log(`❌ Aucun hôtel trouvé pour ${city}`);
            return null;
        }

    } catch (error) {
        console.error(`❌ Erreur lors du calcul du score hôtel pour ${city}:`, error.message);
        return null;
    }
}


async function groupActivitiesByCity(activities, from) {
    console.log(`🔄 Regroupement des activités par villes avec distance depuis ${from}...`);
    const groupedByCity = {};

    // 📌 Étape 1 : Construire le mapping Ville → Code INSEE
    console.log("📍 Construction du mapping Ville → Code INSEE...");
    const villeKeys = await redis.keys('ville:*');
    const villeDataList = await Promise.all(villeKeys.map(async (key) => {
        try {
            return await redis.hgetall(key);
        } catch (error) {
            console.error(`❌ Erreur lors de la récupération des données pour ${key}:`, error.message);
            return null;
        }
    }));
    
    const villeMapping = {};
    villeDataList.forEach(villeData => {
        if (villeData && villeData["Commune"] && villeData["Code INSEE"]) {
            villeMapping[villeData["Commune"].toLowerCase()] = villeData["Code INSEE"];
        }
    });
    

    console.log(`✅ Mapping Ville → Code INSEE terminé (${Object.keys(villeMapping).length} villes enregistrées).`);

    // 📌 Étape 2 : Regrouper les activités par ville
    for (const activity of activities) {
        if (!activity.Communes_proches) continue;

        const cities = activity.Communes_proches.split(",").map(city => city.trim());

        for (const city of cities) {
            if (!groupedByCity[city]) {
                groupedByCity[city] = {
                    activities: [],
                    score_activite: 0,
                    score_transport: 0,
                    score_hotel: 0,
                    score_total: 0,
                    distance: 0,
                    details: {}
                };
            }
            groupedByCity[city].activities.push(activity);
        }
    }

    // 📌 Étape 3 : Calcul des scores et récupération des détails des villes
    for (const city of Object.keys(groupedByCity)) {
        const cityActivities = groupedByCity[city].activities;

        // 📍 **1. Calcul de la distance**
        try {
            groupedByCity[city].distance = await getDistanceFromORS(from, city, "driving-car");
        } catch (error) {
            console.error(`❌ Erreur lors du calcul de la distance pour ${city}:`, error.message);
        }

        // 📍 **2. Score activité**
        const scores = cityActivities.map(a => parseFloat(a.Score_Moyen)).filter(score => !isNaN(score));
        const score_activite = scores.length > 0 ? parseFloat((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)) : 0;
        groupedByCity[city].score_activite = score_activite;

        // 📍 **3. Score transport**
        const score_transport = await calculateTransportScore(city, groupedByCity[city].distance);
        groupedByCity[city].score_transport = score_transport;

        // 📍 **4. Score hôtel**
        const score_hotel = await calculateHotelScore(city);
        groupedByCity[city].score_hotel = score_hotel;

        // 📍 **5. Score total**
        groupedByCity[city].score_total = score_hotel + score_activite + score_transport;

        // 📍 **6. Récupération du Code INSEE via le mapping**
        let cityCodeINSEE = villeMapping[city.toLowerCase()] || null;
        if (!cityCodeINSEE) {
            console.warn(`⚠️ Code INSEE non trouvé pour ${city}, impossible de récupérer les détails.`);
        }

        // 📍 **7. Récupération des détails de la ville**
        try {
            if (cityCodeINSEE) {
                const cityData = await redis.hgetall(`ville:${cityCodeINSEE}`);
                if (cityData && Object.keys(cityData).length > 0) {
                    groupedByCity[city].details = cityData;
                } else {
                    console.warn(`⚠️ Aucune donnée complète trouvée pour la ville ${city} (Code INSEE: ${cityCodeINSEE})`);
                }
            }
        } catch (error) {
            console.error(`❌ Erreur lors de la récupération des informations de la ville ${city}:`, error.message);
        }
    }

    // 📌 **Tri des villes par `score_total` décroissant**
    const sortedCities = Object.entries(groupedByCity)
        .sort(([, a], [, b]) => b.score_total - a.score_total) // Tri descendant sur score_total
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

    console.log("✅ Regroupement et scores complétés :", sortedCities);
    return sortedCities;
}


module.exports = { findActivitiesByTags, calculateTransportScore, calculateHotelScore, groupActivitiesByCity };