const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

router.get("/register", (req, res) => {
	res.status(405).json({ message: "Use POST /api/auth/register to create an account." });
});
router.post("/register", registerUser);

router.get("/login", (req, res) => {
	res.status(405).json({ message: "Use POST /api/auth/login to sign in." });
});
router.post("/login", loginUser);

module.exports = router;
