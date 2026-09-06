const express = require("express");
const router = express.Router();
const { addComment, getCommentsByChallenge } = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addComment);
router.get("/challenge/:challengeId", getCommentsByChallenge);

module.exports = router;