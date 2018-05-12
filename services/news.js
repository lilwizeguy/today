// 7240baf51c3d4bc49ac52e7563e0e263
// https://newsapi.org/v2/top-headlines?country=us&apiKey=7240baf51c3d4bc49ac52e7563e0e263



const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('7240baf51c3d4bc49ac52e7563e0e263');



function getHeadlines(callback) {

	newsapi.v2.topHeadlines({
        country : 'us',
        language : 'en',
    }).then(response => {
        const filteredResponse = parseResponse(response);
        callback(filteredResponse);
    });
    
}

function parseResponse(response) {


    // const parsedJson = JSON.parse(response);

    const articles = response["articles"];
    console.log(articles);
    
    const articleArr = articles.map((value) => {
        const parsedVal = {
            "sourceName" : value["source"]["name"],
            "title" : value["title"],
            "description" : value["description"],
            "url" : value["url"],
            "imageUrl" : value["urlToImage"],
            "timestamp" : value["publishedAt"],
        };

        return parsedVal;
    });

    return articleArr;
}


module.exports.getHeadlines = getHeadlines;
