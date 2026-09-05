const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Uncategorized",
    },
    subCategory: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    location: {
      district: { type: String, required: true },
      block: { type: String },
      village: { type: String },
      lat: { type: Number },
      lng: { type: Number },
    },
    evidence: {
      images: [{ type: String }],
      videos: [{ type: String }],
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedUniversity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      default: null,
    },
    status: {
      type: String,
      enum: [
        "Submitted",
        "Under Review",
        "Matched",
        "Project Active",
        "Pilot",
        "Resolved",
      ],
      default: "Submitted",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", challengeSchema);