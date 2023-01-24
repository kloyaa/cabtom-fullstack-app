const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../middleware/auth.middleware");

const Event = require("../model/event.model");

router.get("/logs/event", jwtAuth, (req, res) => {
    Event
        .aggregate([
            {
                $lookup:  {
                    from: 'profiles',
                    localField: 'user',
                    foreignField:  'user',
                    as: 'profile'
                }
            },
            {
                $lookup:  {
                    from: 'users',
                    localField: 'user',
                    foreignField:  '_id',
                    as: 'user'
                }
            },
            {
                $project: {
                    _id: 1,
                    user: 1,
                    data: 1,
                    type: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    profile:  { $first: "$profile" },
                    user:  { $first: "$user" },
                }
            }

        ])
        .then(value => res.status(200).json(value))
        .catch(err => res.status(400).json(err));
});

module.exports = router;
