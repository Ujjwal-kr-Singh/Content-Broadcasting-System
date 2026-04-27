const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const header = req.headers["authorization"];

    if (!header) {
        return res.status(403).json({ msg: "No token provided" });
    }

    try {
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    } catch (err) {
        console.error("Auth middleware error:", err);
        return res.status(401).json({ msg: "Invalid token" });
    }
};