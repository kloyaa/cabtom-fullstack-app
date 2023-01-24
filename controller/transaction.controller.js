const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../middleware/auth.middleware");

const { Transaction, Proof } = require("../model/transaction.model");
const Product = require("../model/product.model");
const { OrderStatus, OrderAuthorizedRoles } = require("../model/order-status.model");

const { successMessage, transactionNotFoundMsg } = require("../const/messages.const");
const { event } = require("../__core/event/event");
const { EventType } = require("../enum/event.enum");
const { convertToObjectId } = require("../utils/convert-to-objectId.utils");

router.post("/transaction", jwtAuth, async (req, res) => {
    const product = await Product.findOne({});
    const payload = {
        user: req.user._id,
        payment: {
            amount: req.body.unit * product.price
        },
        order: {
            product: req.body.order.product,
            status: ["727695f7-e605-4003-9d1d-684e26f97cfe"],
            deliveryAddress: req.body.order.deliveryAddress
        },
        unit: req.body.unit
    }
    new Transaction(payload)
        .save()
        .then(value => res.status(200).json(value))
        .catch(err => res.status(400).json(err));
});

router.get("/transaction/order-status/all", jwtAuth, async (req, res) => {
    OrderStatus.find({})
        .select({ __v: 0 })
        .sort({ createdAt: "desc" })
        .then(value => res.status(200).json(value))
        .catch(err => res.status(400).json(err));
});

router.get("/transaction/all", jwtAuth, async (req, res) => {
    Transaction
        .aggregate([
            {
                $sort :  {
                    createdAt : -1
                }
            },
            {
                $lookup:  {
                    from: 'products',
                    localField: 'order.product',
                    foreignField:  'uid',
                    as: 'product'
                }
            },
            {
                $lookup:  {
                    from: 'profiles',
                    localField: 'order.participant',
                    foreignField: 'user',
                    as: 'participants'
                }
            },
            {
                $lookup:  {
                    from: 'orderstatuses',
                    localField: 'order.status',
                    foreignField:  'uid',
                    as: 'status'
                }
            },
            {
                $lookup:  {
                    from: 'proofs',
                    localField: 'payment.proof',
                    foreignField:  '_id',
                    as: 'proofOfPayments'
                }
            },
            {
                $project: {
                    _id: 1,
                    user: 1,
                    payment: 1,
                    order: 1,
                    unit: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    status: 1,
                    participants: 1,
                    proofOfPayments: 1,
                    product:  { $first: "$product" },
                }
            },


        ])
        .then(value => res.status(200).json(value))
        .catch(err => res.status(400).json(err));
});

router.get("/transaction/all/filter/by-user", jwtAuth, async (req, res) => {
   const { user, status } = req.query;

   try {
        Transaction
            .aggregate([
                {
                    $sort :  {
                        createdAt : -1
                    }
                },
                {
                    $lookup:  {
                        from: 'products',
                        localField: 'order.product',
                        foreignField:  'uid',
                        as: 'product'
                    }
                },
                {
                    $lookup:  {
                        from: 'profiles',
                        localField: 'order.participant',
                        foreignField: 'user',
                        as: 'participants'
                    }
                },
                {
                    $lookup:  {
                        from: 'orderstatuses',
                        localField: 'order.status',
                        foreignField:  'uid',
                        as: 'status'
                    }
                },
                {
                    $lookup:  {
                        from: 'proofs',
                        localField: 'payment.proof',
                        foreignField:  '_id',
                        as: 'proofOfPayments'
                    }
                },
                {
                    $match : {
                        user: user === undefined
                            ? convertToObjectId(req.user._id)
                            : convertToObjectId(user),
                        'payment.status': status
                    }
                },
                {
                    $project: {
                        _id: 1,
                        user: 1,
                        payment: 1,
                        order: 1,
                        unit: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        status: 1,
                        participants: 1,
                        proofOfPayments: 1,
                        product:  { $first: "$product" },
                    }
                },
            ])
            .then(value => res.status(200).json(value))
            .catch(err => res.status(400).json(err));
   } catch (error) {
        console.log(error)
   }
});

router.get("/transaction/all/filter/by-date", jwtAuth, async (req, res) => {
    const { date, endDate, status } = req.query;

    Transaction
        .aggregate([
            {
                $sort :  {
                    createdAt : -1
                }
            },
            {
                $lookup:  {
                    from: 'products',
                    localField: 'order.product',
                    foreignField:  'uid',
                    as: 'product'
                }
            },
            {
                $lookup:  {
                    from: 'orderstatuses',
                    localField: 'order.status',
                    foreignField:  'uid',
                    as: 'status'
                }
            },
            {
                $match: {
                    createdAt: {
                        $gte: new Date(date),
                        $lt:  new Date(endDate)
                    },
                    'payment.status': status
                }
            },
            {
                $project: {
                    _id: 1,
                    user: 1,
                    payment: 1,
                    order: 1,
                    unit: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    status: 1,
                    product:  { $first: "$product" },
                }
            }

        ])
        .then(value => res.status(200).json(value))
        .catch(err => res.status(400).json(err));
})

router.patch("/transaction/order-status/edit", jwtAuth, async (req, res) => {
    const { _id, uid } = req.body;
    Transaction.findOneAndUpdate(
        { _id },
        { $push: { 'order.status': uid  } },
        { new: true })
        .then(value => {
            if (!value) return res
                .status(400)
                .json(transactionNotFoundMsg)
            return res.status(200).json(successMessage);
        })
        .catch(err => res.status(400).json(err));
})

router.patch("/transaction/order-participant/edit", jwtAuth, async (req, res) => {
    const { _id  } = req.body;
    Transaction.findOneAndUpdate(
        { _id },
        { $push: { 'order.participant': req.user._id  } },
        { new: true })
        .then(value => {
            if (!value) return res
                .status(400)
                .json(transactionNotFoundMsg)
            return res.status(200).json(successMessage);
        })
        .catch(err => res.status(400).json(err));
})

router.patch("/transaction/payment-proof/edit", jwtAuth, async (req, res) => {
    const { _id, url } = req.body;

    const proof = await new Proof({ url }).save();
    Transaction.findOneAndUpdate(
        { _id },
        { $push: { 'payment.proof': proof._id } },
        { new: true })
        .then(value => {
            console.log(value)
            if (!value) return res
                .status(400)
                .json(transactionNotFoundMsg)
            return res.status(200).json(successMessage);
        })
        .catch(err => res.status(400).json(err));
})

router.get("/transaction/order-participant/filter/by-user-absence", jwtAuth, async (req, res) => {
    try {
         Transaction
             .aggregate([
                 {
                     $sort :  {
                         createdAt : -1
                     }
                 },
                 {
                     $lookup:  {
                         from: 'products',
                         localField: 'order.product',
                         foreignField:  'uid',
                         as: 'product'
                     }
                 },
                 {
                     $lookup:  {
                         from: 'orderstatuses',
                         localField: 'order.status',
                         foreignField:  'uid',
                         as: 'status'
                     }
                 },
                 {
                     $match : {
                         'order.participant': {
                             $nin: [  convertToObjectId(req.user._id) ]
                         },
                     }
                 },
                 {
                     $project: {
                         _id: 1,
                         user: 1,
                         payment: 1,
                         order: 1,
                         unit: 1,
                         createdAt: 1,
                         updatedAt: 1,
                         status: 1,
                         product:  { $first: "$product" },
                     }
                 },
             ])
             .then(value => res.status(200).json(value))
             .catch(err => res.status(400).json(err));
    } catch (error) {
         console.log(error)
    }
 })

router.get("/transaction/order-participant/filter/by-user", jwtAuth, async (req, res) => {
   try {
        Transaction
            .aggregate([
                {
                    $sort :  {
                        createdAt : -1
                    }
                },
                {
                    $lookup:  {
                        from: 'products',
                        localField: 'order.product',
                        foreignField:  'uid',
                        as: 'product'
                    }
                },
                {
                    $lookup:  {
                        from: 'orderstatuses',
                        localField: 'order.status',
                        foreignField:  'uid',
                        as: 'status'
                    }
                },
                {
                    $match : {
                        'order.participant': {
                            $in: [  convertToObjectId(req.user._id) ]
                        },
                    }
                },
                {
                    $project: {
                        _id: 1,
                        user: 1,
                        payment: 1,
                        order: 1,
                        unit: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        status: 1,
                        product:  { $first: "$product" },
                    }
                },
            ])
            .then(value => res.status(200).json(value))
            .catch(err => res.status(400).json(err));
   } catch (error) {
        console.log(error)
   }
})

router.patch("/transaction/payment-status/edit", jwtAuth, async (req, res) => {
   try {
    const { _id, status } = req.body;
    const transaction = await Transaction.findOne({});
    const product = await Product.findOne({});

    Transaction.findOneAndUpdate(
        { _id },
        { $set: { "payment.status": status } },
        { new: true, runValidators: true })
        .then(async (value) => {
            if (!value) return res
                .status(400)
                .json(transactionNotFoundMsg)

            if(transaction.payment.status === "pending" && value.payment.status === "approved") {
                if (product.unit < value.unit) return res
                    .status(400)
                    .json({ message: `there are ${product.unit} left in our warehouse` })

                await Product.findByIdAndUpdate(product._id,
                    { unit: product.unit - value.unit },
                    { new: true });

                event(EventType.PaymentReceived, {
                    user:  req.user?._id,
                    data:{
                        "isMobile": req.useragent.isMobile,
                        "isDesktop": req.useragent.isDesktop,
                        "isBot": req.useragent.isBot,
                        "browser": req.useragent.browser,
                        "version": req.useragent.version,
                        "os": req.useragent.os,
                        "platform": req.useragent.platform,
                        "source":  req.useragent.source
                    },
                    type: EventType.PaymentReceived,
                });
            }

            return res.status(200).json(successMessage);
        })
        .catch(err => res.status(400).json(err));
   } catch (error) {
        console.log(error)
   }
})

module.exports = router;
