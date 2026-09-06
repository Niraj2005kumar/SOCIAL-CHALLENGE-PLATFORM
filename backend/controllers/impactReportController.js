const axios = require("axios");
const ImpactReport = require("../models/ImpactReport");
const Challenge = require("../models/Challenge");

const AI_SERVICE_URL = "http://localhost:8000";

// Create impact report (calls AI service to generate report text)
const createImpactReport = async (req, res) => {
  try {
    const { projectId, challengeId, peopleAffected, solution, outcome, deploymentStatus } = req.body;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    let reportText = "";
    try {
      const aiResponse = await axios.post(`${AI_SERVICE_URL}/impact-report`, {
        title: challenge.title,
        district: challenge.location?.district,
        peopleAffected: peopleAffected?.toString(),
        solution,
        outcome,
      });
      reportText = aiResponse.data.impactReport;
    } catch (aiError) {
      console.error("AI Service error:", aiError.message);
      reportText = `Impact report for ${challenge.title}: ${outcome || "Outcome not specified"}`;
    }

    const report = await ImpactReport.create({
      project: projectId,
      challenge: challengeId,
      peopleAffected,
      solution,
      outcome,
      reportText,
      deploymentStatus,
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all impact reports
const getImpactReports = async (req, res) => {
  try {
    const reports = await ImpactReport.find()
      .populate("challenge", "title location")
      .populate("project", "status");
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single impact report
const getImpactReportById = async (req, res) => {
  try {
    const report = await ImpactReport.findById(req.params.id)
      .populate("challenge", "title location")
      .populate("project", "status");
    if (!report) {
      return res.status(404).json({ message: "Impact report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createImpactReport, getImpactReports, getImpactReportById };