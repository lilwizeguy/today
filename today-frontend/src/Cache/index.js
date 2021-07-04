import CardType from '../constants'

function newsSnapshot() {
    return today_getItem(CardType.NEWS);
}

function updateNewsSnapshot(val) {
    today_saveItem(CardType.NEWS, val);
}

function weatherSnapshot(val) {
    today_getItem(CardType.WEATHER);
}

function updateWeatherSnapshot(val) {
    return today_saveItem(CardType.WEATHER, val);
}

function stocksSnapshot() {
    return today_getItem(CardType.STOCKS)
}

function updateStocksSnapshot(val) {
    today_saveItem(CardType.STOCKS, val);
}

function today_getItem(key) {
    return localStorage.getItem(key);
}

function today_saveItem(key , val) {
    localStorage.setItem(key, val);
}


export {newsSnapshot, updateNewsSnapshot, weatherSnapshot, updateWeatherSnapshot, stocksSnapshot, updateStocksSnapshot};