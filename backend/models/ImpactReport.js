const mongoose = require('mongoose');

module.exports = mongoose.model('ImpactReport', new mongoose.Schema({}, { strict: false }));
