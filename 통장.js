const mongo = require("mongoose")

const account = new mongo.Schema({
    money: { type: Number },
    userid: { type: String },
    date: { type: String }
})

const MessageModel = module.exports = mongo.model("통장", account);