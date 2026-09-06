const axios = require("axios");
const Challenge = require("../models/Challenge");
const University = require("../models/University");

const AI_SERVICE_URL = "http://localhost:8000";



const submitChallenge = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    // Pehle challenge create karo (basic info ke saath)
    const challenge = await Challenge.create({
      title,
      description,
      location,
      submittedBy: req.user._id,
    });



    try {
      const aiResponse = await axios.post(`${AI_SERVICE_URL}/analyze`, {
        id: challenge._id.toString(),
        title,
        description,
        district: location?.district,
      });

      const aiData = aiResponse.data;

      // AI se mile data se challenge ko update karo
      challenge.category = aiData.category;
      challenge.priority = aiData.priority;

      await challenge.save();

      // Response mein AI ka poora analysis bhi bhejo
      return res.status(201).json({
        challenge,
        aiAnalysis: aiData,
      });
    } catch (aiError) {
      console.error("AI Service error:", aiError.message);
      

      return res.status(201).json({
        challenge,
        aiAnalysis: null,
        warning: "AI analysis unavailable, challenge saved without it",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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