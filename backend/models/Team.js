const mongoose = require('mongoose');

module.exports = mongoose.model('Team', new mongoose.Schema({}, { strict: false }));
