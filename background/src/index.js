require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const apiRouter = require('./routes/index'); // Routes principales API (inclut carbonRoutes)
app.use('/api', apiRouter);
console.log('Routes API enregistrées sous /api');

// Routes principales
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur le back-end' });
});


// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
