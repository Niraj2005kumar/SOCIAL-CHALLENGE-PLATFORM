const mongoose = require("mongoose");

const industryPartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
    },
    expertise: [{ type: String }],
    supportTypes: [
      {
        type: String,
        enum: ["Mentorship", "Funding", "Technology", "Prototyping", "Pilot Deployment"],
      },
    ],
    contactEmail: {
      type: String,
    },
    contactPerson: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("IndustryPartner", industryPartnerSchema);