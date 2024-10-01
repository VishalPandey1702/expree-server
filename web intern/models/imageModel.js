const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    key: { type: String, required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);