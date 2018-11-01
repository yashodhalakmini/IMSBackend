const Item = require("../models.js/inventory");

//function to add new inventory to the system
addinventory = function (req, res, next) {
    var inventoryData = req.body;
    console.log(req.body);

    Item.findOne({
        itemname: inventoryData.itemname
    }, function (err, inventoryitem) {
        if (err) {
            res.json({
                error: "internal server error"
            });
        } else if (inventoryitem) {
            res.json({
                error: "item already exsist"
            });
        } else if (!inventoryitem) {
            var newItem = new Item(inventoryData);
            newItem.save().then(function (inventoryitem) {
                res.send(inventoryitem);
            });
            //res.json({success:"user sucseefuly added"});
            //res.json(newU);
        }

    });
}
module.exports.addinventory = addinventory;

// function to get the inventories of  the system

getinventories = function (req, res, next) {
    //studentData = req.body;
    Item.find({}, {  itemname: 1, itemtype: 1, hallname:1, status:1 }, function (err, item) {
        if (err) {
            res.status(500);
            res.send({ errors: "Error when finding the item record." });
            //return;
        }
        if (item) {
            res.status(200);
            res.send(item);
            //return;
        }
    });
    
}
module.exports.getinventories = getinventories;

// function to get the hall of  the system

getinventory = function (req, res, next) {
    var itemId = req.params.id;
    Item.findOne({ _id: itemId }, { itemname: 1, itemtype: 1, hallname:1, status:1 }, function (err, item) {
        if (err) {
            res.status(400);
            res.send({ errors: "Error when finding the itemrecord." });
        }
        if (!item) {
            res.status(400);
            res.send({ errors: "Unabale to find the item record." });
        }
        if (item) {
            res.status(200);
            res.send(item);
        }
    });
}
module.exports.getinventory = getinventory;

//function to delete new inventory from the system

deleteinventory = function (req, res, next) {
    var inventoryData = req.params;
    console.log(inventoryData);
    Item.deleteOne({
        _id: inventoryData.id
    }, function (err) {
        if (err) {
            res.status(500);
            res.send({
                errors: "internal server errors"
            });
        } else {
            res.status(200);
            res.send({
                success: "successfuly deleted the inventory"
            });
        }
    });
}

module.exports.deleteinventory = deleteinventory;

//function to update  inventory to the system

updateinventory = function (req, res, next) {
    Item.findByIdAndUpdate({
        _id: req.params.id
    }, req.body).then(function () {
        Item.findOne({
            _id: req.params.id
        }).then(function (inventoryitem) {
            res.send(inventoryitem);
        });
    });
};
module.exports.updateinventory = updateinventory;

//function to status  inventory to the system

statusinventory= function(req,res, next){
    var status= req.params.status;
    console.log(statusss);
    Item.findOne({status:status},function(err,item){
        if (err) {
            res.status(400);
           return  res.send({ errors: "Error when finding the itemrecord." });
        }
        if (!item) {
            res.status(400);
           return res.send({ errors: "Unabale to find the item record." });
        }
        if (item) {
            res.status(200);
          return  res.send(item);
        }
    });

};

module.exports.statusinventory = statusinventory;