/*****************************************************************************
 * FILE: index.js
 * @author MarsEnyalios, Gawdly
 * Purpose: register commands for bot
 *****************************************************************************/

#!/usr/bin/env node 
'use babel';
'use strict';

import { FriendlyError } from 'discord-graf';
import bot from './bot';
import DiceExpression from 'dice-expression-evaluator'; // TODO: install dependency
var about = require('./package.json'); 
import * as analytics from './util/analytics';          // TODO: make file
import config from './config';                          // TODO: make file

import RollDiceCommand from './commands/dice/roll';
import MaxRollCommand from './commands/dice/max';
import MinRollCommand from './commands/dice/min';

bot.logger.info(`MarsBot v${version} is starting...`);
analytics.sendEvent('Bot', 'started');

// Create bot
export const client = bot
   .registerDefaults() // TODO: Understand what graf defaults are
   .registerModules([
      ['dice', 'Dice'],
      ['information', 'Information'],
      ['utilities', 'Utilities']
   ])
   .registerCommands([
      RollDiceCommand,
      MaxRollCommand,
      MinRollCommand
   ])
   .registerEvalObjects({
      version: about.version,
      dice: DiceExpression
   })
.createClient();

// Set up command analytics, whatever that means lmaooo
bot.dispatcher.on('commandRun', command => {
   analytics.sendEvent('Command', 'run', `${command.module}:${command.memberName}`);
}).on('commandError', (command, err) => {
   if(!(err instanceof FriendlyError)) analytics.sendException(err);
});

// Exit on interrupt
let interruptCount = 0;
process.on('SIGINT', async () => {
   interruptCount++;
   if(interruptCount === 1) {
      bot.logger.info('Received interrupt signal; destroying client and exiting...')
      await Promise.all([
         client.destroy()
      ]).catch(err => {
	 bot.logger.error(err);
      });
      process.exit(0);
   } 
   else {
      process.exit(0);
   }
});
