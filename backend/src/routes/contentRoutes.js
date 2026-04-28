const express = require("express");
const router = express.Router();

const contentController = require("../controllers/contentController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { allowRoles } = require("../middlewares/roleMiddleware");
const upload = require("../utils/upload");
const rateLimiter = require("../middlewares/rateLimiter");

router.post( "/upload", verifyToken, allowRoles("teacher"), upload.single("file"), contentController.uploadContent );

router.get( "/my", verifyToken, allowRoles("teacher"), contentController.getMyContent );

module.exports = router;