var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
    passport.use('login', new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password',
        passReqToCallback : true,
    },
    function(req, email, password, done) {
        
        if (email)
        email = email.toLowerCase();
        //check in mongo if user with username exists or not//
        User.findOne({ 'email' : email },
        function(err, user) {
            //in case of error return using done method//
            if (err)
            return done(err);
            //username does not exist, log error and redirect//
            if (!user){
                console.log('user not found with email '+ email);
                return done(null, false, 
                req.flash('message', 'user not found'));
            }
            //user found but wrong password//
            if (!isValidPassword(user.local.password, password)){
                console.log('invalid password');
                return done(null, false, 
                req.flash('message', 'invalid password'));
            }
            //user and password match, return user from done method which will be treated like succes//
            return done(null, user);
        }
        );
    }));
    var isValidPassword = function(cipherPass, password){
        return bCrypt.compareSync(password, cipherPass);
    }
};







