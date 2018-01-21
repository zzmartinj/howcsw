var https = require('https'); // NOTE this is httpS, not http
var request = require ('request');


//My main handler to simply output what we get back from Bing. Over time, this has 
//to return something vs just outputting it on the log.
function processRequest(response) {
    let body = '';
    response.on('data', function (d) {
        body += d;
    });
    response.on('end', function () {
        console.log('\nRelevant Headers:\n');
        for (var header in response.headers)
            // header keys are lower-cased by Node.js
            if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
                console.log(header + ": " + response.headers[header]);

        let responseJSON = JSON.parse(body);
        responseJSON = filterJSONResponse(responseJSON);
        console.log('\nJSON Response:\n');
        console.log(JSON.stringify(responseJSON, null, '    '));
        return (responseJSON);
    });
    response.on('error', function (e) {
        console.log('Error: ' + e.message);
    });

}

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



//This is the main entry function. It sets up what's needed to make the request, then calls 
//a function to process it and for now print it out (processRequest)
function callBing(request, response, query, key) {
    let host = 'api.cognitive.microsoft.com';
    let path = '/bing/v7.0/search';

    let answercount = '2';
    console.log('Searching the Web for: ' + query);
    let request_params = {
        method: 'GET',
        hostname: host,
        path: path + '?mkt=en-us&answerCount=' + answercount + '&q=' + encodeURIComponent(query),
        headers: {
            'Ocp-Apim-Subscription-Key': key,
        }
    };
    let results = '';
    //NOTE THIS IS HTTPS, not HTTP    
    var req = https.request(request_params, function (data) {
        results = processRequest(data);
        console.log('RESULTS: ' + results);        
        return results;
    }); 
    req.end();
}

module.exports.callBing = callBing;