var express = require('express');
//var request = require('request');
var axios = require('axios');

//basic function scoped out to filter our JSON received
function filterJSONResponse(webPages) {
    let returnJSON = [];
    
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
    //let body = dataToParse['data'];   
    let responseJSON = filterJSONResponse(responseJSON);
    return (JSON.stringify(responseJSON, null, '    '));
}

//This is the main entry function. It sets up what's needed to make the request, then calls 
//a function to process it and for now print it out (processRequest)
function callBing(res, query, key) {
    let host = 'https://api.cognitive.microsoft.com';
    let path = '/bing/v7.0/search';
    let url =host + path + '?mkt=en-us&answerCount=' + 2 + '&q=' + query;

    let answercount = '2';
    console.log('Searching the Web for: ' + query); 
    let request_params = {               
        headers: {
            'Ocp-Apim-Subscription-Key': key,
        }
    };
    
    axios.get(url, request_params).then(function (response) {            
        //Filter out to what we are interested in only
        let data=filterJSONResponse(response['data']['webPages']['value']);
        //console.log(JSON.stringify(data));
        //res.write(JSON.stringify(data));    
        res.render('index', {title : query, message : JSON.stringify(data)})   
        //res.send(JSON.stringify(data));
    });
  }

module.exports.callBing = callBing;