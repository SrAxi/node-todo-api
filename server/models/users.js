const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    }
});

module.exports = { User };