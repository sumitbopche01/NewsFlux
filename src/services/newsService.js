const axios = require('axios');

const API_KEY = process.env.NEWS_API_KEY;

/**
 * Fetches news articles based on the provided parameters.
 * 
 * @param {Object} params - The parameters for the API request.
 * @param {string} [params.q] - Keywords or phrases to search for in the article title and body.
 * @param {string} [params.domains] - A comma-separated string of domains to restrict the search to.
 * @param {string} [params.from] - A date and optional time for the oldest article allowed. Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS.
 * @param {string} [params.to] - A date and optional time for the newest article allowed. Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS.
 * @param {string} [params.sortBy] - The order to sort the articles in. Options: 'relevancy', 'popularity', 'publishedAt'.
 * @returns {Promise<Array>} - A promise that resolves to an array of articles.
 * @throws {Error} - Throws an error if the request fails.
 */
const fetchNewsArticles = async (params) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                ...params,
                apiKey: API_KEY,
            },
        });
        return response.data.articles;
    } catch (error) {
        throw new Error('Failed to fetch news articles');
    }
};

/**
 * Fetches top headlines based on the provided parameters.
 * 
 * @param {Object} params - The parameters for the API request.
 * @param {string} [params.country] - The 2-letter ISO 3166-1 code of the country you want to get headlines for.
 * @param {string} [params.category] - The category you want to get headlines for. Options: 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'.
 * @param {string} [params.sources] - A comma-separated string of identifiers for the news sources or blogs you want headlines from.
 * @returns {Promise<Array>} - A promise that resolves to an array of articles.
 * @throws {Error} - Throws an error if the request fails.
 */
const fetchTopHeadlines = async (params) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                ...params,
                apiKey: API_KEY,
            },
        });
        return response.data.articles;
    } catch (error) {
        throw new Error('Failed to fetch top headlines');
    }
};

module.exports = {
    fetchNewsArticles,
    fetchTopHeadlines,
};
