const University = require("../models/University");

// Add a new university (Admin only)
const addUniversity = async (req, res) => {
  try {
    const university = await University.create(req.body);
    res.status(201).json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all universities
const getUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.status(200).json(universities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single university
const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addUniversity, getUniversities, getUniversityById };