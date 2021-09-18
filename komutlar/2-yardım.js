const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

let prefix = ayarlar.prefix

exports.run = (client, message, args) => {
  
    const embed = new Discord.MessageEmbed()
    .setColor(`#00ffff`)
    .setTitle(`**Yardım Menüsü**`)
    .addField(`:white_small_square: ${prefix}yardım `,`▸ Yardım komutu.`, true)
    .addField(`:warning: BOTUMUZ ŞUAN BAKIMDADIR.. :warning:`)

message.channel.send(embed)
};
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ['help']



};
exports.help = {
name: "yardım"
};