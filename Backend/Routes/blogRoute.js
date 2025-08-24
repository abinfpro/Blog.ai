const express = require("express")
const blog = express.Router()
const multer = require("multer")
const controller = require("../Controller/blogController")
const {middleware} = require("../Middleware/authMiddleware")


const upload = multer({storage:multer.memoryStorage()})

blog.post("/addblog",middleware,upload.single("image"),controller.addBlog)
blog.get("/getblog",middleware,controller.getBlog)
blog.get("/userprofile",middleware,controller.userProfil)
blog.delete("/deleteblog/:id",middleware,controller.deleteBlog)
blog.patch("/blogupdate/:id",middleware,upload.single("image"),controller.updateBlog)

module.exports = blog