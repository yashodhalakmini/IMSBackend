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




//function to serch user

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


//function to delete user from the system

deleteuser = function (req, res, next) {
    var userData = req.body;
    console.log(userData);
    User.deleteOne({
        username: userData.username
    }, function (err) {
        if (err) {
            res.status(500);
            res.send({
                errors: "internal server errors"
            });
        } else {
            res.status(200);
            res.send({
                success: "successfuly deleted the user"
            });
        }
    });
}

module.exports.deleteuser = deleteuser;

//function to update  inventory to the system

updateuser = function (req, res, next) {
    var userData = req.body;
    User.findOneAndUpdate({
        username: userData.username
    }, req.body).then(function () {
        User.findOne({
            username: userData.username
        }).then(function (user) {
            res.send(user);
        });
    });
};
module.exports.updateuser = updateuser;