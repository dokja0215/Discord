module.exports = {
    name: "로그생성",
    description: "로그 채널 생성",
    async execute(message) {
        if (message.channel.type !== "GUILD_TEXT") return
        const channel = await message.guild.channels.create(`『😀』입장로그`)

        channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: true
        })

        const embed = new (require("discord.js")).MessageEmbed()
            .setTitle("로그 채널이 생성되었습니다")
            .setColor("RED")
        message.channel.send({embeds:[embed]})
    }
}