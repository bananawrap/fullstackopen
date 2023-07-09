require('dotenv').config()
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const app = express()
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')



const mongoUrl = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGODB_URL
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)


module.exports = app
