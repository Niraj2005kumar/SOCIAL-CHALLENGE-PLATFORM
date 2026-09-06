const Team = require("../models/Team");
const Project = require("../models/Project");

// Create a team for a project (University)
const createTeam = async (req, res) => {
  try {
    const { projectId, members, facultyMentor } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const team = await Team.create({
      project: projectId,
      members,
      facultyMentor,
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get team by project ID
const getTeamByProject = async (req, res) => {
  try {
    const team = await Team.findOne({ project: req.params.projectId });
    if (!team) {
      return res.status(404).json({ message: "Team not found for this project" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update team (add/remove members)
const updateTeam = async (req, res) => {
  try {
    const { members, facultyMentor } = req.body;

    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (members) team.members = members;
    if (facultyMentor) team.facultyMentor = facultyMentor;

    const updatedTeam = await team.save();
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTeam, getTeamByProject, updateTeam };