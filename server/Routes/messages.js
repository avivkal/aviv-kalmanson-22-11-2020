const express = require('express');
const router = express.Router();
const Message = require('../Models/message')


router.get('/sent/:email', async (req, res) => {
    Message.find({ "sender": req.params.email }).sort({ "creationDate": -1 }).then(sentEmails => res.send(sentEmails))
        .catch(error => res.status(500).send(error.message))

})

router.get('/inbox/:email', async (req, res) => {
    Message.find({ "receiver": req.params.email }).sort({ "creationDate": -1 }).then(inboxEmails => res.send(inboxEmails))
        .catch(error => res.status(500).send(error.message))
})

router.delete('/:id', async (req, res) => {
    Message.findOneAndDelete({ _id: req.params.id }).then(data => res.send(data))
        .catch(error => res.status(500).send(error.message))
})

router.post('/:email', async (req, res) => {
    Message.create({
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message,
        subject: req.body.subject,
        creationDate: req.body.creationDate,
    }).then(response => res.send(response))
        .catch(error => res.status(500).send(error.message))
})

module.exports = router