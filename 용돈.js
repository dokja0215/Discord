const comma = require("comma-number")

module.exports = {
    name: "용돈",
    description: "용돈 지급",
    async execute(message) {
        const t = new Date()
        const date = "" + t.getFullYear() + t.getMonth() + t.getDate();
        const schema = require("../models/통장")
        const ehqkrduqn = await schema.findOne({
            userid: message.author.id
        })
        if (!ehqkrduqn) {
            message.channel.send("통장이 없습니다. 통장을 개설해주세요.") 
        } else {
            if (ehqkrduqn.date == date) return message.channel.send("금일 용돈 지급 완료")
            const money = parseInt(ehqkrduqn.money)
            await schema.findOneAndUpdate({ userid: message.author.id }, {
                money: money + 5000,
                userid: message.author.id,
                date: date
            })
            const f = money + 5000
            message.channel.send(`5000원 지급 \n현재잔액 : ${comma(f)}`)
        }
    }
}