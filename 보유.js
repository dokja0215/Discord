const Schema = require("../models/도박")
const comma = require("comma-number")

module.exports = {
    name: "보유가넷",
    description: "보유 가넷 조회",
    async execute(message, args) {
        const user = message.author
        const ehqkrduqn = await Schema.findOne({
            userid: message.author.id
        })
        const embed = new (require("discord.js")).MessageEmbed()
            .setTitle(`${user.tag}님의 가넷`)
            .setDescription(`${comma(ehqkrduqn.money)}개`)
            .setColor("DARK_RED")
        message.channel.send({embeds:[embed]})
    }
}