/*****************************************************************************
 * FILE: bot.js
 * @author MarsEnyalios
 * Purpose: creates a new instance of Marsbot
 *****************************************************************************/
'use babel';  // idk why these are included but Gawdly uses them
'use strict'; // in all their code, so just in case...

// uses Babel & discord.js v10. https://www.npmjs.com/package.discord-graf
const Bot = require('discord-graf').Bot; 

// https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
var logger = require('winston'); 

// BOT Variables
const about = require('./about.json'); // bot info
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
   // an updateURL would go here
   clientOptions: {
      disableEveryone: true
   }
});
