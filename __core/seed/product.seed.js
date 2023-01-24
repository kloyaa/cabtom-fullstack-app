const { product } = require("../../const/product.const");
const Product = require("../../model/product.model");

module.exports =  async function seedProduct() {
    await Product.deleteMany({});
    await Product.create(product)
        .then(() => console.log("SEEDING PRODUCT"))
        .catch(() => console.log("SEEDING PRODUCT FAILED"));;
}
