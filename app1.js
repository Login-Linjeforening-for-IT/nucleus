const express = require('express')
const app1 = express();
const helmet = require('helmet')

app1.use(helmet())
app1.use(express.json({limit: '200kb'}))

app1.use(express.static('./App.js'))

app1.use('/feedback', require('./routes/mail'))

module.exports = app1;