const Comment = require("../models/Comment");

// Add a comment
const addComment = async (req, res) => {
  try {
    const { challengeId, projectId, message } = req.body;

    const comment = await Comment.create({
      challenge: challengeId || null,
      project: projectId || null,
      author: req.user._id,
      message,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments for a challenge
const getCommentsByChallenge = async (req, res) => {
  try {
    const comments = await Comment.find({ challenge: req.params.challengeId })
      .populate("author", "name role");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addComment, getCommentsByChallenge };