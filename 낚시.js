const Schema = require("../models/통장")
const Schema1 = require("../models/인벤")
const comma = require("comma-number")


module.exports = {
    name:"낚시",
    cooldown: 60,
    description:"낚시를 합니다",
    async execute(message){
        const bobbers = await Schema1.findOne({
            userid: message.author.id
        })
        const ehqkrduqn = await Schema.findOne({
            userid: message.author.id
        })
        const fish = Math.floor(Math.random() * 10);

        const embed1 = new (require("discord.js")).MessageEmbed()
        .setDescription("🎣낚시하는 중. . .")
        .setColor("BLUE")

        if (!ehqkrduqn) return message.reply("통장이 존재하지 않습니다. 통장을 개설해주세요.")
        if (bobbers.bobber == 0) return message.reply("낚시찌가 부족합니다. 상점에서 구매해주세요.")
        if(fish < 5){
            i=1
            const embed2 = new (require("discord.js")).MessageEmbed()
            .setTitle("🐠월척!🐠")
            .setDescription("소형 물고기를 잡았습니다!")
            .addFields({name:"```보상```", value: `**${comma(3000)}원**`})
            .setColor("BLUE")

            message.reply({embeds:[embed1]}).then((message) => setTimeout(() => {message.edit({embeds:[embed2]})}, 10000))

            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money + 3000,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
            await Schema1.findOneAndUpdate({ user: message.author.id}, {
                bobber: bobbers.bobber - 1,
                userid: message.author.id,
            })
            
            
        }
        else if (fish < 8){
            const embed3 = new (require("discord.js")).MessageEmbed()
            .setTitle("🐟월척!🐟")
            .setDescription("중형 물고기를 잡았습니다!")
            .addFields({name:"```보상```", value: `**${comma(10000)}원**`})
            .setColor("BLUE")
            message.reply({embeds: [embed1]}).then(message => setTimeout(() => {message.edit({embeds:[embed3]})}, 10000))

            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money + 10000,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
            await Schema1.findOneAndUpdate({ user: message.author.id}, {
                bobber: bobbers.bobber - 1,
                userid: message.author.id,
            })
        }
        else {
            const embed4 = new (require("discord.js")).MessageEmbed()
            .setTitle("🐡대월척!🐡")
            .setDescription("황금 개복치를 잡았습니다!")
            .addFields({name:"```보상```", value: `**${comma(100000)}원**`})
            .setColor("BLUE")
            message.reply({embeds: [embed1]}).then(message => setTimeout(() => {message.edit({embeds:[embed4]})}, 10000))

            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money + 100000,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
            await Schema1.findOneAndUpdate({ user: message.author.id}, {
                bobber: bobbers.bobber - 1,
                userid: message.author.id,
            })
        }  
    }
}