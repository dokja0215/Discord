const comma = require("comma-number")
const Schema1 = require("../models/통장")
const Schema2 = require("../models/도박")

module.exports = {
    name: "가넷",
    description: "가넷 구매",
    async execute(message, args) {
        const sk = await Schema1.findOne({ userid: message.author.id })
        const tkdeoqkd = await Schema2.findOne({ userid: message.author.id })
        if (!sk) return message.reply("**통장 개설을 먼저 진행해주세요. ( !통장 )**") // 데이터베이스에서 userid 가 메세지를 보낸사람의 id인것이 없다면 리턴
        const betting = parseInt(args[0]) //2번쨰 args에서 숫자를 찾음
        if (!betting) return message.reply("**사용법 : !가넷 [수량]**") // 2번쨰 args에서 숫자를 못찾으면 리턴
        if (message.content.includes("-")) return message.reply("**금액엔 -가 포함되면 안돼요**") // 메세지 내용에 -가 포함되면 리턴
        if (betting == 0) return message.reply("**최소 1개의 가넷을 구매해주세요**") // 2번쨰 args가 1000보다 작으면 리턴
        const money = parseInt(sk.money) // money를 메세지를 보낸사람의 돈으로 지정
        const money2 = parseInt(tkdeoqkd.money) // money2를 멘션한 유저의 돈으로 지정
        await Schema1.findOneAndUpdate({ userid: message.author.id }, { // 데이터베이스를 검색하고 업데이트
            money: money - betting * 10000,
            userid: message.author.id,
            date: sk.date
        })
        await Schema2.findOneAndUpdate({ userid: message.author.id }, {
            money: money2 + betting,
            userid: message.author.id,
            date: tkdeoqkd.date
        })
        const embed = new (require("discord.js")).MessageEmbed() //임베드 생성
            .setTitle("결제가 완료되었습니다") // 임베드 제목
            .setColor("GREEN") // 임베드 색깔
            .setTimestamp() // 밑에쪽에 임베드가 생성된 시간 나타내기
            .setDescription(`잔액 : **${comma(money - betting * 10000)}원**\n가넷 : **${comma(money2 + betting)}개**`)//임베드 설명

        message.channel.send({ embeds: [embed] }) //임베드 보내기
    }
}