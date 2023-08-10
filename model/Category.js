const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: String,
    description: String,
    active: Boolean,
    created_time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categorySchema);
