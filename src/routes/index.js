const express = require('express');
const router = express.Router();

// Route de base
router.get('/', (req, res) => {
  res.send('Bienvenue sur ECO2TRIP !');
});

module.exports = router;
