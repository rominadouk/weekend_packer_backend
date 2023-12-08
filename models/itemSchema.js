const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema (
    {
        name: { type: String, required: true },
        list: String,
        category: String,
        quantity: Number,
    }
);
const Item = mongoose.model('Item', itemSchema);
module.exports = Item