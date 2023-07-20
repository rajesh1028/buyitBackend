const jwt = require("jsonwebtoken");
require("dotenv").config()

const authenticate = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, process.env.key, (err, decoded) => {
            if (err) {
                console.error('JWT verification failed:', err.message);
                res.status(401).json({ "msg": err.message });
            } else {
                console.log('JWT verified successfully!');
                const userID = decoded.userID;
                req.body.userID = userID;
                next();
            }
        });
    } else {
        res.status(401).json({ "msg": "Please login first" });
    }
}

module.exports = { authenticate }