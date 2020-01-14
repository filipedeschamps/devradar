const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes.js')

mongoose.connect('mongodb+srv://<user>:<password>@cluster0-efoe3.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(express.json())
app.use(routes)

app.listen(3000)