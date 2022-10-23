const Schema = require("../models/배워")

module.exports = {
    name: "배워",
    description: "봇이 낱말을 학습합니다",
    options: [{
        name: "낱말",
        description: "봇이 학습할 낱말을 입력해 주세요",
        type: "STRING",
        required: true,
    }, {
        name: "뜻",
        description: "봇이 학습할 낱말의 뜻을 입력해 주세요",
        type: "STRING",
        required: true
    }],
    async execute(interaction) {
        const text1 = interaction.options.getString("낱말")
        const text2 = interaction.options.getString("뜻")
        const find = await Schema.findOne({ 단어: text1.trim() })
        if (find) return interaction.reply({ content: "이미 저장되어 있는 단어입니다", ephemeral: true })
        const newData = new Schema({
            userid: interaction.member.id,
            단어: text1.trim(),
            뜻: text2.trim()
        })
        newData.save()
        const embed = new (require("discord.js")).MessageEmbed()
            .setTitle("봇이 단어를 학습했어요 !")
            .setColor("RANDOM")
            .setTimestamp()
            .addField(`단어 : ${text1.trim()}`, `뜻 : ${text2.trim()}`)
            .addField(`이렇게 입력해 보세요 !`, `(봇접두사)${text1}`)
            .setThumbnail(interaction.member.displayAvatarURL())
        interaction.reply({ embeds: [embed] })
    }
}