var passport = require("passport");
var User = require("./models.js/user");
var LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(function (username, password, done) {
    console.log("password");
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            console.log("err in password");
            return done(err);
           
        }
        if (!user) {
            console.log("error in finding the user");
            return done(null, false);
            
        }
        user.checkPassword(password, function (err, isMatched) {
            if (err) {
                return done(err);
            }
            if (isMatched) {
                console.log("user is matched");
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
}));

module.exports = function () {
    passport.serializeUser(function (user, done) {
        console.log("password");
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            console.log("password");
            done(err, user);
        });
    });
}