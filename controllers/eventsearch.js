var https = require('https'); // NOTE this is httpS, not http
var request = require('request');

//basic function scoped out to filter our JSON received
function filterJSONResponse(jsonToFilter) {
    let returnJSON = [];
    let webPages = jsonToFilter['webPages']['value'];
    for (var i = 0; i < webPages.length; i++) {
        let webPage = webPages[i];
        //push our filtered result to our return JSON
        returnJSON.push({ webPage: { url: webPage['url'], name: webPage['name'], snippet: webPage['snippet'] } });
    };
    return (returnJSON);

}

//My main handler to simply output what we get back from Bing. Over time, this has 
//to return something vs just outputting it on the log.
function processRequest(dataToParse) {
    let body = dataToParse;
    let responseJSON = JSON.parse(body);
    responseJSON = filterJSONResponse(responseJSON);
    return (JSON.stringify(responseJSON, null, '    '));
}

//This is the main entry function. It sets up what's needed to make the request, then calls 
//a function to process it and for now print it out (processRequest)
function callBing(query, key) {
    let host = 'https://api.cognitive.microsoft.com';
    let path = '/bing/v7.0/search';

    let answercount = '2';
    console.log('Searching the Web for: ' + query);
    let request_params = {
        method: 'GET',
        url: host + path + '?mkt=en-us&answerCount=' + answercount + '&q=' + encodeURIComponent(query),
        headers: {
            'Ocp-Apim-Subscription-Key': key,
        }
    };

    request(request_params, function (err, response, data) {
        if (err) {
            console.log("Error! " + err);
        }
        data = processRequest(data);
        console.log(data);
    });
}

module.exports.callBing = callBing;