const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();

const app = express()
app.use(cors());
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

const register = require('./Routes/register');
app.use('/register', register);

const login = require('./Routes/login');
app.use('/login', login);

const messages = require('./Routes/messages');
app.use('/messages', messages);

const findUsers = require('./Routes/findUsers');
app.use('/findUsers', findUsers);

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('Server is running on port ' + PORT)))
    .catch(err => console.log(err))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

}

mongoose.set('useFindAndModify', false)