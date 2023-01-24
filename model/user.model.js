const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
    autoCreate: false,
    timestamps: true
};

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    hashValue: {
        type: String,
        required: true,
    },

}, options);

module.exports = User = mongoose.model("User", UserSchema);
