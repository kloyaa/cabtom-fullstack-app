const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
    autoCreate: false,
    timestamps: true
};

const MessageSchema = new Schema({
    name: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true,
        },
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    opened: {
        type: Boolean,
        default: false
    },
}, options);

module.exports = Message = mongoose.model("Message", MessageSchema);
