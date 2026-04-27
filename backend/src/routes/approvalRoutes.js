const express = require("express");
const router = express.Router();

const approvalController = require("../controllers/approvalController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { allowRoles } = require("../middlewares/roleMiddleware");

router.patch( "/approve/:id", verifyToken, allowRoles("principal"), approvalController.approveContent );

router.patch( "/reject/:id", verifyToken, allowRoles("principal"), approvalController.rejectContent );

router.get( "/all", verifyToken, allowRoles("principal"), approvalController.getAllContent );

router.get( "/pending", verifyToken, allowRoles("principal"), approvalController.getPendingContent );

module.exports = router;