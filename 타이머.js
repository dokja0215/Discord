module.exports = {
    name:"타이머",
    description:"타이머 작동",
    async execute(message, args){
        if (!args[0]) return message.channel.send("시간을 설정해주세요(단위:분)")
        const timer = parseInt(args[0])
        if(timer == 0) return message.channel.send("1분 이상의 시간을 설정해주세요.")
        if (!timer) return message.channel.send("시간을 입력해주세요(단위:분)")
        await message.channel.send(`${timer}분 타이머 작동!`)
        
        setTimeout(function(){
            const embed = new (require("discord.js")).MessageEmbed()
                .setTitle(`타이머 종료!`)
                .setColor("PURPLE")
                .setDescription(`시간: **${timer}분**`)
                .setFooter({text:`BY ${message.author.tag}`, iconURL:`${message.author.avatarURL()}`})
            message.reply({embeds:[embed]})
        }, 60*1000*timer)


        
    }
}