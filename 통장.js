const comma = require("comma-number")

module.exports = {
    name: "통장",
    description: "통장 개설",
    async execute(message) {
        const schema1 = require("../models/통장")
        const schema2 = require("../models/도박")
        const schema3 = require("../models/인벤")
        const account = await schema1.findOne({
            userid: message.author.id
        })
        const coin = await schema2.findOne({
            userid: message.author.id
        })
        const bag = await schema3.findOne({
            userid: message.author.id
        })
        if (!account) {
            let newData1 = new schema1({
                money: parseInt(100000),
                userid: message.author.id,
            })
            newData1.save()
            message.channel.send("**통장 개설을 축하합니다! 100,000원이 지급됩니다.**")  
        } else{
            message.reply("본인 명의의 통장이 이미 존재합니다.")
        }
        if (!coin) {
            let newData2 = new schema2({
                money: parseInt(0),
                userid: message.author.id
            })
            newData2.save()
            
        }
        if (!bag) {
            let newData3 = new schema3({
                bobber: parseInt(0),
                userid: message.author.id
            })
            newData3.save()
        }
    }
}