const mongoose = require('mongoose');

// Use JS built in Promise
mongoose.Promise = global.Promise;

// Connect to DB
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };