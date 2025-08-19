const User = require("../Model/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const signUp = async(req,res)=>{
    try {        
        const {name,email,password} = req.body
       if(!name || !email || !password){
        return res.status(400).json({message:"All feilds are required"})
       }
       const  nameRegex = /^[a-zA-Z\s]{2,50}$/
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
       const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/
       if(!nameRegex.test(name)){
        return res.status(400).json({message:"Invail Name format"})
       }
       if(!emailRegex.test(email)){
        return res.status(400).json({message:"Invail Email format"})
       }
       if(!passwordRegex.test(password)){
        return res.status(400).json({message:"Invail Password format"})
       }
       const existing = await User.findOne({email})
       if(existing){
        return res.status(400).json({message:"Email already existing"})
       } 
        const hashed = await bcrypt.hash(password,10)
       const response = await User.create({name,email,password:hashed})
       return res.status(201).json({data:response,message:"OK"})    
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"Server Error"})
    }
}


const login = async (req,res)=>{
    try {
       const {email,password} = req.body
       if(!email || !password){
        return res.status(400).json({message:"All feild are required"})
       }
       const existing = await User.findOne({email})
       if(!existing){
         return res.status(400).json({message:"Email not verified"})
       }
       const compare = await bcrypt.compare(password,existing.password)
       if(!compare){
        return res.status(400).json({message:"Password is not correct"})
       }
       const token = jwt.sign({email:existing, username:existing.username, id:existing._id},
       process.env.JWT_SUPER_KEY,
       {expiresIn:"1h"}
       )
       
       const cookieOptions = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    };
   return res.cookie("token", token, cookieOptions).status(200).json({ message: "Login Successfully", data: existing });        
    } catch (error) {
       return res.status(400).json({message:"Server Error"})
    }
}
 

module.exports={signUp, login} 