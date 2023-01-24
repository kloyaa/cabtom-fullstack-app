const { orderStatus, orderAuthorizedRoles } = require('../../const/order-status.const');
const { OrderAuthorizedRoles, OrderStatus } = require("../../model/order-status.model");

module.exports = async function seedOrderStatus() {
    await OrderStatus.deleteMany({});
    await OrderAuthorizedRoles.deleteMany({});

    await OrderAuthorizedRoles.create(orderAuthorizedRoles)
        .then(() => console.log("SEEDING ORDER AUHORIZED ROLES"))
        .catch(() => console.log("SEEDING ORDER AUHORIZED ROLES FAILED"));;

    await OrderStatus.create(orderStatus)
        .then(() => console.log("SEEDING ORDER STATUS"))
        .catch(() => console.log("SEEDING ORDER STATUS FAILED"));;
}
