const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    members: [
      {
        name: { type: String, required: true },
        role: { type: String },
        subject: { type: String },
      },
    ],
    facultyMentor: {
      name: { type: String },
      email: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);