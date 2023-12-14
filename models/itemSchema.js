const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema (
    {
        name: { type: String, required: true },
        category: String,
    }
);
const Item = mongoose.model('Item', itemSchema);
module.exports = Item