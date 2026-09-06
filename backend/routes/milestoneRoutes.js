const express = require("express");
const router = express.Router();
const {
  createMilestone,
  getMilestonesByProject,
  updateMilestone,
} = require("../controllers/milestoneController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("university", "admin"), createMilestone);
router.get("/project/:projectId", getMilestonesByProject);
router.put("/:id", protect, authorizeRoles("university", "admin"), updateMilestone);

module.exports = router;