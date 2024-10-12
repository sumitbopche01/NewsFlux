const axios = require('axios');

const fetchNews = async (category) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                apiKey: process.env.NEWS_API_KEY,
                category,
                country: 'in', // Optional, can vary based on the user
            },
        });
        return response.data.articles;
    } catch (error) {
        throw new Error('Failed to fetch news');
    }
};

module.exports = { fetchNews };
