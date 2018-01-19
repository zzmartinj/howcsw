var https = require('https'); // NOTE this is httpS, not http


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
        body = JSON.stringify(JSON.parse(body), null, '  ');
        
        console.log('\nJSON Response:\n');
        console.log(body);
    });
    response.on('error', function (e) {
        console.log('Error: ' + e.message);
    });
}


//This is the main entry function. It sets up what's needed to make the request, then calls 
//a function to process it and for now print it out (processRequest)
function callBing(request, response, query, key) {
    let host = 'api.cognitive.microsoft.com';
    let path = '/bing/v7.0/search';
    let answercount=2;
    console.log('Searching the Web for: ' + query);
    let request_params = {
        method: 'GET',
        hostname: host,
        
        path: path + '?answerCount=' + answercount + '?q=' + encodeURIComponent(query),
        headers: {
            'Ocp-Apim-Subscription-Key': key,
        }
    };

    var req = https.request(request_params, processRequest); //NOTE THIS IS HTTPS, not HTTP
    req.end();
}

module.exports.callBing = callBing;