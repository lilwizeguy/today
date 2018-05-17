

var baseURL = 'http://localhost:5000/api/'


function getStocks(next) {

    fetch(baseURL + 'stocks').then((response)=> {
        return response.json();
    }).then((parsedJson) => {
        next(parsedJson.data);
    });

}

function getWeather(next) {
    fetch(baseURL + 'weather').then((response)=> {
        return response.json();
    }).then((parsedJson) => {
        next(parsedJson.data);
    });
}

function getNews(next) {
    console.log('getting news');
    fetch(baseURL + 'news').then((response)=> {
        console.log(response);
        return response.json();
    }).then((parsedJson) => {
        next(parsedJson.data);
    });
}

export {getStocks, getWeather, getNews};