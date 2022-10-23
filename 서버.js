module.exports = {
    name:"서버",
    description:"서버 정보",
    execute(message){

        const embed = new (require("discord.js")).MessageEmbed()
        .setTitle(`${message.guild.name}`)
        .setDescription(`인원: ${message.guild.memberCount}명`)
        .setColor("GREEN")
        message.channel.send({embeds : [embed]})
    }
}