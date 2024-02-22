const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Endpoint pour récupérer des audios depuis l'API Spreaker
app.get('/api/spreaker/audios', async (req, res) => {
    try {
        // Utilisez votre clé API Spreaker (remplacez 'YOUR_API_KEY' par votre clé réelle)
        const apiKey = 'hNDu1MRzRAsJzUcrrn9ADmrDn1jGWn81';
        const response = await axios.get('https://api.spreaker.com/v2/shows/12637/episodes', {
            params: {
                limit: 10, // Limitez le nombre d'épisodes si nécessaire
                api_key: apiKey,
            },
        });

        const audios = response.data.response.items;
        res.json(audios);
    } catch (error) {
        console.error('Erreur lors de la récupération des audios depuis Spreaker API:', error);
        console.log('Response:', error.response.data); // Ajoutez cette ligne pour afficher la réponse complète
        res.status(500).json({ error: 'Erreur serveur', details: error.message });
    }
});

// Port d'écoute
app.listen(PORT, () => {
    console.log(`Serveur backend en cours d'exécution sur le port ${PORT}`);
});
