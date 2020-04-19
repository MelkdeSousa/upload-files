const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')
const mongoose = require('mongoose')

// Database setup

mongoose.connect(
    'mongodb+srv://melkdesousa:m3lkm3lq@test-1-3drpx.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(routes)

app.listen(3333)
