const express = require("express")
const user = express.Router()
const controller = require("../Controller/userController")
const {middleware} = require("../Middleware/authMiddleware")


user.post("/signup",controller.signUp)
user.post("/login",controller.login)
user.get("/check-auth",middleware,(req,res)=>{return res.status(200).json({message:"Authenticated",user:req.user})})
user.post("/logout ",controller.logout)


module.exports = user