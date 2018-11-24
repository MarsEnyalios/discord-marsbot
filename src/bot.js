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

// configure logger settings...
// TODO: figure out how to use the inbuilt graf logger if there is one
//       or create my own

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
   // an updateURL would go here
   clientOptions: {
      disableEveryone: true
   }
});

// include the files for each command. Commands have their own names customized
// inside their files, so don't worry file names, just content
let Commands = [
   require('./commands/dice/roll'),
   require('./commands/dice/max'),
   require('./commands/dice/min'),
];

bot.registerDefaults()        // TODO: what are graf defaults
   .registerModules([         // these are command categories
      ['dice', 'Dice'],
      ['info', 'Info'],
      ['util', 'Util']
   ])
   .registerCommands(Commands) // here's where commands are put in bot
   .registerEvalObjects({
      version: version, 
      dice: DiceExpression
   })
   .createClient();            // and here's where we make the bot

bot.client.on('ready', token => {
   let client = bot.client;
});

module.exports = bot; // TODO: what's this
