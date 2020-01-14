const Discord = require('discord.js')
const { musicPrefix: prefix } = require('./config.json')
const client = new Discord.Client()
const ytdl = require('ytdl-core')

client.on('ready', () => {
  console.log(`Music bot logged in as ${client.user.tag}!`)
  console.log(
    `Add this bot to your server: https://discordapp.com/oauth2/authorize?&client_id=${client.user.id}&scope=bot&permissions=0`
  )
})

client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot || msg.member == null)
    return
  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(' ')
  const command = args.shift().toLowerCase()

  if (command === 'play') {
    if (args.length < 1) {
      console.log(
        `Tienes que usar el comando seguido de una canción: "${prefix}play <canción>"`
      )
    } else {
      playSong(msg, args[0])
    }
  } else if (command === 'join') {
    joinChannelCommand(msg)
  } else if (command === 'leave') {
    leaveChannelCommand(msg)
  } else {
    msg.reply(`Unknown command "${command}"`)
  }
})

function playSong (msg, link) {
  const streamOptions = { seek: 0, volume: 1 }

  const connection = getVoiceConnectionFromMessage(msg)
  if (connection == null) {
    msg.reply('No estoy en un canal de voz')
    return
  }

  try {
    connection.play(
      ytdl(link, {
        filter: 'audioonly'
      }),
      streamOptions
    )
  } catch (e) {
    console.log(e)
  }
}

function joinChannelCommand (msg) {
  const vc = msg.member.voice.channel
  if (vc != null) {
    if (vc.joinable) {
      vc.join()
    } else {
      msg.reply('No me tengo permisos para entrar en tu canal de voz')
    }
  } else {
    msg.reply('No estás en un canal de voz')
  }
}

function getVoiceConnectionFromMessage (msg) {
  const guild = msg.guild
  return client.voice.connections.find(vc => vc.channel.guild === guild)
}

function leaveChannelCommand (msg) {
  getVoiceConnectionFromMessage(msg).disconnect()
}

module.exports = client
