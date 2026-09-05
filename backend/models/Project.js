const mongoose = require('mongoose');

module.exports = mongoose.model('Project', new mongoose.Schema({}, { strict: false }));
