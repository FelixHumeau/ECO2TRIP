// Importer les modules nécessaires
const express = require('express');

// Initialiser l'application Express
const app = express();
const port = 3000;

// Importer les routes
const routes = require('./routes');

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Utiliser les routes définies dans routes/index.js
app.use('/', routes);

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
