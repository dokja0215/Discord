const client = require("../index") // 인덱스에서 client값을 가져옴 | 인덱스에 module.exports = client 가 없다면 불가능
const Levels = require("discord-xp")

module.exports = {
    name: "리더보드",
    description: "서버 채팅 랭킹을 보여줍니다", // 슬래쉬 커맨드는 꼭 설명이 필요함 (필수)
    async execute(interaction) { // 인덱스에서 interaction을 받아옴 async는 코드에 await이 필요할떄 넣어줘야함
        const fetchreaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 10) // 슬커를 사용한 서버에서 리더보드 인원 제한을 10명으로 걸고 가져옴 (늘리거나 줄일수 있음)
        if (fetchreaderboard < 1) return interaction.reply("저장된 데이터가 없습니다") // 서버에 유저 데이터가 1개보다 작다면 리턴 
        const leaderboard = await Levels.computeLeaderboard(client, fetchreaderboard)
        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\n레벨 : ${e.level.toLocaleString()}\n경험치 : ${e.xp.toLocaleString()}`)
        const embed = new (require("discord.js")).MessageEmbed()
            .setTitle(`『${interaction.guild.name}』채팅 순위\n\n`) // \n은 줄바꿈을 의마함
            .setColor("2EFEF7") // https://html-color-codes.info/Korean/ 에서 컬러 코드를 받아올 수 있음
            .setTimestamp()
            .setDescription(`**${lb.join("\n\n")}**`) // join()은 예를 들면 [1,2,3] 이런 리스트가 있으면 .join("|") 이렇게 할 시 "1|2|3" 이런식으로 정렬됨
            .setThumbnail(interaction.guild.iconURL()) // 임베드 우측 상단에 나오는 사진을 슬래쉬 커맨드를 사용한 서버 프사로 설정함
        await interaction.reply({ embeds: [embed] })
    }
}
