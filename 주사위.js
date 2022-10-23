module.exports = {
    name:"주사위",
    description:"주사위 게임",
    execute(message){

        const list = ["1","2","3","4","5","6"];
        const random1 = Math.floor(Math.random() * 6);
        const random2 = Math.floor(Math.random() * 6);
        const human = list[random1];
        const bot = list[random2];

        const embed = new (require("discord.js")).MessageEmbed()
        .setTitle("🎲주사위게임🎲")
        .setDescription("승부 결과")
        .setColor("WHITE")
        .addFields({name:"```내 주사위```", value:`${human}`, inline:true}, {name:"```봇 주사위```", value:`${bot}`, inline:true})
        message.channel.send({embeds : [embed]})

        if (human > bot){
            message.channel.send(`${message.author}님이 승리했습니다.`)
        }
        else if (human == bot){
            message.channel.send(`비겼습니다.`)
        }
        else{
            message.channel.send(`봇이 승리했습니다.`)
        }
    }
}