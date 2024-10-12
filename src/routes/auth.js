const express = require('express');
const { signup, login, googleAuth, googleCallback } = require('../controllers/authController');
const router = express.Router();

// Email and password signup/login routes
router.post('/signup', signup);
router.post('/login', login);

// Google OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

module.exports = router;
