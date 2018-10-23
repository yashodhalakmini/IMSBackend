const mongoose = require("mongoose");
// var bcrypt = require("bcrypt-nodejs");




var itemSchema = mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    itemname: {
        type: String,
        required: true,
    },

    itemtype: {
        electronic: {
            type: String,
            required: false
        },
        wooden: {
            type: String,
            required: false
        },
        cushion: {
            type: String,
            requied: false
        },
        plastic: {
            type: String,
            reqired: false
        },
        steel: {
            type: String,
            reqired: false
        },
        computer: {
            type: String,
            reqired: false
        }
        
    },
    hallname: {
        type: String,
        required: true
    },
    status: {
        work_well: {
            type: String,
            required: false
        },
        out_of_order: {
            type: String,
            required: false
        },
        damage: {
            type: String,
            required: false
        }
    }
});


var Item = mongoose.model("Item", itemSchema);

module.exports = Item;