

function weatherKey() {


}

function stocksKey() {
	return (PROCESS.ENV.STOCKS_KEY || "My stocks key");
}


export { weatherKey, stocksKey, redditKey, hackerKey }
