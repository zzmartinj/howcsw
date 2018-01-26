var express = require('express');
var router = express.Router();
var https = require('https'); // NOTE this is httpS, not http
var eventsearch = require('../controllers/eventsearch'); //my own google api controller


router.get('/:eventname', function (req, res, next) {

  var event = req.params.eventname;
  var key = req.query.key;
  
  /*call Bing over Azure! */
  eventsearch.callBing(res, event,key);  
  

});

/* GET home page and show that you must supply an event. */
router.get('/', function (req, res, next) {
  var err = new Error('Must supply an event!');
  err.status = 500;
  next(err);
});

module.exports = router;
