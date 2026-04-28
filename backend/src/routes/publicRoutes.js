const express = require("express");
const router = express.Router();

const publicController = require("../controllers/publicController");
const rateLimiter = require("../middlewares/rateLimiter");

router.get("/live/:teacherId", rateLimiter, publicController.getLiveContent);

module.exports = router;