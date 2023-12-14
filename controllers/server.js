const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

//middleware
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); //allows access from any origin
    // res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

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

// PULLING FROM WEATHER API
const API_KEY = process.env.WEATHER_API_KEY

//use params to get the search query
//send a req.body to the backend. save as variables and template literals in query
//Need country, location

//take date, convert it to string. If day MM/DD === Friday, OR Saturday, OR sunday then send that data as a reponse. maybe use .filter()? 
//example query https://api.weatherapi.com/v1/forecast.json?key={KEY}&q=Sacramento&California&UnitedStatesofAmerica&days=10 (city first)

app.post('/forecast', async (req, res) => {
    const { city, state } = req.body;
    try {
        const forecast = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&unitedstatesofamerica&${state}&days=10`)
        res.json(forecast.data)
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