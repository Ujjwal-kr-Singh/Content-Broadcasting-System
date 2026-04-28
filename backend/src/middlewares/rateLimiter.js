const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
    windowMs: 30 * 1000,
    max: 5,             
    message: {
        error: "Too many requests, please try again later"
    },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = rateLimiter;