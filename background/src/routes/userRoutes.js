const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'Utilisateur créé', user });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
});

module.exports = router;
