const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

//middleware
app.use(express.json());
app.use(cors());

//Mongo DB Load
const port = process.env.PORT || 4000
const URI = process.env.MONGO_URI

const Item = require('../models/itemSchema');

//get one item
app.get('/items/:id', async (req, res) => {
    try {
        const oneItem = await Item.findById(req.params.id);
        res.json(oneItem)
    } catch (err) {
        console.log(err)
    }
});

//get all items 
app.get('/items', async (req, res) => {
    try {
        const allItems = await Item.find({});
        res.json(allItems)
    } catch (err) {
        console.log(err)
    }
});

// create item 
app.post('/items', async (req, res) => {
    try {
        const createdItem = await Item.create(req.body)
        res.json(createdItem)
    } catch (err) {
        console.log(err)
    }
});

//DELETE Item
app.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findOneAndDelete(req.params.id)
        res.json(deletedItem)
    } catch (err) {
        console.log(err)
    }
});

//update item
app.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(updatedItem)
    } catch (err) {
        console.log(err)
    }
});


mongoose.connect(URI)
mongoose.connection.once('open', () => {
    console.log('connection to mongoDB established.')
});


app.listen(port, () => {
    console.log('listening...')
});