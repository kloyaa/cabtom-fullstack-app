const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
    autoCreate: false,
    timestamps: true
};

const ProductSchema = new Schema({
    uid: { type: String },
    name: { type: String },
    price: { type: Number },
    unit: { type: Number },
}, options);

module.exports = Product = mongoose.model("Product", ProductSchema);
