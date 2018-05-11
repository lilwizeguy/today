
const express = require('express');
const request = require('request');

const StocksAPI = require('../services/stocks');
const WeatherAPI = require('../services/weather');

const responseFormatter = require('../formatters/response-formatter')
const router = express.Router();


router.get('/weather', (req, res, next) => {

    const coordinates = {
        "lat" : req.query.lat,
        "lon" : req.query.lon,
    };

    console.log(coordinates);

    const weatherUrl = WeatherAPI.weatherUrl(coordinates.lat, coordinates.lon);
    console.log(weatherUrl)

    request.get(weatherUrl, (error, response, body) => {
        const parsedBody = WeatherAPI.parseResponse(body);
        if (error) {
            res.json(responseFormatter.baseReponse(500, error, null));
        }
        else {
            res.json(responseFormatter.successfulResponse(parsedBody));
        }
    });
    

});


router.get('/stocks', (req, res, next) => {

    const stocks = ['AAPL', 'GOOG'];
    const batchUrl = StocksAPI.batchUrl(stocks);

    request.get(batchUrl, null, (error, response, body) => { 
        const parsedBody = StocksAPI.parseResponse(body);
        if (error) {
            res.json(responseFormatter.baseReponse(500, error, null));
        }
        else {
            res.json(responseFormatter.successfulResponse(parsedBody));
        }
    });
});

router.get('/reddit', (req, res, next) => {

    res.json('Hit reddit');
});

router.get('/hacker-news', (req, res, next) => {

});


module.exports = router;