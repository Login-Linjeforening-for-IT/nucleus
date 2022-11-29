const express = require('express')
const app1 = express();
const helmet = require('helmet')
const port = 300

app1.use(helmet())
app1.use(express.json({limit: '200kb'}))

app1.use(express.static('./App.js'))

app1.use('/feedback', require('./routes/mail'))

app1.get('/', (req,res)=>{
    res.send("Hello bro")
})

app1.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

module.exports = app1;