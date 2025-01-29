require('dotenv').config();

console.log('ORS_API_KEY:', process.env.ORS_API_KEY);
console.log('IMPACTCO2_API_KEY:', process.env.IMPACTCO2_API_KEY);

module.exports = {
    orsApiKey: process.env.ORS_API_KEY,
    impactCo2ApiKey: process.env.IMPACTCO2_API_KEY,
};
