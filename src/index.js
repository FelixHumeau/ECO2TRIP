require('dotenv').config();
const express = require('express');
const pool = require('./config/database');
const redis = require('./config/redis');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});