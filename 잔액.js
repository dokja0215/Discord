const client = require("../index")
const comma = require('comma-number')
const Schema = require("../models/통장")

module.exports = {
    name: "잔액",
    description: "잔액 확인",
    async execute(message, args) {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
        const wjdqh = await Schema.findOne({ userid: user.id })
        if (!wjdqh) return message.reply("**오류) 등록된 정보가 없습니다**")
        const t = new Date()
        const date = "" + t.getFullYear() + t.getMonth() + t.getDate();
        let i
        if (wjdqh.date == date) i = "지급"
        else i = "미지급"
        const embed = new (require("discord.js")).MessageEmbed()
            .setTitle(`${user.tag || user.user.tag}님의 통장 정보`)
            .addField("잔액 :", `**${comma(wjdqh.money)}원 !**`)
            .addField("금일 용돈:", `**${i}**`)
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp()
            .setColor("YELLOW")
        message.channel.send({ embeds: [embed] })
    }
}