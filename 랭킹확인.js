const Levels = require("discord-xp");
module.exports = {
  name: "랭크",
  description: "자신의 랭크 현황을 보여줍니다",
  options: [
    {
      name: "유저",
      description: "유저의 id를 입력해주세요",
      type: "USER",
    },
  ],
  async execute(interaction) {
    const users = interaction.options.getUser("유저") || interaction.member.user;
    if (!users) return interaction.reply("유저를 멘션해 주세요");
    const user = await Levels.fetch(users.id, interaction.guild.id);
    if (!user) return interaction.reply("**정보가 없습니다**");
    const embed = new (require("discord.js").MessageEmbed)()
      .setTitle(`${users.tag}님의 랭크`)
      .setDescription(`**레벨: ${user.level} | 경험치: ${user.xp.toLocaleString()}**`)
      .setColor("BLUE")
      .setTimestamp()
      .setThumbnail(users.displayAvatarURL());
    interaction.reply({ embeds: [embed] });
  },
};
