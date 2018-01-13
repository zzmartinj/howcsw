var express = require('express');
var router = express.Router();
var eventsearch = require('../controllers/eventsearch'); //my own google api controller


router.get('/:eventname', function(req, res, next) {
  var event=req.params.eventname;
  //var key=req.params.key;
  var key=req.query.key;
  eventsearch.callBing(res,res,event, key);  //call Bing over Azure!
  res.render('index', { title: 'Test! ' + event });
});
/* GET home page and show that you must supply an event. */
router.get('/', function(req, res, next) {
  var err = new Error('Must supply an event!');
  err.status = 500;
  next(err);
});

module.exports = router;
