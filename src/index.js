const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // JSON body parser
app.use(cors()); // Enable CORS for all routes

// Passport middleware for Google OAuth
app.use(passport.initialize());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log(`MongoDB connection error: ${err.message}`));

// Routes
app.use('/api/auth', authRoutes); // Auth routes (sign-up, login, google)
app.use('/api/news', newsRoutes); // News routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
