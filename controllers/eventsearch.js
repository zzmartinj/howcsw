var https = require('https');

let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/search';

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


function callBing(request, response, query, key){
    console.log('Searching the Web for: ' + query);
    let request_params = {
          method : 'GET',
          hostname : host,
          path : path + '?q=' + encodeURIComponent(query),
          headers : {
              'Ocp-Apim-Subscription-Key' : key,
          }
      };
  
      let req = https.request(request_params, processRequest);
      req.end();
  }
/*
function callBing(request, response, query, key) {
    let host = 'api.cognitive.microsoft.com';
    let path = '/bing/v7.0/search';

    var options = {
        method: 'GET',
        hostname: host,
        path : path + '?q=' + encodeURIComponent(query),
        headers: {
            'Ocp-Apim-Subscription-Key': key, //Note that key here is a required Azure subscription key!
        }
    };
    console.log("Calling with these options " + query);
    http.request(options, processRequest).end();

} */
module.exports.callBing = callBing;