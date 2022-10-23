const {Permissions , MessageEmbed} = require('discord.js')

module.exports = {
    name:"채널열기",
    description:"채팅 허용",
    execute(message){
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("권한이 없습니다")
        message.channel.permissionOverwrites.edit(message.guild.roles.cache.find((e) => e.name.toLowerCase().trim() === "@everyone"),{
            SEND_MESSAGES : true,
            ADD_REACTIONS : true
        })
        const date = new Date()
        const time = Math.round(date.getTime() / 1000)

        const embed = new MessageEmbed()
        .setTitle("채널이 열림")
        .setDescription("일반 유저의 채팅 권한을 추가했습니다")
        .addFields(
            {name : "관리자" , value: `${message.author}` , inline:true},
            {name : "열린 시간", value:`<t:${time}>`,inline:true},
            {name : "채널을 다시 닫기",value : `!채널닫기`,inline:true}
        )
        .setColor("BLUE")
        .setTimestamp()
        message.channel.send({embeds : [embed]})
    }
}