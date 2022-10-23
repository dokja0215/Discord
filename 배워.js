const mongoose = require("mongoose")

const d = new mongoose.Schema({
    userid: String,
    단어: String,
    뜻: String,
})
module.exports = mongoose.model("배워",d)