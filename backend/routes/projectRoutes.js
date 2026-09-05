const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  updateProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("university", "admin"), createProject);
router.get("/", getProjects);
router.put("/:id", protect, authorizeRoles("university", "admin"), updateProject);

module.exports = router;