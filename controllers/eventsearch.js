var http=require('http');

function callGoogle(res, resp, query){
    var googlehost="http://ajax.googleapis.com";
    var googlepath="/ajax/services/search/web?v=1.0&q="
    var options={
        host : googlehost,
        port : 80,
        path : googlepath + query,
        method : 'POST'
    };

    http.request(options,function(res){
        console.log("STATUS:" + res.statusCode);
        console.log("HEADERS:" + res.headers );
        res.setEncoding('utf-8');
        res.on('data', function(data){
            console.log("BODY:" + data);
        })
    }).end();
}

module.exports.callGoogle=callGoogle;