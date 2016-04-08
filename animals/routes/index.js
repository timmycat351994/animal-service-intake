var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Animal = mongoose.model('Animal');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/animals', function(req, res, next) {
  Animal.find(function(err, animals){
    if(err){ return next(err); }
    res.json(animals);
  });
});


