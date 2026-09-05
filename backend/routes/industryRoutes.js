const express = require("express");
const router = express.Router();
const {
  addIndustryPartner,
  getIndustryPartners,
  getIndustryPartnerById,
} = require("../controllers/industryController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("admin"), addIndustryPartner);
router.get("/", getIndustryPartners);
router.get("/:id", getIndustryPartnerById);

module.exports = router;