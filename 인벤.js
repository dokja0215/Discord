const mongo = require("mongoose")

const inventory = new mongo.Schema({
    bobber: { type: Number },
    userid: { type: String },
})

const MessageModel = module.exports = mongo.model("인벤토리", inventory);