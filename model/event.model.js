const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
    autoCreate: false,
    timestamps: true
};

const EventSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    data:{
        type: Map,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },

}, options);

module.exports = Event = mongoose.model("Event", EventSchema);
