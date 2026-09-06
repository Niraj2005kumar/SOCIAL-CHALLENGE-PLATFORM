const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    departments: [{ type: String }],
    expertise: [{ type: String }],
    researchAreas: [{ type: String }],
    facilities: [{ type: String }],
    contactEmail: {
      type: String,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("University", universitySchema);