const mongoose = require("mongoose");

const impactReportSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },
    peopleAffected: {
      type: Number,
    },
    solution: {
      type: String,
    },
    outcome: {
      type: String,
    },
    reportText: {
      type: String, // AI-generated ya manual report
    },
    deploymentStatus: {
      type: String,
      enum: ["Not Started", "Piloted", "Deployed", "Scaled"],
      default: "Not Started",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ImpactReport", impactReportSchema);