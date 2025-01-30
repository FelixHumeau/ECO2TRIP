const express = require('express');
const router = express.Router();
const carbonRoutes = require('./carbonRoutes'); // Routes pour l'empreinte carbone
const activiteRoutes = require('./activiteRoutes'); // Import des routes des activités
const hotelRoutes = require('./hotelRoutes'); // Import des routes hôtels

router.use('/hotels', hotelRoutes);
router.use('/carbon', carbonRoutes);
router.use('/activites', activiteRoutes); 

// Exemple de route de test
router.get('/', (req, res) => {
    res.send('Bienvenue sur les API d\'ECO2TRIP');
});

module.exports = router;
