require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../model/user.model");
const { Driver, Profile, Staff } = require("../model/profile.model");

const { jwtAuth } = require("../middleware/auth.middleware");
const { invalidLoginMessage, invalidRegistrationMessage, successMessage, failedMessage } = require("../const/messages.const");
const { generateJwtToken } = require("../utils/generate-jwt-token.utils");
const { EventType } = require("../enum/event.enum");
const { event } = require("../__core/event/event");

router.post("/user/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res
            .status(400)
            .json(invalidLoginMessage);

        bcrypt.compare(password, user.hashValue, function (err, result) {
            if (err) return res
                .status(400)
                .json(invalidLoginMessage);
            if (!result) return res
                .status(400)
                .json(invalidLoginMessage);

            return res.status(200).json({
                accessToken: generateJwtToken( {
                    _id: user._id.toString(),
                    email
                })
            });
        })

    } catch (error) {
        console.log(error);
    }
});

router.post("/user/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) return res
            .status(400)
            .json(invalidRegistrationMessage);

        await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
            .then(async (hashValue) => {
                new User({ email, hashValue })
                    .save()
                    .then((value) => res.status(200).json({
                        accessToken: generateJwtToken( {
                            _id: value._id.toString(),
                            email
                        })
                    }))
                    .catch((err) => res.status(400).json(err));
            });
    } catch (error) {
        console.log(error);
    }
});

router.delete("/user/delete/:id", jwtAuth, async (req, res) => {
   try {
    const _id = req.params.id;

    const user = await User.findByIdAndDelete({ _id });
    await Driver.findOneAndDelete({ user: _id });
    await Profile.findOneAndDelete({ user: _id });
    await Staff.findOneAndDelete({ user: _id });

    if(user) {
        event(EventType.UserDelete, {
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
            type: EventType.UserDelete,
        });
    }

    return res.status(200).json(successMessage)
   } catch (error) {
        console.log(error);
   }
})

module.exports = router;
