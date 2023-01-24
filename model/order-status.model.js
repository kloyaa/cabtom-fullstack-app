const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
    autoCreate: false,
    timestamps: true
};

const OrderStatusSchema = new Schema({
    uid: { type: String },
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

}, options);

const OrderAuthorizedRolesSchema = new Schema({
    uid: { type: String },
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

}, options);

module.exports = {
    OrderStatus: mongoose.model("OrderStatus", OrderStatusSchema),
    OrderAuthorizedRoles: mongoose.model("OrderAuthorizedRoles", OrderAuthorizedRolesSchema)
}
