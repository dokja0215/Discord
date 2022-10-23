const { Permissions } = require("discord.js")
const Schema = require("../models/임명")

module.exports = {
    name: "임명생성",
    description: "임명 생성하기",
    async execute(message) {
        if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || !message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
            return message.reply("**오류 ) 임명역할을 설정하기에 권한이 부족합니다 \n필요한 권한 : 채널관리 , 역할관리**")

        const roles = await Schema.findOne({ serverid: message.guild.id })
        if (roles) {
            let role = message.guild.roles.cache.find(x => x.id == `${roles.roleid}`)
            if (role) return message.reply("**이미 임명역할이 존재합니다\n역할을 삭제해주시고 다시 명령어를 입력해주세요**")
        }
        const role = await message.guild.roles.create({ name: "부관리자", reason: `${message.author.tag}님의 의해 임명역할 생성`, color: "GREEN" })
        await message.guild.channels.cache.forEach(channel => {
            channel.permissionOverwrites.edit(role, { MANAGE_CHANNELS: true, MANAGE_NICKNAMES : true })
        })

        if (roles) {
            await Schema.findOneAndUpdate({ serverid: message.guild.id }, {
                roleid: role.id,
                serverid: message.guild.id
            })
        } else {
            const newData = new Schema({
                roleid: role.id,
                serverid: message.guild.id
            })
            newData.save()
        }
        message.channel.send("임명 역할 생성을 완료했습니다")
    }
}