const mongoose = require('mongoose');

module.exports = mongoose.model('University', new mongoose.Schema({}, { strict: false }));
