const Challenge = require("../models/Challenge");
const University = require("../models/University");

const getDashboardStats = async (req, res) => {
  try {
    const totalChallenges = await Challenge.countDocuments();
    const totalUniversities = await University.countDocuments();

    const statusCounts = await Challenge.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const categoryCounts = await Challenge.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const priorityCounts = await Challenge.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    const districtCounts = await Challenge.aggregate([
      { $group: { _id: "$location.district", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      totalChallenges,
      totalUniversities,
      statusCounts,
      categoryCounts,
      priorityCounts,
      districtCounts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };