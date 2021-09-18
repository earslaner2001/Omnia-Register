const Discord = require("discord.js");
const client = new Discord.Client();
const jimp = require("jimp");
const db = require("quick.db");
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);

//-------------------- 7/24 Uptime --------------------//

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`7/24 Hizmet Vermekteyim!`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://v12moderasyon.glitch.me/`);
}, 280000);

client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
});

const log = message => {
  console.log(` ${message}`);
};
require("./util/eventLoader.js")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.login(process.env.token);

//-------------------- BOT DM Görme --------------------//

client.on("message", msg => {
var dm = client.channels.cache.get("831922413901971507")
if(msg.channel.type === "dm") {
if(msg.author.id === client.user.id) return;
const botdm = new Discord.MessageEmbed()
.setTitle(`${client.user.username} Dm`)
.setTimestamp()
.setColor("RED")
.setThumbnail(`${msg.author.avatarURL()}`)
.addField("Gönderen", msg.author.tag)
.addField("Gönderen ID", msg.author.id)
.addField("Gönderilen Mesaj", msg.content)

dm.send(botdm)

}
if(msg.channel.bot) return;
});

//-------------------- BOT DM Görme --------------------//

client.on("ready", () => {
  client.channels.get("842450491627667456").join();
   //main dosyaya atılacak
})

//-------------------- Ses Log --------------------//

client.on("voiceStateUpdate", async (mattheeski, mattheyeni) => {
let qwe = client.channels.cache.get("876885697166995456");
if (!mattheeski.channelID && mattheyeni.channelID) return qwe.send(`\`${mattheyeni.guild.members.cache.get(mattheyeni.id).displayName}\` kullanıcısı \`${mattheyeni.guild.channels.cache.get(mattheyeni.channelID).name}\` isimli ses kanalına katıldı!`).catch();
if (mattheeski.channelID && !mattheyeni.channelID) return qwe.send(`\`${mattheyeni.guild.members.cache.get(mattheyeni.id).displayName}\` kullanıcısı \`${mattheyeni.guild.channels.cache.get(mattheeski.channelID).name}\` adlı ses kanalından ayrıldı!`).catch();
if (mattheeski.channelID && mattheyeni.channelID && mattheeski.channelID != mattheyeni.channelID) return qwe.send(`\`${mattheyeni.guild.members.cache.get(mattheyeni.id).displayName}\` adlı kullanıcı \`${mattheyeni.guild.channels.cache.get(mattheeski.channelID).name}\` adlı ses kanalından çıkıp \`${mattheyeni.guild.channels.cache.get(mattheyeni.channelID).name}\` adlı ses kanalına girdi.`).catch();
if (mattheeski.channelID && mattheeski.selfMute && !mattheyeni.selfMute) return qwe.send(`\`${mattheyeni.guild.members.cache.get(mattheyeni.id).displayName}\` kullanıcısı \`${mattheyeni.guild.channels.cache.get(mattheyeni.channelID).name}\` adlı kanalda kendi susturmasını kaldırdı.`).catch();
if (mattheeski.channelID && !mattheeski.selfMute && mattheyeni.selfMute) return qwe.send(`\`${mattheyeni.guild.members.cache.get(mattheyeni.id).displayName}\` kullanıcısı \`${mattheyeni.guild.channels.cache.get(mattheyeni.channelID).name}\` adlı kanalda kendisini susturdu.`).catch();
if (mattheeski.channelID && mattheeski.selfDeaf && !mattheyeni.selfDeaf) return qwe.send(`\`${mattheyeni.guild.members.cache.get(mattheyeni.id).displayName}\` kullanıcısı \`${mattheyeni.guild.channels.cache.get(mattheyeni.channelID).name}\` adlı kanalda kulaklığını açtı.`).catch();
if (mattheeski.channelID && !mattheeski.selfDeaf && mattheyeni.selfDeaf) return qwe.send(`\`${mattheyeni.guild.members.cache.get(mattheyeni.id).displayName}\` kullanıcısı \`${mattheyeni.guild.channels.cache.get(mattheyeni.channelID).name}\` adlı kanalda kulaklığını kapattı.`).catch();
if (mattheeski.channelID && !mattheeski.serverMute && mattheyeni.serverMute) return qwe.send(`\`${mattheyeni.guild.members.cache.get(mattheyeni.id).displayName}\` kullanıcısı \`${mattheyeni.guild.channels.cache.get(mattheyeni.channelID).name}\` adlı kanaldayken sunucuda mute yedi.`).catch();
if (mattheeski.channelID && mattheeski.serverMute && !mattheyeni.serverMute) return qwe.send(`\`${mattheyeni.guild.members.cache.get(mattheyeni.id).displayName}\` kullanıcısı \`${mattheyeni.guild.channels.cache.get(mattheyeni.channelID).name}\` adlı kanaldayken sunucudaki mutesi açıldı.`).catch();
})