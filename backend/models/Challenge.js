const mongoose = require('mongoose');

module.exports = mongoose.model('Challenge', new mongoose.Schema({}, { strict: false }));
