var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:eventname', function(req, res, next) {
  var event=req.params.eventname;
  res.render('index', { title: 'Test! ' + event });
});

router.get('/', function(req, res, next) {
  var err = new Error('Must supply an event!');
  err.status = 500;
  next(err);
});

module.exports = router;
