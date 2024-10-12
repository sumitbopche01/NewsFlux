const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    source: { type: String, required: true },
    category: { type: String }, // e.g., 'stocks', 'general'
    publishedAt: { type: Date, required: true },
});

module.exports = mongoose.model('News', newsSchema);
