var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Animal = mongoose.model('Animal');

var isAuthenticated = function (req, res, next) {
  
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

module.exports = function(passport) {
  
  router.get('/', function(req, res) {
    res.render('index', { message: req.flash('message') });
  });
  
  router.get('/login', function(req, res) {
    res.render('login', { message: req.flash('message') });
  });
  
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/profile', 
    failureRedirect: '/login', 
    failureFlash : true
  }));
  
  router.get('/signup', function(req, res){
    res.render('signup',{message: req.flash('message')});
  });
  
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/profile', 
    failureRedirect: '/signup',
    failureFlash : true
  }));
  
  router.get('/profile', isAuthenticated, function(req, res){
    res.render('profile', { user: req.user });
  });
  
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  
  router.get('/login/facebook', 
  passport.authenticate('facebook', { scope : 'email' }
  ));
  
  router.get('/login/facebook/callback', 
  passport.authenticate('facebook', {
    successRedirect : '/profile', 
    failureRedirect : '/'
  })
  );
  
  router.get('/login/linkedin', 
  passport.authenticate('linkedin'));
  
  router.get('/login/linkedin/callback', 
  passport.authenticate('linkedin', {
    successRedirect : '/profile', 
    failureRedirect : '/'
  })
  );

router.get('/animals', isAuthenticated, function(req, res, next) {
  Animal.find(function(err, animals){
    if(err){ return next(err); }
    res.json(animals);
  });
});

return router;
}