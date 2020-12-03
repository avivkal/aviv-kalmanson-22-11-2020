const mongoose = require('mongoose');

const messageScheme = new mongoose.Schema({
    sender: {
        type: String,
    },
    receiver: {
        type: String,
    },
    message: {
        type: String,
    },
    subject: {
        type: String,
    },
    creationDate: {
        type: Date,
    },
});

module.exports = mongoose.model('message', messageScheme);