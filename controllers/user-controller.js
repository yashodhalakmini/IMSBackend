

const User = require("../models.js/user");


adduser=function (req, res, next) {
    var userData = req.body;

    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) {
            res.json({
                error: "internal server error"
            });
        } else if (user) {
            res.json({
                error: "user already exsist"
            });
        } else if (!user) {
            var newUser = new User(userData);
            newUser.save().then(function (user) {
                res.send(user);
            });
            //res.json({success:"user sucseefuly added"});
            //res.json(newU);
        }

    });
    
}


module.exports.adduser=adduser;