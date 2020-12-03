const express = require('express');
const router = express.Router();
const User = require('../Models/user')
const functions = require('../Functions/functions');

router.post('/', async (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (!functions.userExists(user)) {
            User.create({
                email: req.body.email,
                password: req.body.password
            }).then(user => {
                res.send(user)
            }).catch(error => res.status(500).send(error.message))
        }
        else {
            res.status(500).send('user exists already')
        }
    }).catch(error => res.status(500).send(error))


})

module.exports = router