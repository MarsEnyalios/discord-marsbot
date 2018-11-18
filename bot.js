/*****************************************************************************
 * FILE: bot.js
 * @author MarsEnyalios
 * Purpose: creates a new instance of Marsbot
 *****************************************************************************/

// uses Babel & discord.js v10. https://www.npmjs.com/package.discord-graf
const Bot = require('discord-graf').Bot; 

// https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
var logger = require('winston'); 

// BOT Variables
const about = require('./package.json'); // bot info
const auth = require('./auth.json'); // bot token
const prefix = '!'; // TODO: import from another file

// configure logger settings... TODO: figure out what the hell this is doing
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
   colorze: true 
}); 

logger.level = 'debug';

// initialize discord bot!!
const bot = new Bot({
   name: about.name,
   version: about.version,
   token: auth.token,
   commandPrefix: prefix,
   clientOptions: {
      disableEveryone: true
   }
});

// this is where we declare our commands!
let Commands = [
   require('./commands/dice/roll'),
   require('./commands/dice/max'),
   require('./commands/dice/min'),
];

// obviously to catch errors
process.on('uncaughtException', (err) => {
   let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');

   logger.error(errorMsg); // TODO: is this actually going to work
});

// register any modules here!
// dice, information, utility? 

// connect!
bot.client.on('ready', token => {
   let client = bot.client;
   console.log(`Logged in as ${client.user.tag}!`);
});

// not sure what this does
module.exports = bot; 
