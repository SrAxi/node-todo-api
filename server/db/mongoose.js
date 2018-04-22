const mongoose = require('mongoose');

// Use JS built in Promise
mongoose.Promise = global.Promise;

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };