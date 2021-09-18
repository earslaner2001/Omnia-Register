const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

let prefix = ayarlar.prefix

exports.run = (client, message, args) => {
  
    const embed = new Discord.MessageEmbed()
    .setColor(`#00ffff`)
    .setColor("#00F6FE")
    .setDescription(`**<@!${message.author.id}> Şuan Tokenimi Aldın Aferin Sana İbne :clap:**`)
    .setImage('https://i.ytimg.com/vi/2bp9jmQnMfs/maxresdefault.jpg')

message.channel.send(embed)
};
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ['token']



};
exports.help = {
name: "token"
};