

function getBaseURL() {
    return 'api/';
}

function getStocks(next) {

    fetch(getBaseURL() + 'stocks').then((response)=> {
        return response.json();
    }).then((parsedJson) => {
        next(parsedJson.data);
    });

}

function getStockUrls() {
    const stocks = ['AAPL', 'GOOG', 'FB'];

    const urls = stocks.map((val)=> {
        return getBaseURL() + 'stocks/daily/' + val;
    });

    return urls;
}

function timeseriesRequest(url, next) {
    fetch(url).then((response)=> {
        return response.json();
        }).then((parsedJson)=> {
        parsedJson = parsedJson.data;

        const timeData = parsedJson.timeseries.map((val)=> {

            return parseFloat(val["price"]);
        });

        const labelData = parsedJson.timeseries.map((val)=> {
            return val["date"];
        });

        const timeDataChronological = timeData.reverse();

        const res =  {
            "timeDataChronological" : timeDataChronological,
            "labelData" : labelData,
            "price" : parsedJson.price,
            "symbol" : parsedJson.symbol,
        }

        next(res);
    });
}

  export { getStocks, getStockUrls, timeseriesRequest };