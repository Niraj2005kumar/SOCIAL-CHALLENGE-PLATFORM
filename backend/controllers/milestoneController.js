const Milestone = require("../models/Milestone");

// Create a milestone (University)
const createMilestone = async (req, res) => {
  try {
    const { projectId, title, description, dueDate } = req.body;

    const milestone = await Milestone.create({
      project: projectId,
      title,
      description,
      dueDate,
    });

    res.status(201).json(milestone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all milestones for a project
const getMilestonesByProject = async (req, res) => {
  try {
    const milestones = await Milestone.find({ project: req.params.projectId });
    res.status(200).json(milestones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update milestone status
const updateMilestone = async (req, res) => {
  try {
    const { status, evidence } = req.body;

    const milestone = await Milestone.findById(req.params.id);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    if (status) milestone.status = status;
    if (evidence) milestone.evidence = evidence;

    const updatedMilestone = await milestone.save();
    res.status(200).json(updatedMilestone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMilestone, getMilestonesByProject, updateMilestone };