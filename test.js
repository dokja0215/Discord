const Schema = require("../models/통장")
const comma = require("comma-number")


module.exports = {
    name:"테스트",
    description:"낚시를 합니다",
    async execute(message){
        
        const ehqkrduqn = await Schema.findOne({
            userid: message.author.id
        })
        const fish = Math.floor(Math.random() * 10);

        const embed1 = new (require("discord.js")).MessageEmbed()
        .setDescription("🎣낚시하는 중. . .")
        .setColor("BLUE")

        if(fish < 5){
            const embed2 = new (require("discord.js")).MessageEmbed()
            .setTitle("🐠월척!🐠")
            .setDescription("소형 물고기를 잡았습니다!")
            .addFields({name:"```보상```", value: `**${comma(3000)}원**`})
            .setColor("BLUE")
            message.reply({embeds:[embed1]}).then((message) => setTimeout(() => {message.edit({embeds:[embed2]})}, 10000))
            if(!ehqkrduqn) return message.reply("계좌가 개설되지 않아 보상 지급이 취소됩니다.\n **!용돈**을 통해 계좌를 개설하세요.")

            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money + 3000,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
            
            
        }
        else if (fish < 8){
            const embed3 = new (require("discord.js")).MessageEmbed()
            .setTitle("🐟월척!🐟")
            .setDescription("중형 물고기를 잡았습니다!")
            .addFields({name:"```보상```", value: `**${comma(10000)}원**`})
            .setColor("BLUE")
            message.reply({embeds: [embed1]}).then(message => setTimeout(() => {message.edit({embeds:[embed3]})}, 10000))
            if(!ehqkrduqn) return message.reply("계좌가 개설되지 않아 보상 지급이 취소됩니다.\n **!용돈**을 통해 계좌를 개설하세요.")

            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money + 10000,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
        }
        else {
            const embed4 = new (require("discord.js")).MessageEmbed()
            .setTitle("🐡대월척!🐡")
            .setDescription("황금 개복치를 잡았습니다!")
            .addFields({name:"```보상```", value: `**${comma(100000)}원**`})
            .setColor("BLUE")
            message.reply({embeds: [embed1]}).then(message => setTimeout(() => {message.edit({embeds:[embed4]})}, 10000))
            if(!ehqkrduqn) return message.reply("계좌가 개설되지 않아 보상 지급이 취소됩니다.\n **!용돈**을 통해 계좌를 개설하세요.")

            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money + 100000,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
        }  
    }
}