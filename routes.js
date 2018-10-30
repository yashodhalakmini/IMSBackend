const express = require("express");
var passport = require("passport");
var User = require("./models.js/user");
//var Item = require("./models.js/inventory");

var routes = express.Router();

function userAuthorize(req, res, next) {
    if (req.user.usertype === "user") {
        next();
    } else {
        res.render("404");
    }
}

function adminAuthorize(req, res, next) {
    if (req.user.usertype === "admin") {
        next();
    } else {
        res.render("404");
    }
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/");
    }
};

routes.get("/", function (req, res) {
    res.status(200).render("index");
});

// routes.post("/login", passport.authenticate("local", {
//     failureRedirect: "/"
// }), function (req, res, next) {
//     console.log(req.user);
//     console.log("sssssrs");
//     if (req.user.usertype === "user") {
//         res.redirect("/user");
//     }
//     if (req.user.usertype === "admin") {
//         res.redirect("/admin");
//     }
// });

// routes.post("/login",function(req,res,next){
//     console.log(req.body);
// });
routes.get("/user", ensureAuthenticated, userAuthorize, function (req, res) {
    res.status(200).render("user_home");
});

routes.get("/admin", ensureAuthenticated, adminAuthorize, function (req, res) {
    res.status(200).render("admin_home");
});

routes.get("/admin/usermanage", ensureAuthenticated, adminAuthorize, function (req, res) {
    res.status(200).render("usermanage");
});
routes.get("/admin/inventorymanage", ensureAuthenticated, adminAuthorize, function (req, res) {
    res.status(200).render("inventorymanage");
});

//add new user

routes.post("/signup", function (req, res, next) {
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
    // User.findOne({
    //     username: userData.username
    // }, function (err, user) {
    //     if (err) {
    //         res.status(500);
    //         res.send({
    //             error: "Error...."
    //         });
    //         return;
    //     }
    //     if (user) {
    //         res.status(500);
    //         res.send({
    //             error: "user is already exist."
    //         });
    //         return;
    //     }
    //     var newUser = new User(userData);
    //     newUser.save();
    //     res.status(201);
    //     res.send(newUser);
    // });
    // // User.save({
    //     userData,
    //     function (err, user) {
    //         if (err) {
    //             res.status(403);
    //             res.send("Error.....");
    //         }
    //         if (user) {
    //             res.status(201);
    //             res.send(user);
    //         }
    //     }
    // });
});

routes.post("/plain", function (req, res, next) {
    res.json(req.body);
});

//remove user
routes.delete("/user/:id", function (req, res, next) {
    //var userData=req.body;
    User.findByIdAndRemove({
        _id: req.params.id
    }).then(function (user) {
        //console.log(req.body.id);
        res.send(user);
    });

});

//update user
routes.put("/user/:id", function (req, res, next) {
    // var userData=req.body;
    User.findByIdAndUpdate({
        _id: req.params.id
    }, req.body).then(function () {
        User.findOne({
            _id: req.params.id
        }).then(function (user) {
            res.send(user);
        });
    });
});

//original code for inventoty..
//add inventory items

// routes.post("/addinventory", function (req, res, next) {
//     var inventoryData = req.body;

//     Item.findOne({id:req.body.id},function(err,inventoryitem){
//         if(err){
//             res.json({error:"internal server error"});
//         }else if(inventoryitem){
//             res.json({error:"item already exsist"});
//         }
//         else if(!inventoryitem) {
//             var newItem = new Item(inventoryData);
//             newItem.save().then(function(inventoryitem){
//                 res.send(inventoryitem);
//             });
//             //res.json({success:"user sucseefuly added"});
//             //res.json(newU);
//         }

//     });
// });

// //remove inventory
//     routes.delete("/inventoryitem/:id", function(req,res, next){
//         //var userData=req.body;
//     Item.findByIdAndRemove({_id:req.params.id}).then(function(inventoryitem){
//     //console.log(req.body.id);
//         res.send(inventoryitem);
//     });

//     });

//     //update inventory
//     routes.put("/inventoryitem/:id", function(req,res,next){
//         // var userData=req.body;
//     Item.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
//         Item.findOne({_id:req.params.id}).then(function(inventoryitem){
//          res.send(inventoryitem);
//         });
//     });
//     });  
//
//end of original code..

routes.use(function (req, res) {
    res.status(404).render("404");
});

module.exports = routes;