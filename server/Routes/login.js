const express = require('express');
const router = express.Router();
const User = require('../Models/user')
const functions = require('../Functions/functions');


router.post('/', async (req, res) => {
  User.findOne({ "email": req.body.email, "password": req.body.password }).then(user => {
    if (functions.userExists(user)) {
      res.json(user)
    }
    else {
      res.status(500).send('Wrong password/email, please try again')
    }
  })
    .catch(error => res.status(500).send(error.message))
})


module.exports = router