const jwt = require("jsonwebtoken");

module.exports = {
    generateJwtToken(data) {
        return jwt.sign(
            data,
            process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRY
            }
        );
    }
}
