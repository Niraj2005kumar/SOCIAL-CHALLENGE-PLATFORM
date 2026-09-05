const Project = require("../models/Project");

// Create a project (University)
const createProject = async (req, res) => {
  try {
    const { challengeId, universityId, facultyMentor, teamMembers } = req.body;

    const project = await Project.create({
      challenge: challengeId,
      university: universityId,
      facultyMentor,
      teamMembers,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("challenge", "title status")
      .populate("university", "name district");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update project status/proposal
const updateProject = async (req, res) => {
  try {
    const { status, proposal, industryPartner } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (status) project.status = status;
    if (proposal) project.proposal = proposal;
    if (industryPartner) project.industryPartner = industryPartner;

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject, getProjects, updateProject };