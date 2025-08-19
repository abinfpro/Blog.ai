const mongoose = require("mongoose")
require("dotenv").config()

const db = async()=>{
    try {
        await mongoose.connect(process.env.DBURL)
        console.log("DB connected sucessfully");
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = db    