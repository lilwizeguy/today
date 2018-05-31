

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

function parseDate(val) {

    const splicedDate = val.split('\t');
    const components = splicedDate[0].split('-');
    // console.log(components);

    const month = components[1];
    const day = components[2];

    return month + '/' + day;
}

function timeseriesRequest(url, next, fail) {
    fetch(url).then((response)=> {
        return response.json();
        }).then((parsedJson)=> {
        parsedJson = parsedJson.data;

        const timeData = parsedJson.timeseries.map((val)=> {

            return parseFloat(val["price"]);
        });

        const labelData = parsedJson.timeseries.map((val)=> {
            return parseDate(val['date']);
        });

        const timeDataChronological = timeData.reverse();
        const labelDataChronological = labelData.reverse();

       // const labelDataChronological = new Array(timeDataChronological.length);

        const res =  {
            "timeDataChronological" : timeDataChronological,
            "labelData" : labelDataChronological,
            "price" : parsedJson.price,
            "symbol" : parsedJson.symbol,
        }

        next(res);
    }).catch((err) => {
        console.log(err.message);
        fail(err.message);
    });
}

  export { getStocks, getStockUrls, timeseriesRequest };