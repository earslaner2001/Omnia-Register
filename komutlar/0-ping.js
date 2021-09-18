const Discord = require('discord.js');

exports.run = (client, message) => {
  
  var ping = new Discord.MessageEmbed()

  .setColor('#313131')
  .setDescription(`Botun Ping Değeri ・ ${client.ws.ping}ms`)
  message.channel.send(ping)
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Bu Komut EsatKcMz#0001 Tarafından Bot Club Sunucusu İçin Yapılmıştır',
  usage: 'Bu Komut EsatKcMz#0001 Tarafından Bot Club Sunucusu İçin Yapılmıştır'
};