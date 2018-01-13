var http = require('http');

function callBing(res, resp, query, key) {
    var host = 'api.cognitive.microsoft.com';
    var path = '/bing/v7.0/search?q=';
    var subscriptionKey = key;
    var options = {
        method: 'GET',
        hostname: host,
        path: path + '?q=' + encodeURIComponent(query),
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        }
    };

    http.request(options, function (res) {        
        console.log('HEADERS:');
        for (var headeritem in res.headers){
            console.log("item: " + res.headers[headeritem]);
        }
        res.setEncoding('utf-8');
        res.on('data', function (data) {
            console.log('BODY:' + data);
            var jsonresponse=JSON.stringify(data, null, '   ');
            console.log(jsonresponse);
        })
        res.on('error', function(err){
            console.log('Error! : + err');
        })
    }).end();


}

module.exports.callBing = callBing;