const express = require('express');
const router = express.Router();
const carbonRoutes = require('./carbonRoutes'); // Routes pour l'empreinte carbone

// Ajout des routes carbone sous `/carbon`
router.use('/carbon', carbonRoutes);
console.log('Route /carbon enregistrée dans /api');

router.post('/test', (req, res) => {
    console.log('Requête POST reçue sur /api/test depuis routes/index.js');
    res.json({ message: 'Route test dans routes/index.js fonctionnelle' });
});

// Exemple de route de test
router.get('/', (req, res) => {
    res.send('Bienvenue sur les API d\'ECO2TRIP');
});

module.exports = router;
