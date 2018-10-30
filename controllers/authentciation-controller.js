const jwt = require("jsonwebtoken");
const User =require("../models.js/user");

const SECRET_KEY = "Yasoda";

// autheticate users 
authenticateUsers = function (req, res, next) {
    userData = req.body;
    console.log(userData);
    User.findOne({ username: userData.username }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(403);
            res.send({ error: "invalid username or password" });
            
        }

        if (user) {

            user.checkPassword(userData.password, function (err, isMatch) {
                
                if (err) {

                    res.status(500);
                    res.send({ error: "invalid password" });
                    return next(err);
                }

                if (isMatch) {

                    const token = jwt.sign({ username: user.username, type: user.usertype, id: user._id }, SECRET_KEY);

                    res.status(200);
                    res.send({ token: token });
                   

                } else {
                    res.status(403);
                    res.send({ error: "invalid username or password" });
                }
            });
        }



    });
}

module.exports.authenticateUsers=authenticateUsers;