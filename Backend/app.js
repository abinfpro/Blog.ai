const express = require("express") 
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()
const DB = require("../Backend/Connection/dbConnection")
const admin = require("../Backend/Routes/adminRoute")
const user = require("../Backend/Routes/userRoute") 
const blog = require("../Backend/Routes/blogRoute")
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/auth",user)
app.use("/admin",admin)
app.use("/blog",blog)

app.listen(process.env.PORT,()=>{
    console.log(`Server started ${process.env.PORT}`);
    
    DB()
})

