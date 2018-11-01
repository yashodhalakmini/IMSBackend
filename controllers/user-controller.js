const User = require("../models.js/user");


adduser = function (req, res, next) {
    var userData = req.body;
    console.log("ssss");
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
                res.send("succesfully added user");
            });
            //res.json({success:"user sucseefuly added"});
            //res.json(newU);
        }

    });

}




module.exports.adduser = adduser;

searchUser = function (req, res, next) {
    var userData = req.body
    console.log(userData);
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) {
            res.json({
                error: "internal server error"
            });
        } else if (user) {
            res.json({
                username: user.username,
                type: user.usertype

            });
        } else if (!user) {

            res.send("no user");
            //res.json({success:"user sucseefuly added"});
            //res.json(newU);
        }

    });
}

module.exports.searchUser = searchUser;