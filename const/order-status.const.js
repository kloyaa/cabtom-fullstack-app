const orderStatus = [
    {
        uid: "727695f7-e605-4003-9d1d-684e26f97cfe",
        title: "Preparing your order",
        description: "We are preparing your order and will ship it as soon as possible."
    },
    {
        uid: "6c8a8928-4f34-426f-9fdf-8713a74d54a1",
        title: "Order Ready to Ship",
        description: "Your order is packed and will be handled to our delivery courier"
    },
    {
        uid: "24a05745-4e27-4ad6-965e-f1164d9a9fa4",
        title: "Order Picked Up",
        description: "Your order has been picked up by CABTOM delivery courier"
    },
    {
        uid: "31237058-199a-4dfe-a12c-008d6da28206",
        title: "Out for Delivery",
        description: "CABTOM will deliver your order today. Keep your lines open and prepare exact payment"
    },
    {
        uid: "50f74228-873f-444d-8b7b-16a0b6eed4ce",
        title: "Unexpected delivery delays",
        description: "Your order is on the way to you. The journey might take longer than expected but we're expediting deliveries as much as we can. Thank you for your patience"
    },
    {
        uid: "0ad8892a-dbad-4590-904a-edd518d6587e",
        title: "Delivered!",
        description: "Order has been delivered. Please check the product if correct. For filling a Return/Refund please contact CABTOM"
    }
];

const orderAuthorizedRoles = [
    {
        uid: "1bcc48fc-1132-4cff-b39d-2779ff399ca8",
        title: "Staff",
        description: "Authorized employee by CABTOM organization"
    },
    {
        uid: "dbb6d2d3-ce13-4e8f-895d-261a7fab26ca",
        title: "Driver",
        description: "Authorized professional driver by CABTOM organization"
    },
];


module.exports = {
    orderStatus,
    orderAuthorizedRoles
}
