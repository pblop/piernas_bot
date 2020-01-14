const mainClient = require('./mainClient.js')
const musicClient = require('./musicClient.js')
const { mainToken, musicToken } = require('./config.json')

mainClient.login(mainToken)
musicClient.login(musicToken)
