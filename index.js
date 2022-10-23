const { prefix, token, mongo_url } = require("./config.json");
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
module.exports = client;
const fs = require("fs");
const { DiscordTogether } = require("discord-together");
const mongoose = require("mongoose");
const Levels = require("discord-xp");
Levels.setURL(mongo_url);

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(console.log("데이터베이스 연결 완료"));

client.discordTogether = new DiscordTogether(client);

client.once("ready", async () => {
  let number = 0;
  setInterval(() => {
    const list = ["점검", "테스트"];
    if (number == list.length) number = 0;
    client.user.setActivity(list[number], {
      type: "PLAYING",
    });
    number++;
  }, 3000);
  client.guilds.cache.forEach((gd) => {
    gd.commands.set(commands);
  });
  console.log("봇이 준비되었습니다");
});

process.on("unhandledRejection", (err) => {
  if (err == "DiscordAPIError: Missing Access")
    return console.log(
      "봇에게 슬래시 커맨드를 서버에 푸쉬 할 권한이 없어서 서버에 슬래시 커맨드를 푸쉬하지 못했습니다."
    );
  console.error(err);
});

client.on("messageCreate", (message) => {
  if (message.content === "핑") {
    message.reply("퐁!");
  }
});

//슬래시 명령어
client.slashcommands = new Collection();
let commands = [];
const commandsFile1 = fs
  .readdirSync("./slashcommands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandsFile1) {
  const command = require(`./slashcommands/${file}`);
  client.slashcommands.set(command.name, command);
  commands.push({
    name: command.name,
    description: command.description,
    options: command.options,
  });
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.slashcommands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: "오류가 발생했습니다",
      ephemeral: true,
    });
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix)) {
    const Schema = require("./models/배워");
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const argsjoin = args.join(" ");
    const ff = await Schema.findOne({ 단어: argsjoin });
    if (ff) {
      let user = client.users.cache.get(ff.userid);
      if (!user) user = "Unknown#0000";
      message.channel.send(
        `\`\`\`${ff.뜻}\`\`\`\n**${user.tag || user}님이 알려주셨어요!**`
      );
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.channel.type == "DM") return;
  const Schema = require("./models/금지어");
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  if (args[1] == "추가" || args[1] == "삭제") return;
  await Schema.find({ serverid: message.guild.id }).exec((err, res) => {
    for (let i = 0; i < res.length; i++) {
      if (message.content.includes(res[i].금지어)) {
        if (res[i].온오프 == "on") {
          message.delete();
          const embed = new (require("discord.js").MessageEmbed)()
            .setTitle("삐빅! 금지어 감지")
            .setDescription(`${message.content}에서 금지어 감지되었습니다.`)
            .addField("감지된 금지어", `${res[i].금지어}`)
            .setColor("RED")
            .setTimestamp();
          message.channel.send({ embeds: [embed] }).then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 5000);
          });
        }
      }
    }
  });
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type !== "GUILD_TEXT") return;
  const randomXp = Math.floor(Math.random() * 9) + 1;
  await Levels.appendXp(message.author.id, message.guild.id, randomXp);
});

//메시지 명령어
client.commands = new Collection();

const cooldowns = new Collection();

const commandsFile = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandsFile) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift();
  const command = client.commands.get(commandName);
  if (!command) return;
  if(!cooldowns.has(command.name)){
    cooldowns.set(command.name, new Collection())
  }
  const now = Date.now()
  const timestamps = cooldowns.get(command.name)
  const cooldownAmount = (command.cooldown || 3) * 1000
  if(timestamps.has(message.author.id)){
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount
    if(now < expirationTime){
      const timeLeft = (expirationTime - now) / 1000
      return message.reply(`${command.name} 명령어를 사용하기 위해서는 ${timeLeft.toFixed(1)}초 더 기다리셔야 합니다.`)
    }
  }
  timestamps.set(message.author.id, now)
  setTimeout(()=> timestamps.delete(message.author.id),cooldownAmount)

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
  }
});

client.on("messageCreate", (message) => {
  if (message.content == `${prefix}유튜브`) {
    const channel = message.member.voice.channel;
    if (!channel) return message.reply("음성채널에 접속해주세요!");
    client.discordTogether
      .createTogetherCode(channel.id, "youtube")
      .then((invite) => {
        return message.channel.send(invite.code);
      });
  }
});

client.on('guildMemberAdd', member => {
  if(!member.guild) return;
  let guild= member.guild
  let channel = guild.channels.cache.find(c => c.name === "『😀』입장로그")
  let createdAt = member.user.createdAt
  let date = new Date()
  let time = Math.round(date.getTime() / 1000)
  if(!channel) return;

  let em = new (require("discord.js")).MessageEmbed()
    .setColor("BLUE")
    .setTitle(`${guild.memberCount}번째 멤버가 입장했습니다!!`)
    .setDescription(`${member.user.tag}님, **${guild.name}**에 오신 것을 환영합니다!!`)
    .addFields(
      {name:"ID", value:`${member.id}`},
      {name:"계정 생성일", value:`${createdAt.getFullYear()}년 ${createdAt.getMonth()}월 ${createdAt.getDate()}일`},
      {name:"서버에 입장한 시간", value: `<t:${time}>`})
    .setThumbnail(member.user.displayAvatarURL())
  
    channel.send({embeds:[em]})
})

client.login(token);
