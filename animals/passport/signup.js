var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
    passport.use('singup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true //allows us to pass back entire request to callback//
    },
    function(req, email, password, done) {
        if (email)
        email = email.toLowerCase();
        
        var findOrCreateUser = function(){
            //find user in Mongo with provided username//
            User.findOne({ 'email' : email }, function(err, user) {
                if (err){
                    console.log('error in signup: '+err);
                    return done(err);
                }
                //already exists//
                if (user) {
                    console.log('user already exists with email: '+email);
                    return done(null, false, req.flash('message', 'user exists'));
                } else {
                    //if no user with email create user//
                    var newUser = new User();
                    
                    newUser.email = req.param('email');
                   newUser.local.password = createHash(password);
                    //save user//
                    newUser.save(function(err) {
                        if (err){
                            console.log('error in saving user: '+err);
                            throw err;
                        }
                        console.log('user registration successful');
                        return done(null, newUser);
                    });
                }
            });
        };
        process.nextTick(findOrCreateUser);
    })
    );
    
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}