const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);