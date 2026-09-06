const express = require("express");
const router = express.Router();
const {
  createImpactReport,
  getImpactReports,
  getImpactReportById,
} = require("../controllers/impactReportController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("university", "admin"), createImpactReport);
router.get("/", getImpactReports);
router.get("/:id", getImpactReportById);

module.exports = router;