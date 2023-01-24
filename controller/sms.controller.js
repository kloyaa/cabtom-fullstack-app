const express = require("express");
const router = express.Router();
const {
    send,
    sendBulk,
    sendPriority,
    sendOtp,
    messages,
    account,
    transactions,
    senderNames,
    users
 } = require("../__core/sms/semaphore/semaphone.sms");
 const { jwtAuth } = require("../middleware/auth.middleware");
 const { event } = require("../__core/event/event");
const { EventType } = require("../enum/event.enum");

const apikey =  process.env.SEMAPHORE_APIKEY;

router.post("/sms/semaphore/messages", jwtAuth, async (req, res) => {
    await send({ apikey, ...req.body })
        .then((value) => res.status(200).json(value.data))
        .catch((err) => res.status(400).json(err));

    event(EventType.SmsNotification, {
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
        type: EventType.SmsNotification,
    });
})

router.post("/sms/semaphore/messages/priority", jwtAuth, async (req, res) => {
    await sendPriority({ apikey, ...req.body })
        .then((value) => res.status(200).json(value.data))
        .catch((err) => res.status(400).json(err))

    event(EventType.SmsPriorityNotification, {
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
        type: EventType.SmsPriorityNotification,
    });
})

router.post("/sms/semaphore/messages/bulk", jwtAuth, async (req, res) => {
    await sendBulk({ apikey, ...req.body  })
        .then((value) => res.status(200).json(value.data))
        .catch((err) => res.status(400).json(err));

    event(EventType.SmsBulkNotification, {
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
        type: EventType.SmsBulkNotification,
    });
})

router.post("/sms/semaphore/messages/otp", jwtAuth, async (req, res) => {
    await sendOtp({ apikey, ...req.body })
        .then((value) => res.status(200).json(value.data))
        .catch((err) => res.status(400).json(err))
})

router.get("/sms/semaphore/messages", jwtAuth, async (req, res) => {
    await messages({ apikey, ...req.query })
        .then((value) => res.status(200).json(value.data))
        .catch((err) => res.status(400).json(err))
});

router.get("/sms/semaphore/account", jwtAuth, async (req, res) => {
    await account({ apikey })
        .then((value) => res.status(200).json(value.data))
        .catch((err) => res.status(400).json(err))
});

router.get("/sms/semaphore/account/transactions", jwtAuth, async (req, res) => {
    await transactions({ apikey, ...req.query })
        .then((value) => res.status(200).json(value.data))
        .catch((err) => res.status(400).json(err))
});

router.get("/sms/semaphore/account/sendernames", jwtAuth, async (req, res) => {
    await senderNames({ apikey, ...req.query })
        .then((value) => res.status(200).json(value.data))
        .catch((err) => res.status(400).json(err))
});

router.get("/sms/semaphore/account/users", jwtAuth, async (req, res) => {
    await users({ apikey, ...req.query })
        .then((value) => res.status(200).json(value.data))
        .catch((err) => res.status(400).json(err))
});

module.exports = router;
