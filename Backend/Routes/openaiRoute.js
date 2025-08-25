const express = require("express")
const ai = express.Router()
const controller = require("../Controller/openaiController")


ai.post("/chat",controller.getImage)


module.exports = ai