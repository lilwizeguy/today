

function getBaseURL() {
    return 'api/';
}

function getNews(next) {
    console.log('getting news');
    fetch(getBaseURL() + 'news').then((response)=> {
        console.log(response);
        return response.json();
    }).then((parsedJson) => {
        next(parsedJson.data.slice(0, 5));
    });
} 

export {getNews};
