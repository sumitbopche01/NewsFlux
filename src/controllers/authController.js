const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require("dotenv").config();

// Sign-up logic
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login logic
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Google OAuth logic
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('Google profile:', profile); // Log the profile to see what data is returned
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            console.log('Creating new user...');
            user = new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                username: profile.displayName || profile.emails[0].value.split('@')[0], // Use displayName or part of email as username
                preferences: [] // Default preferences, can be updated later
            });
            await user.save();
            console.log('User saved:', user);
        } else {
            console.log('User already exists:', user);
        }
        done(null, user);
    } catch (error) {
        console.error('Error in Google OAuth:', error);
        done(error, false);
    }
}));

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user) => {
        if (err || !user) return res.redirect('/');
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.redirect(`/auth/callback?token=${token}`);
    })(req, res, next);
};
