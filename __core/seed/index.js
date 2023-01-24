const mongoose = require('mongoose');
require("dotenv").config();

const seedOrderStatus = require("./order-status.seed")
const seedProduct = require("./product.seed")

try {
    async function run() {
        mongoose
            .set("strictQuery", false)
            .set("strictPopulate", false)
            .connect(process.env.CONNECTION_STRING)

        await seedOrderStatus();
        await seedProduct();
        console.log("SEEDING COMPLETE")
    }
    run();
} catch (error) {
    console.log(error)
}
