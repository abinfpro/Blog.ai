const express = require("express")
const blog = express.Router()
const multer = require("multer")
const controller = require("../Controller/blogController")


const upload = multer({storage:multer.memoryStorage()})

blog.post("/addblog",upload.single("image"),controller.addBlog)
blog.get("/getblog",controller.getBlog)

module.exports = blog