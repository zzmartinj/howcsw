var http=require('http');

function callBing(res, resp, query){
    var bingHost='http://api.cognitive.microsoft.com';
    var bingPath='/bing/v7.0/search?q=';
    var options={
        host : bingHost,
        port : 80,
        path : bingPath + query,
        method : 'GET'
    };

    http.request(options,function(res){
        console.log('STATUS:' + res.statusCode);
        console.log('HEADERS:' + res.headers );
        res.setEncoding('utf-8');
        res.on('data', function(data){
            console.log('BODY:' + data);
        })
    }).end();
}

module.exports.callGoogle=callGoogle;