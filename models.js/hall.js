const mongoose = require("mongoose");

var hallSchema = mongoose.Schema({
    hallname: {
        type: String,
        required: true
    },

    halltype: {
        lecturehall: {
            type: String,
            required: false
        },
        computerlab1: {
            type: String,
            required: false
        },
        computerlab2: {
            type: String,
            required: false
        },

        office: {
            type: String,
            required: false
        }

    }
});

var Hall = mongoose.model("Hall", hallSchema);

module.exports = Hall;