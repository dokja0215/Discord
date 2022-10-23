const mongoose = require("mongoose")

const ce = new mongoose.Schema({
    roleid: { type: String },
    serverid: { type: String }
})

const ff = module.exports = mongoose.model("임명역할", ce);