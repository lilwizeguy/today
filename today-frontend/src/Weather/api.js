import {stringify} from 'querystring';

function getBaseURL() {
    return 'api/';
}

function getParams(lat, lon) {
    const params = {
        "lat" : lat,
        "lon" : lon,
    }

    return stringify(params);
}

function getWeather(lat, lon, next, fail) {
    
    const params = getParams(lat, lon);
    fetch(getBaseURL() + 'weather?' + params).then((response)=> {
        return response.json();
    }).then((parsedJson) => {

        parsedJson = parsedJson.data;

        console.log(parsedJson);
        const currentWeather = parsedJson["now"]["weather"]["temp"];

        const timeseries = parsedJson["timeseries"];

        const timeseriesValues = timeseries.map((val)=> {
            return val["weather"]["temp"];
        });

        const timeseriesLabels = timeseries.map((val)=> {
            // return val["time"]["timestamp"];
            return "";
        });

        const res = {
            currentWeather : currentWeather,
            timeseriesLabels : timeseriesLabels,
            timeseriesValues : timeseriesValues,
        };

        console.log(res);
        next(res);
    }).catch((err) => {
        console.log(err.message);
        fail(err.message);
    });
}

export {getWeather};
