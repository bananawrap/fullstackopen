const config = require("./utils/config")
const express = require("express")
const cors = require("cors")
const app = express()
const blogsRouter = require("./controllers/blogs")
const mongoose = require("mongoose")


const mongoUrl = config.MONGODB_URL
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)


module.exports = app