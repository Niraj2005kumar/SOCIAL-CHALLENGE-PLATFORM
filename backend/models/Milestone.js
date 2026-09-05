const mongoose = require('mongoose');

module.exports = mongoose.model('Milestone', new mongoose.Schema({}, { strict: false }));
