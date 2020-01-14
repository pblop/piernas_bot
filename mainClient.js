const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Main bot logged in as ${client.user.tag}!`)
  console.log(
    `Add this bot to your server: https://discordapp.com/oauth2/authorize?&client_id=${client.user.id}&scope=bot&permissions=0`
  )
})

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong.')
  }
})

module.exports = client
