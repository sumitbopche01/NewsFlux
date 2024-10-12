const { fetchNews } = require('../services/newsService');

exports.getGeneralNews = async (req, res) => {
    try {
        const articles = await fetchNews('general');
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch general news' });
    }
};

exports.getStockNews = async (req, res) => {
    try {
        const articles = await fetchNews('business');
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stock news' });
    }
};
