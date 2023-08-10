const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    title: String,
    description: String,
    active: Boolean,
    created_time: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Item', itemSchema);
