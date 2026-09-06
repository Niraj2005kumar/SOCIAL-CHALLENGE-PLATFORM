const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Delayed"],
      default: "Pending",
    },
    evidence: {
      type: String, // file path ya URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Milestone", milestoneSchema);