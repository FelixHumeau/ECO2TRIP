import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/activites'; // Ajuste l'URL selon ton backend

export const searchActivities = async (tags) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/search`, { tags });
        return response.data.activities;
    } catch (error) {
        console.error('Erreur lors de la recherche des activités :', error);
        return [];
    }
};