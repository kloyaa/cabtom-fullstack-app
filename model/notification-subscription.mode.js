const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
    autoCreate: false,
    timestamps: true
};

const SubscriptionsSchema = new Schema({
    email: { type: String },
    number: { type: String },
}, options);

module.exports = Subscription = mongoose.model("Subscription", SubscriptionsSchema);

