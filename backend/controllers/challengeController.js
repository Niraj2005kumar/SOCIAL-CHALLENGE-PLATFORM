const Challenge = require("../models/Challenge");
const University = require("../models/University");

// Submit a new challenge
const submitChallenge = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    const challenge = await Challenge.create({
      title,
      description,
      location,
      submittedBy: req.user._id,
    });

    res.status(201).json(challenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all challenges
const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find()
      .populate("submittedBy", "name email")
      .populate("assignedUniversity", "name district");
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single challenge by ID
const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate("submittedBy", "name email")
      .populate("assignedUniversity", "name district");
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    res.status(200).json(challenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update challenge status (Admin only)
const updateChallengeStatus = async (req, res) => {
  try {
    const { status, category, priority } = req.body;

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    if (status) challenge.status = status;
    if (category) challenge.category = category;
    if (priority) challenge.priority = priority;

    const updatedChallenge = await challenge.save();

    res.status(200).json(updatedChallenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign a university to a challenge (Admin only)
const assignUniversity = async (req, res) => {
  try {
    const { universityId } = req.body;

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    const university = await University.findById(universityId);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    challenge.assignedUniversity = universityId;
    challenge.status = "Matched";

    const updatedChallenge = await challenge.save();

    res.status(200).json(updatedChallenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitChallenge,
  getChallenges,
  getChallengeById,
  updateChallengeStatus,
  assignUniversity,
};