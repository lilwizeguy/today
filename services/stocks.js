
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

    static parseResponse(response) {
        const jsonResponse = JSON.parse(response);
        const quotes = jsonResponse["Stock Quotes"];
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

// console.log(StocksAPI.batchUrl(['AAPL', 'GOOG']));
module.exports = StocksAPI;



