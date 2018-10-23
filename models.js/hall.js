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
        computerlab: {
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