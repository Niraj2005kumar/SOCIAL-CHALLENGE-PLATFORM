const express = require("express");
const router = express.Router();
const {
  createTeam,
  getTeamByProject,
  updateTeam,
} = require("../controllers/teamController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("university", "admin"), createTeam);
router.get("/project/:projectId", getTeamByProject);
router.put("/:id", protect, authorizeRoles("university", "admin"), updateTeam);

module.exports = router;