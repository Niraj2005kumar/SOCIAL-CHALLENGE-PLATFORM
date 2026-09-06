const IndustryPartner = require("../models/IndustryPartner");

// Add a new industry partner (Admin only)
const addIndustryPartner = async (req, res) => {
  try {
    const partner = await IndustryPartner.create(req.body);
    res.status(201).json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all industry partners
const getIndustryPartners = async (req, res) => {
  try {
    const partners = await IndustryPartner.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




const getIndustryPartnerById = async (req, res) => {
  try {
    const partner = await IndustryPartner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: "Industry partner not found" });
    }
    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addIndustryPartner, getIndustryPartners, getIndustryPartnerById };