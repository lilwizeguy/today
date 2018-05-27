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


    const weatherUrl = WeatherAPI.timeseriesUrl(coordinates.lat, coordinates.lon);
    console.log(weatherUrl);

    request.get(weatherUrl, (error, response, body) => {
        const parsedBody = WeatherAPI.parseTimeseriesResponse(body);
        if (error) {
            res.json(responseFormatter.failedResponse(500, error));
        }
        else {
            res.json(responseFormatter.successfulResponse(parsedBody));
        }
    });
});


router.get('/stocks/daily/:stockId', (req, res, next) => {
    const symbol = req.params.stockId;
    const timeseriesUrl = StocksAPI.timeseriesUrl(symbol);
    console.log(symbol);

    request.get(timeseriesUrl, null, (error, response, body) => {
        const parsedBody = StocksAPI.parseTimeseriesResponse(body);
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
        const parsedBody = StocksAPI.parseBatchResponse(body);
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