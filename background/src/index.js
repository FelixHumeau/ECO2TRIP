const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Exemple de route
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur le back-end' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

const userRouter = require('./routes/userRouter');
app.use('/api/users', userRouter);
