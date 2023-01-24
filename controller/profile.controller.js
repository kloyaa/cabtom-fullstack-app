const express = require("express");
const router = express.Router();

const { Profile, Staff, Driver } = require("../model/profile.model");
const User  = require("../model/user.model");

const { jwtAuth } = require("../middleware/auth.middleware");
const { Role } = require("../enum/role.enum");
const { duplicateProfileMsg, invalidRoleMsg, successMessage, profileNotFoundMsg } = require("../const/messages.const");
const { event } = require("../__core/event/event");
const { EventType } = require("../enum/event.enum");

router.post("/profile/create", jwtAuth, async (req, res) => {
    try {
        const { role, name: { first, last, initial } } =  req.body;

        if(!["client", "owner", "farmer", "staff", "farmer", "driver"].includes(role))
            return res.status(400).json(invalidRoleMsg);

        req.body.name.full = `${first}, ${last} ${initial}`
            .trim()
            .toUpperCase();

        const profile = await Profile.findOne({ user: req.user._id });
        if(profile)
            return res.status(400).json(duplicateProfileMsg);

        let result = await new Profile({ user: req.user._id, ...req.body }).save();
        if(role === Role.Staff) {
            const payload = {
                user: req.user._id,
                position: req.body.staff.position,
                shift: req.body.staff.shift
            }
            const staff = await new Staff(payload).save();
            result = { profile: result, secondary: staff }
        }
        if(role === Role.Driver) {
            const payload = {
                user: req.user._id,
                vehicleType: req.body.driver.vehicleType,
                vehiclePlateNumber: req.body.driver.vehiclePlateNumber
            }
            const driver = await new Driver(payload).save();
            result = { profile: result, secondary: driver }
        }
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json(error)
    }
});

router.get("/profile/filter", jwtAuth, (req, res) => {
    const { role } = req.query;

    if(["client", "owner", "farmer"].includes(role))
        Profile.find({ role })
            .select({ __v: 0 })
            .sort({ createdAt: -1 })
            .then(value => res.status(200).json(value))
            .catch(err => res.status(400).json(err));

    else {
        User.aggregate([
            {
                $lookup:  {
                    from: 'profiles',
                    localField: '_id',
                    foreignField:  'user',
                    as: 'profile'
                }
            },
            {
                $lookup:  {
                    from: `${role}s`,
                    localField: '_id',
                    foreignField:  'user',
                    as: role
                }
            },
            { $match : { 'profile.role' : role } },
            {
                $project: {
                    _id: 1,
                    email: 1,
                    hashValue: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    profile:  { $first: "$profile" },
                    [role]:  { $first: `$${role}` }
                }
            }

        ])
        .then(value => res.status(200).json(value))
        .catch(err => res.status(400).json(err));
    }
});

router.get("/profile/me", jwtAuth, async (req, res) => {

    Profile.findOne({ user: req.user?._id })
        .populate("user", { __v: 0, _id: 0 })
        .select({ __v: 0 })
        .sort({ createdAt: -1 })
        .then(value => {
            if(!value) return res
                .status(profileNotFoundMsg)
                .json(value);

            return res.status(200).json(value);
        })
        .catch(err => res.status(400).json(err));
})

router.put("/profile/edit", jwtAuth, (req, res) => {
    const { name: { first, last, initial } } =  req.body;
    req.body.name.full = `${first}, ${last} ${initial}`
        .trim()
        .toUpperCase();

    Profile.findOneAndUpdate(
        { user: req.user?._id },
        req.body,
        { new: true, runValidators: true })
        .then(value => {
            if (!value) return res
                .status(400)
                .json(profileNotFoundMsg)
            return res.status(200).json(successMessage);
        })
        .catch(err => res.status(400).json(err));

    event(EventType.ProfileUpdate, {
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
        type: EventType.ProfileUpdate,
    });
});

module.exports = router;
