require("dotenv").config();
const jwt = require("jsonwebtoken");
const { unauthorizedMessage } = require("../const/messages.const");

const jwtAuth = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res
            .status(401)
            .json(unauthorizedMessage);

        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, value) => {
            if (err) return res
                .status(401)
                .json(unauthorizedMessage);
            req.user = value;
            next();
        });
    } catch (error) {
        return res
            .status(500)
            .json(error);
    }
};

module.exports = { jwtAuth };
