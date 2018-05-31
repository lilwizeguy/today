
const express = require('express');
const request = require('request');
const responseFormatter = require('../formatters/response-formatter');

class StocksAPI {

    static baseUrl() {
        return 'https://www.alphavantage.co/';
        
    }

    static getAPIKey() {
        return 'apikey=N29HMAS2M2E3DT7Q';
    }

    // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=N29HMAS2M2E3DT7Q
    // https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=15min&apikey=demo
    static timeseriesUrl(symbol) {
        const res = StocksAPI.baseUrl() + 'query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&' + StocksAPI.getAPIKey();
        return res;
    }

    static batchUrl(symbols) {
        const symbolString = symbols.join();
        const res = StocksAPI.baseUrl() + 'query?function=BATCH_STOCK_QUOTES&symbols=' + symbolString + '&' + StocksAPI.getAPIKey();
        return res;
    }


    // "Stock Quotes": [
    //     {
    //         "1. symbol": "AAPL",
    //         "2. price": "187.3100",
    //         "3. volume": "19317176",
    //         "4. timestamp": "2018-05-09 16:00:00"
    //     },
    //     {
    //         "1. symbol": "GOOG",
    //         "2. price": "1083.1900",
    //         "3. volume": "936261",
    //         "4. timestamp": "2018-05-09 16:00:00"
    //     }
    // ]

    static parseTimeseriesResponse(response) {

        const LIMIT = 30;

        const jsonResponse = JSON.parse(response);
        const metadata = jsonResponse["Meta Data"];
        const quotes = jsonResponse["Time Series (Daily)"];

        if (quotes == null) {
            return [];
        }

        const allBody = [];

        for (let date in quotes) {

            const payload = {
                "date" : date,
                "price" : quotes[date]["4. close"],
            } 
            allBody.push(payload);
        }

        const body = allBody.sort((a, b)=> {
            return new Date(b.date) - new Date(a.date);
        }).slice(0, LIMIT);
        
        const res = {};
        res["timeseries"] = body;
        res["symbol"] = metadata["2. Symbol"];
        res["price"] = body[0]["price"];

        return res;
    }

    static parseBatchResponse(response) {
        const jsonResponse = JSON.parse(response);
        const quotes = jsonResponse["Stock Quotes"];

        if (quotes == null) {
            return [];
        }

        const body = quotes.map((val) => {
            const parsedVal = {
                "symbol" : val["1. symbol"],
                "price" : val["2. price"],
                "volume" : val["3. volume"],
                "timestamp" : val["4. timestamp"],
            };

            return parsedVal;
        });

        return body;
    }
}

// console.log(StocksAPI.timeseriesUrl('AAPL'));
// console.log(StocksAPI.batchUrl(['AAPL', 'GOOG']));
module.exports = StocksAPI;



