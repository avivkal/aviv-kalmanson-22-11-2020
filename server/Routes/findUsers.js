const express = require('express');
const router = express.Router();
const User = require('../Models/user')

router.get('/:email', async (req, res) => {
    User.findOne({ "email": req.params.email }).then(user => res.send(user))
        .catch(error => res.status(500).send(error.message))
})


module.exports = router