const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

module.exports = client => {
  setInterval(()=>{
 client.user.setActivity(`${client.guilds.cache.size} Sunucu'ya hizmet veriyorum!`, { type:'PLAYING' })
console.log('Yarlıg Han')
      },15000)
}