const express = require('express');
const { signup, login, googleAuth, googleCallback } = require('../controllers/authController');
const router = express.Router();

// Email and password signup/login routes
router.post('/signup', signup);
router.post('/login', login);

// Google OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

// User profile route
router.get('/profile', (req, res) => {
    if (!req.user) {
        return res.status(401).send('Not logged in');
    }
    res.send(`Hello, ${req.user.displayName}`);
});

module.exports = router;
