const Hall= require("../models.js/hall");

//function to add new hall to the system
addhall = function (req, res, next) {
    var hallData = req.body;

    Hall.findOne({
        hallname: hallData.hallname
    }, function (err, hallitem) {
        if (err) {
            res.json({
                error: "internal server error"
            });
        } else if (hallitem) {
            res.json({
                error: "hall already exsist"
            });
        } else if (!hallitem) {
            var newHall = new Hall(hallData);
            newHall.save().then(function (hallitem) {
                res.send(hallitem);
            });
           
        }

    });
}
module.exports.addhall = addhall;

// function to get the halls of  the system

gethalls = function (req, res, next) {
    //studentData = req.body;
    Hall.find({}, {  hallname: 1, halltype: 1 }, function (err, hall) {
        if (err) {
            res.status(500);
            res.send({ errors: "Error when finding the hall record." });
            //return;
        }
        if (hall) {
            res.status(200);
            res.send(hall);
            //return;
        }
    });
    
}
module.exports.gethalls = gethalls;

// function to get the hall of  the system

gethall = function (req, res, next) {
    var hallId = req.params.id;
    Student.findOne({ _id: hallId }, { hallname: 1, halltype: 1 }, function (err, hall) {
        if (err) {
            res.status(400);
            res.send({ errors: "Error when finding the hallrecord." });
        }
        if (!hall) {
            res.status(400);
            res.send({ errors: "Unabale to find the hall record." });
        }
        if (hall) {
            res.status(200);
            res.send(hall);
        }
    });
}
module.exports.gethall = gethall;

//function to delete hall from the system

deletehall = function (req, res, next) {
    var hallData = req.params;
    console.log(hallData);
    Hall.deleteOne({
        _id: hallData.id
    }, function (err) {
        if (err) {
            res.status(500);
            res.send({
                errors: "internal server errors"
            });
        } else {
            res.status(200);
            res.send({
                success: "successfuly deleted the hall"
            });
        }
    });
}

module.exports.deletehall = deletehall;

//function to update  hall to the system

updatehall = function (req, res, next) {
    Hall.findByIdAndUpdate({
        _id: req.params.id
    }, req.body).then(function () {
        Hall.findOne({
            _id: req.params.id
        }).then(function (hallitem) {
            res.send(hallitem);
        });
    });
};

module.exports.updatehall = updatehall;