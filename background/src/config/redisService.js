const axios = require('axios');
const { impactCo2ApiKey } = require('../config/env');
const Redis = require('ioredis');
const redis = new Redis({
    host: '127.0.0.1', // Adresse de Redis
    port: 6379,        // Port de Redis
    password: process.env.REDIS_PASSWORD, // Mot de passe Redis
});
const redisClient = require('../config/database');

const { geocodeLocation } = require('../routes/carbonRoutes');

async function findActivitiesByTags(tags) {
    try {
        console.log("🔍 Recherche des activités pour les tags :", tags);

        // Récupérer toutes les clés correspondant aux activités
        const activityKeys = await redis.keys('activite:*');
        const matchingActivities = [];

        for (const key of activityKeys) {
            if (matchingActivities.length >= 20) break;
            const activityTagsRaw = await redis.hget(key, 'Tags'); // Utiliser 'Tags' avec majuscule
            if (activityTagsRaw) {
                try {
                    // Décodage du JSON correctement
                    //const activityTags = JSON.parse(activityTagsRaw.replace(/\\/g, ''));
                    const activityTags = JSON.parse(activityTagsRaw).map(tag => restoreUnicode(tag));

                    // 🔍 Normalisation des textes (supprime accents, met en minuscule)
                    const normalizeText = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

                    // Vérifier si un tag correspond
                    if (tags.some(tag => activityTags.some(activityTag => normalizeText(tag) === normalizeText(activityTag)))) {
                        const activity = await redis.hgetall(key);
                        matchingActivities.push(activity);
                    }
                    /*for (const tag of tags) {
                        for (const activityTag of activityTags) {
                            console.log(`🛠️ Comparaison : tag="${normalizeText(tag)}" vs activityTag="${normalizeText(activityTag)}"`);
                            if (normalizeText(tag) === normalizeText(activityTag)) {
                                console.log(`✅ Correspondance trouvée: "${tag}" == "${activityTag}"`);
                                const activity = await redis.hgetall(key);
                                matchingActivities.push(activity);
                                break; // Sortir dès qu'une correspondance est trouvée pour éviter les doublons
                            }
                        }
                    }*/
                } catch (parseError) {
                    console.error(`❌ Erreur de parsing JSON pour ${key}:`, parseError);
                }
            }
        }

        console.log(`✅ Activités trouvées : ${matchingActivities.length}`);
        return matchingActivities;
    } catch (error) {
        console.error('❌ Erreur lors de la recherche dans Redis :', error);
        throw error;
    }
}

function restoreUnicode(str) {
    try {
        // Replace all occurrences of \u followed by 4 hex digits with the corresponding Unicode character
        return str.replace(/\\u([\da-fA-F]{4})/g, (match, p1) => {
            return String.fromCharCode(parseInt(p1, 16));
        });
    } catch (error) {
        console.error(`❌ Erreur lors de la conversion Unicode de "${str}" :`, error);
        return str; // Retourne la chaîne brute en cas d'erreur
    }
}

async function calculateTransportScore(city, transport_options) {
    console.log(` ${city}...`);

    let totalCarbon = 0;

    for (var i in transport_options) {
        let carbonValue = parseFloat(transport_options[i].carbonImpact.replace(' kg CO₂', ''));
        totalCarbon += carbonValue;
    }

    // Calcul du score transport
    const score_transport = Math.round((totalCarbon / 100) * 10) / 10;
    console.log(`Score transport pour ${city}:`, score_transport);
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

        let hotelScores = [];

        for (const key of hotelKeys) {
            const hotelData = await redisClient.hGetAll(key);

            // Vérifier si l'hôtel appartient bien à la ville
            if (hotelData.city && hotelData.city.trim().toLowerCase() === city.trim().toLowerCase()) {
                const score = parseFloat(hotelData.eco_score);
                if (!isNaN(score)) {
                    hotelScores.push(5 - score); //Plus il est élevé mieux c'est
                }
            }
        }

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


async function getHotelsForCity(city) {
    console.log(`🏨 Récupération des hôtels pour ${city}...`);

    try {
        const hotelKeys = await redisClient.keys('hotel:*');
        let hotels = [];

        for (const key of hotelKeys) {
            const hotelData = await redisClient.hGetAll(key);

            if (hotelData.city && hotelData.city.trim().toLowerCase() === city.trim().toLowerCase()) {
                hotels.push({
                    name: hotelData.name || "Nom inconnu",
                    eco_score: parseFloat(hotelData.eco_score) || null,
                    link: hotelData.link || "Non disponible",
                    image: hotelData.image_url || "",
                    price: hotelData.price || "-- €"
                });
            }
        }

        console.log(`✅ ${hotels.length} hôtels trouvés pour ${city}`);
        return hotels;
    } catch (error) {
        console.error(`❌ Erreur récupération hôtels pour ${city}:`, error.message);
        return [];
    }
}

async function getTransportOptions(from, to, occupancyRate) {
    console.log(`🚆 Récupération des options de transport pour ${from} → ${to} avec taux d'occupation ${occupancyRate}...`);

    try {
        const response = await axios.post('http://localhost:5000/api/carbon/all', {
            from,
            to,
            occupencyRate: occupancyRate // Correction du paramètre d'entrée
        });

        if (response.data && response.data.results) {
            console.log(`✅ Transport récupéré pour ${from} → ${to}`);
            return response.data.results;
        } else {
            console.warn(`⚠️ Aucune donnée valide pour les transports entre ${from} et ${to}`);
            return [];
        }
    } catch (error) {
        console.error(`❌ Erreur lors de la récupération des transports entre ${from} et ${to}:`, error.message);
        return [];
    }
}


async function groupActivitiesByCity(activities, from, occupancyRate = 1) {
    console.log(`🔄 Regroupement des activités par villes avec distance depuis ${from}...`);
    const groupedByCity = {};

    // 📌 Étape 1 : Construire le mapping Ville → Code INSEE
    console.log("📍 Construction du mapping Ville → Code INSEE...");
    const villeKeys = await redis.keys('ville:*');
    const villeMapping = {};
    for (const key of villeKeys) {
        try {
            const villeData = await redis.hgetall(key);
            if (villeData["Commune"] && villeData["Code INSEE"]) {
                // Normalize the city name
                const normalizedCityName = normalizeCityName(villeData["Commune"]);
                villeMapping[normalizedCityName] = villeData["Code INSEE"];
            }
        } catch (error) {
            console.error(`❌ Erreur lors de la récupération des données pour ${key}:`, error.message);
        }
    }

    console.log(`✅ Mapping Ville → Code INSEE terminé (${Object.keys(villeMapping).length} villes enregistrées).`);
    console.log(villeMapping);

    // 📌 Étape 2 : Regrouper les activités par ville
    for (const activity of activities) {
        if (!activity.Communes_proches) continue;

        const cities = activity.Communes_proches.split(",").map(city => city.trim());

        for (const city of cities) {
            if (!groupedByCity[city]) {
                groupedByCity[city] = {
                    activities: [],
                    hotels: [],
                    transport_options: [],
                    score_activite: 0,
                    score_transport: 0,
                    score_hotel: 0,
                    score_total: 0,
                    //distance: 0,
                    details: {}
                };
            }
            groupedByCity[city].activities.push(activity);
        }
    }

    // 📌 Étape 3 : Calculer le score_activite pour chaque ville
    for (const city of Object.keys(groupedByCity)) {
        const cityActivities = groupedByCity[city].activities;
        const scores = cityActivities.map(a => parseFloat(a.Score_Moyen)).filter(score => !isNaN(score));
        groupedByCity[city].score_activite = scores.length > 0 ? parseFloat((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)) : 0;
    }

    // 📌 Étape 4 : Trier les villes par score_activite (du plus bas au plus haut)
    const sortedCitiesByActivityScore = Object.entries(groupedByCity)
        .sort(([, a], [, b]) => a.score_activite - b.score_activite) // Tri par score_activite croissant
        .slice(0, 5) // Sélectionner les 5 premières villes
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

    // Get departure city coordinates
    const coordinates_from = await geocodeLocation(from);

    // 📌 Étape 5 : Continuer les étapes suivantes uniquement pour les 5 villes sélectionnées
    for (const city of Object.keys(sortedCitiesByActivityScore)) {
        const normalizedCityName = normalizeCityName(city); // Normalize the city name
        let cityCodeINSEE = villeMapping[normalizedCityName] || null;
        if (!cityCodeINSEE) {
            console.warn(`⚠️ Code INSEE non trouvé pour ${city}, impossible de récupérer les détails.`);
        }

        try {
            if (cityCodeINSEE) {
                const cityData = await redis.hgetall(`ville:${cityCodeINSEE}`);
                if (cityData && Object.keys(cityData).length > 0) {
                    sortedCitiesByActivityScore[city].details = cityData;
                } else {
                    console.warn(`⚠️ Aucune donnée complète trouvée pour la ville ${city} (Code INSEE: ${cityCodeINSEE})`);
                }
            }
        } catch (error) {
            console.error(`❌ Erreur lors de la récupération des informations de la ville ${city}:`, error.message);
        }

        // 🔥 Passer `occupancyRate` à `getTransportOptions`
        const coordinates_city = [
            parseFloat(parseFloat(sortedCitiesByActivityScore[city].details.longitude).toFixed(6)),
            parseFloat(parseFloat(sortedCitiesByActivityScore[city].details.latitude).toFixed(6))
        ];

        // Vérifier si la ville de départ et la destination sont trop proches
        if (isSameCity(coordinates_from, coordinates_city)) {
            console.warn(`⚠️ ${city} est trop proche de ${from}. Suppression de la liste.`);
            delete sortedCitiesByActivityScore[city]; // 🚨 Supprime la ville de l'objet
            continue; // Passe à la prochaine ville
        }

        // Traitement normal des villes restantes
        sortedCitiesByActivityScore[city].score_hotel = await calculateHotelScore(city);
        sortedCitiesByActivityScore[city].hotels = await getHotelsForCity(city);

        sortedCitiesByActivityScore[city].transport_options = await getTransportOptions(coordinates_from, coordinates_city, occupancyRate);
        sortedCitiesByActivityScore[city].score_transport = await calculateTransportScore(city, sortedCitiesByActivityScore[city].transport_options);

        sortedCitiesByActivityScore[city].score_total =
            sortedCitiesByActivityScore[city].score_hotel +
            sortedCitiesByActivityScore[city].score_activite +
            sortedCitiesByActivityScore[city].score_transport;

    }

    // 📌 Étape 6 : Trier les villes finales par score_total
    const finalSortedCities = Object.entries(sortedCitiesByActivityScore)
        .sort(([, a], [, b]) => {
            // Vérifier si a ou b ont des valeurs nulles
            const aHasNull = a.score_activite === null || a.score_transport === null || a.score_hotel === null;
            const bHasNull = b.score_activite === null || b.score_transport === null || b.score_hotel === null;

            // Si a a une valeur nulle et b non, a doit être en dernier
            if (aHasNull && !bHasNull) return 1;
            if (!aHasNull && bHasNull) return -1;

            // Sinon, trier normalement sur score_total
            return a.score_total - b.score_total;
        })
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

    return finalSortedCities;
}

function normalizeCityName(cityName) {
    // Normaliser les caractères (supprimer les accents)
    const normalized = cityName
        .normalize("NFD") // Décompose les caractères accentués (é → e + ´)
        .replace(/[\u0300-\u036f]/g, ""); // Supprime les diacritiques

    // Remplacer les espaces et les traits d'union par des underscores, sauf les apostrophes
    return normalized
        .replace(/[\s-]/g, "_") // Remplace les espaces et traits d'union par _
        .replace(/[']/g, "_") // Conserve les apostrophes
        .toLowerCase(); // Convertit en minuscules
}

function isSameCity(coords1, coords2, threshold = 10) {
    const R = 6371; // Rayon de la Terre en km
    const toRad = (angle) => (angle * Math.PI) / 180;

    const dLat = toRad(coords2[1] - coords1[1]);
    const dLon = toRad(coords2[0] - coords1[0]);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(coords1[1])) * Math.cos(toRad(coords2[1])) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    console.log(`📏 Distance entre ${coords1} et ${coords2} : ${distance.toFixed(2)} km`);

    return distance < threshold;
}

module.exports = { findActivitiesByTags, calculateTransportScore, calculateHotelScore, getHotelsForCity, getTransportOptions, groupActivitiesByCity };