const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
    autoCreate: false,
    timestamps: true
};

const PaymentProofSchema = new Schema({
    url: {  type: String },
}, options);

const TransactionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    payment: {
        proof: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Proof'
            }
        ],
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'decline'],
            default: 'pending'
        },
    },
    order: {
        product: {
            type: String,
            required: true,
            ref: 'Product'
        },
        participant: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Profile'
            }
        ],
        status: [
            {
                type: String,
                ref: 'OrderStatus'
            },
        ],
        deliveryAddress: {
            type: String,
            required: true
        },
    },
    unit: {
        type: Number,
        required: true
    },
}, options);

module.exports = {
    Transaction: mongoose.model("Transaction", TransactionSchema),
    Proof: mongoose.model("Proof", PaymentProofSchema)
}
