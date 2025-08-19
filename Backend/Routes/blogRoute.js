const express = require("express")
const blog = express.Router()
const controller = require("../Controller/blogController")

blog.use("/addblog",controller.addBlog)

module.exports = blog