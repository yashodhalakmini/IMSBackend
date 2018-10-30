const express = require("express");
const inventoryController = require("../controllers/inventory-controller");

const router = express.Router();

//api call for creating a inventory
router.post("/", inventoryController.addinventory);

//api call for getting the list of inventories of the system
router.get("/",inventoryController.getinventories);

// api call for getting a single inventory of the system
router.get("/:id",inventoryController.getinventory);

//api call for removing a inventory
router.delete("/:id", inventoryController.deleteinventory);

//api call for updating a inventory
router.put("/:id", inventoryController.updateinventory);


router.post("/add", function (req, res, next) {
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
    
});

module.exports = router;