const mongoose = require('mongoose');

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userScheme = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please fill a valid email address'],
        validate: [validateEmail, 'Please fill a valid email address']
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true
    },
});

module.exports = mongoose.model('user', userScheme);