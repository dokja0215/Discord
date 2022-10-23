module.exports = {
    name:"프로필",
    description:"유저 정보를 불러옵니다",
    execute(message){
        if (!message.mentions.members.first()){
            const createdAt = message.author.createdAt
            const embed = new (require("discord.js")).MessageEmbed()
            .setTitle(`${message.author.tag}님의 정보`)
            .setThumbnail(message.author.avatarURL())
            .addFields(
                {name:"ID", value:`${message.author.id}`},
                {name:"가입일", value:`${createdAt.getFullYear()}년 ${createdAt.getMonth()}월 ${createdAt.getDate()}일`},)
            message.channel.send({embeds : [embed]})

        }else {
            const user =message.mentions.members.first()
            const createdAt = user.user.createdAt
            const embed = new (require("discord.js")).MessageEmbed()
            .setTitle(`${user.user.tag}님의 정보`)
            .setThumbnail(user.user.avatarURL())
            .addFields(
                {name:"ID", value:`${user.user.id}`},
                {name:"가입일", value:`${createdAt.getFullYear()}년 ${createdAt.getMonth()}월 ${createdAt.getDate()}일`},)
            message.channel.send({embeds : [embed]})

        }
    }
}