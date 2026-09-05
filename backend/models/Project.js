const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
    facultyMentor: {
      type: String,
    },
    teamMembers: [
      {
        name: { type: String },
        role: { type: String },
      },
    ],
    proposal: {
      type: String,
    },
    industryPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IndustryPartner",
      default: null,
    },
    status: {
      type: String,
      enum: [
        "Team Formed",
        "Proposal Submitted",
        "Prototype",
        "Pilot Test",
        "Deployed",
      ],
      default: "Team Formed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);