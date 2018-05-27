
// http://samples.openweathermap.org/data/
// 2.5/weather?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22

const express = require('express');
const request = require('request');
const responseFormatter = require('../formatters/response-formatter');
const querystring = require('querystring');

class WeatherAPI {

    static baseUrl() {
        return 'http://api.openweathermap.org/data/2.5/';
        
    }

    static getAPIKey() {
        return 'c179830840e9af75b72aa41017064ab2';
    }

    static timeseriesUrl(lat, lon) {
        const params = {
            "lat" : lat,
            "lon" : lon,
            "APPID" : WeatherAPI.getAPIKey(),
            "units" : "imperial",
        }

        const paramsString = params;
        const res = WeatherAPI.baseUrl() + 'forecast?' + querystring.stringify(params);
        return res;
    }

    static weatherUrl(lat, lon) {

        const params = {
            "lat" : lat,
            "lon" : lon,
            "APPID" : WeatherAPI.getAPIKey(),
            "units" : "imperial",
        }

        const paramsString = params;

        const res = WeatherAPI.baseUrl() + 'weather?' + querystring.stringify(params);
        return res;
    }

//     {"coord":{"lon":-122.09,"lat":37.39},
// "sys":{"type":3,"id":168940,"message":0.0297,"country":"US","sunrise":1427723751,"sunset":1427768967},
// "weather":[{"id":800,"main":"Clear","description":"Sky is Clear","icon":"01n"}],
// "base":"stations",
// "main":{"temp":285.68,"humidity":74,"pressure":1016.8,"temp_min":284.82,"temp_max":286.48},
// "wind":{"speed":0.96,"deg":285.001},
// "clouds":{"all":0},
// "dt":1427700245,
// "id":0,
// "name":"Mountain View",
// "cod":200}

    static parseTimeseriesResponse(response) {
        const val = JSON.parse(response);

        const weatherList = val["list"];

        const parsedVal = {
            "now" : this.parseSingleResponse(weatherList[0]),
            "timeseries" : weatherList.map((singleVal) => {
                return this.parseSingleResponse(singleVal);
            }),
        }

        return parsedVal;

    }

    static parseSingleResponse(val) {
        const parsedVal = {
            "weather" : {
                "temp" : val["main"]["temp"],
                "title" : val["weather"]["main"],
                "description" : val["weather"]["description"],
            },
            "time" : {
                "timestamp" : val["dt"],
                "timestampLong" : val["dt_txt"],
            },
            "location" : {
                "coord" : val["coord"],
                "name" : val["name"],
                "country" : val["sys"]["country"],
            }
        };

        return parsedVal;
    }

    static parseResponse(response) {
        const val = JSON.parse(response);
                
       return this.parseSingleResponse(val);
        
    }
}

// console.log(WeatherAPI.weatherUrl("37.39", "-122.09"));
module.exports = WeatherAPI;



