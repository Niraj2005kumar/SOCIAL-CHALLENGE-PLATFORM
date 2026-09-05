const express = require("express");
const router = express.Router();
const {
  submitChallenge,
  getChallenges,
  getChallengeById,
  updateChallengeStatus,
  assignUniversity,
} = require("../controllers/challengeController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, submitChallenge);
router.get("/", getChallenges);
router.get("/:id", getChallengeById);
router.put("/:id/status", protect, authorizeRoles("admin"), updateChallengeStatus);
router.put("/:id/assign", protect, authorizeRoles("admin"), assignUniversity);

module.exports = router;