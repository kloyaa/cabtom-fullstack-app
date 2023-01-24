const express = require("express");
const router = express.Router();
const Product = require("../model/product.model");

const { jwtAuth } = require("../middleware/auth.middleware");
const { productNotFoundMsg, successMessage } = require("../const/messages.const");
const { event } = require("../__core/event/event");
const { EventType } = require("../enum/event.enum");

router.get("/product", jwtAuth, (req, res) => {
    Product.find({ })
        .select({ __v: 0 })
        .then(value => res.status(200).json(value[0]))
        .catch(err => res.status(400).json(err));
});

router.put("/product/edit", jwtAuth, (req, res) => {
    Product.findOneAndUpdate(
        { _id: req.body._id },
        { ...req.body },
        { new: true })
        .then(value => {
            if (!value) return res
                .status(400)
                .json(productNotFoundMsg)
            return res.status(200).json(successMessage);
        })
        .catch(err => res.status(400).json(err));

    event(EventType.ProductUpdate, {
        user: req.user?._id,
        data: {
                "isMobile": req.useragent.isMobile,
                "isDesktop": req.useragent.isDesktop,
                "isBot": req.useragent.isBot,
                "browser": req.useragent.browser,
                "version": req.useragent.version,
                "os": req.useragent.os,
                "platform": req.useragent.platform,
                "source":  req.useragent.source
        },
        type: EventType.ProductUpdate,
    });
});


module.exports = router;
