var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use( bodyParser.json() );

/* */
router.post('/add', function(req, res, next) {
  var firstNo= parseInt(req.body.firstNumber);
  var secondNo= parseInt(req.body.secondNumber);
  res.end(JSON.stringify({result: firstNo+secondNo}));
});

module.exports = router;
