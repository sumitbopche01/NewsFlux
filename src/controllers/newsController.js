const { fetchNewsArticles, fetchTopHeadlines } = require('../services/newsService');

exports.getGeneralNews = async (req, res) => {
    try {
        // Fetch general news headlines
        const articles = await fetchTopHeadlines({ category: 'general', country: 'us' });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch general news' });
    }
};

exports.getStockNews = async (req, res) => {
    try {
        // Fetch business news headlines
        const articles = await fetchTopHeadlines({ category: 'business', country: 'us' });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stock news' });
    }
};
