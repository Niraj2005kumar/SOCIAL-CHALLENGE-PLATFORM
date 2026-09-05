const express = require("express");
const router = express.Router();
const {
  addUniversity,
  getUniversities,
  getUniversityById,
} = require("../controllers/universityController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("admin"), addUniversity);
router.get("/", getUniversities);
router.get("/:id", getUniversityById);

module.exports = router;