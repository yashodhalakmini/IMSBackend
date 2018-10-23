const mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;



var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    }
});


userSchema.pre("save", function (done) {
    var user = this;
    if (!user.isModified("password")) {
        return done;
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt,null, function (err, hash) {
            user.password = hash;
            done();
        });
    });
});

userSchema.methods.checkPassword = function (guess, done) {
    bcrypt.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
};

var User = mongoose.model("User", userSchema);

module.exports = User;