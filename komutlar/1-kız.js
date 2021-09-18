const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

let kanal = db.fetch(`kayıtkanal_${message.guild.id}`)
let alınacakrol = db.fetch(`alınacakrol_${message.guild.id}`)
let kızrol = db.fetch(`kızrol_${message.guild.id}`)
let kayıtçı = db.fetch(`kayıtçırol_${message.guild.id}`)
let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
  
if(!message.member.roles.cache.has(kayıtçı)) return message.channel.send(`Bu Komudu Kullanabilmen İçin <@&${kayıtçı}> Adlı Role Sahip olman Lazım ! `)
if(message.channel.id !== kanal) return message.channel.send(`Bu Komudu Sadece <#${kanal}> Adlı Kanalda Kullanabilirsin ! `)
if (!kızrol) return message.channel.send(`Sunucuda Kız Rolü Ayarlanmadığı İçin Komut Kullanılamaz ! `)

let member = message.mentions.members.first();
if (!member) return message.channel.send(`Kız Olarak Kayıt Edeceğin Kullanıcıyı Belirtmelisin ! `)
let isim = args[1]
if (!isim) return message.channel.send(`İsmini Belirtmelisin ! `)

member.setNickname(`${isim}`)
member.roles.remove("842800361496641536")
member.roles.add(kızrol) 

const başarılı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Kız `)
.setColor('BLACK')
.setDescription(`Kız Olarak Kayıt Edilen Kullanıcı: ${member} \n Kız Olarak Kayıt Eden Yetkili: <@!${message.author.id}> \n Kız Olarak Kayıt Eden Kullanıcının Kayıt Sayısı: **${kayıtsayı ? `**${kayıtsayı}**` : "0"}**`)
.addField(`Kullanıcının ismi;`, `${isim}`, true)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(başarılı)
db.add(`kayıtsayı_${message.author.id}`, 1)
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['k'],
  permlevel: 0
}
exports.help = {
  name: 'kız',
  description: 'kız olarak kayıt eder',
  usage: 'kız @kullanıcı isim yaş'
}