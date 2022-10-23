const comma = require("comma-number")
const Schema1 = require("../models/통장")
const Schema2 = require("../models/인벤")

module.exports = {
    name: "상점",
    description: "상점 명령어",
    async execute(message, args) {

        const money = await Schema1.findOne({
            userid: message.author.id
        })
        const bag = await Schema2.findOne({
            userid: message.author.id
        })
        if(!money) return message.reply("통장이 아직 개설되지 않았습니다.")
        if (args[0] == "구매"){
            if (args[1]== "낚시찌"){
                if (!args[2]) return message.reply("구매할 수량을 입력해주세요.")
                const number = parseInt(args[2])
                if (!number) return message.reply("정수를 입력해주세요.")
                if (number <=0) return message.reply("최소 1개를 구매해야 합니다.")
                if (money.money < 100 * args[2]) return message.reply("잔액이 부족합니다.")
                await Schema1.findOneAndUpdate({userid: message.author.id}, {
                    money: money.money - 100*args[2],
                    userid: message.author.id
                })
                await Schema2.findOneAndUpdate({userid: message.author.id}, {
                    bobber: bag.bobber + args[2],
                    userid: message.author.id
                })
                message.channel.send("구매가 왼료되었습니다.")

            } 
            else if (!args[1]){
                message.reply("구매할 상품을 입력해주세요.")
            }
            else {
                message.reply("해당 상품이 존재하지 않습니다.")
            }

        }
        else if (args[0] == "목록"){
            const embed = new (require("discord.js")).MessageEmbed()
                .setTitle("상점리스트")
                .setColor("RED")
                .addFields({name:"```낚시찌```",value:"**100원**", inline:true}, {name:"```OBJECT```", value:"**PRICE**", inline:true})
            message.channel.send({embeds:[embed]})

        }
        else {
            return message.channel.send("**!상점 [구매]/[목록]**")
        }
    }
}