const express = require('express');
const { getGeneralNews, getStockNews } = require('../controllers/newsController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/general', getGeneralNews);
router.get('/stocks', protect, getStockNews); // Protected route

module.exports = router;
