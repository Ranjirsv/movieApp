var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/schema');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){console.log("in signup");
                // find a user in Mongo with provided username
                User.findOne({ 'mail' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User already exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.username =  req.param('displayname');
                         newUser.phonenumber=req.param('phonenumber');
                        newUser.password = createHash(password);
                          newUser.mail =username;
                      
                       
                        // save the user
                        console.log("new user"+newUser);
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in saving user in the database: '+err);
                                throw err;
                            }
                            console.log('New user registration succesful');
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}
