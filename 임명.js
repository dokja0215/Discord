const { Permissions } = require("discord.js")
const Schema = require("../models/임명")
const config = require("../config.json")

module.exports = {
    name:"임명",
    description:"!유저 임명",
    async execute(message,args){
        const rolealive = await Schema.findOne({serverid:message.guild.id})
        if(!rolealive) return message.reply(`서버에 임명 역할이 등록되지 않았어요. ${config.prefix}임명생성으로 역할을 생성해주세요 !`)
        const role = message.guild.roles.cache.find(r=> r.id == `${rolealive.roleid}`)
        if(!role) return message.reply(`임명 역할이 삭제되거나 오류가 발생했어요. ${config.prefix}임명생성으로 역할을 다시 생성해주세요 !`)
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.reply("권한이 없습니다.")
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.reply("임명 할 유저의 아이디를 입력해주시거나 멘션을 해주세요 !")
        user.roles.add(role).catch((error)=>{
            return message.channel.send("봇의 권한이 인증 할 대상보다 낮습니다.")
        })
        message.channel.send(`**${user.user.tag}님을 부관리자(역할)로 임명했어요!**`)
    }
}