// Immanuel Amirtharaj
// api.js

const express = require('express');
const request = require('request');

const StocksAPI = require('../services/stocks');
const WeatherAPI = require('../services/weather');
const NewsAPI = require('../services/news')

const responseFormatter = require('../formatters/response-formatter')
const router = express.Router();


router.get('/weather', (req, res, next) => {

    const coordinates = {
        "lat" : req.query.lat,
        "lon" : req.query.lon,
    };


    const weatherUrl = WeatherAPI.weatherUrl(coordinates.lat, coordinates.lon);

    request.get(weatherUrl, (error, response, body) => {
        const parsedBody = WeatherAPI.parseResponse(body);
        if (error) {
            res.json(responseFormatter.failedResponse(500, error));
        }
        else {
            res.json(responseFormatter.successfulResponse(parsedBody));
        }
    });
});


router.get('/stocks', (req, res, next) => {

    const stocks = ['AAPL', 'GOOG', 'FB'];
    const batchUrl = StocksAPI.batchUrl(stocks);

    request.get(batchUrl, null, (error, response, body) => { 
        const parsedBody = StocksAPI.parseResponse(body);
        if (error) {
            res.json(responseFormatter.failedResponse(500, error));
        }
        else {
            res.json(responseFormatter.successfulResponse(parsedBody));
        }
    });
});


router.get('/news', (req, res, next) => {
    
    NewsAPI.getHeadlines((newsResp) => {

        res.json(responseFormatter.successfulResponse(newsResp));
    });

});


module.exports = router;