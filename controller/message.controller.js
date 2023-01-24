const express = require("express");
const router = express.Router();
const { extMessageNotFoundMsg, successMessage } = require("../const/messages.const");
const { EventType } = require("../enum/event.enum");
const { event } = require("../__core/event/event");
const { jwtAuth } = require("../middleware/auth.middleware");

const ExtMessage = require("../model/ext-message.model");

router.post("/message/ext",  async (req, res) => {
    new ExtMessage(req.body)
        .save()
        .then(value => res.status(200).json(value))
        .catch(err => res.status(400).json(err));
});

router.get("/message/ext/all", jwtAuth, async (req, res) => {
    ExtMessage.find({})
        .select({ __v: 0 })
        .sort({ createdAt: "desc" })
        .then(value => res.status(200).json(value))
        .catch(err => res.status(400).json(err));
});

router.put("/message/ext/edit", jwtAuth, async (req, res) => {
    const { _id, opened } = req.body;
    ExtMessage.findByIdAndUpdate(_id, { opened }, { new: true })
        .then(value => {
            if (!value) return res
                .status(400)
                .json(extMessageNotFoundMsg)
            return res.status(200).json(successMessage);
        })
        .catch(err => res.status(400).json(err));
});

router.delete("/message/ext/:id", jwtAuth, async (req, res) => {
    const _id = req.params.id;
    const deleteExtMessage = await ExtMessage.findByIdAndDelete(_id)

    if(deleteExtMessage)
        event(EventType.ExtMessageDelete, {
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
            type: EventType.ExtMessageDelete,
        });

    return res.status(200).json(successMessage);
});

module.exports = router;
