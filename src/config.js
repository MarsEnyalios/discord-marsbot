/*****************************************************************************
 * FILE: config.js
 * @author Gawdly, MarsEnyalios
 * Purpose: ???
 *****************************************************************************/

'use babel';
'use strict';

import yargs from 'yargs';
import bot from './bot';
var about = require('./about.json');

bot.config.defaults.log = 'marsbot.log';
bot.config.defaults.storage = 'marsbot-storage';
bot.config.loadDefaults();

export const config = bot.config.yargs(yargs)
	.usage('$0 [command] [options]')
	.example('$0 --token SomeAPITokenGoesHere', 'Starts the bot using a token')
	.example('$0 --email SomeGuy@SomeSite.com --password SomeCrazyPassword123', 'Starts the bot using an email and password')
	.example('$0 --config settings.yml', 'Starts the bot using a config file')
	.example('$0 completion', 'Outputs Bash completion script')
	.epilogue(`MarsBot v${about.version} by MarsEnyalios: https://github.com/MarsEnyalios/discord-marsbot/`)

	// General
	.option('analytics', {
		type: 'boolean',
		default: true,
		alias: 'A',
		describe: 'Whether or not to enable anonymous, non-unique, non-identifiable analytics',
		group: 'General:'
	})

	// General yargs
	.help()
	.alias('help', 'h')
	.group('help', 'Special:')
	.version(about.version)
	.alias('version', 'v')
	.group('version', 'Special:')
	.completion('completion')
	.wrap(yargs.terminalWidth())
.argv;
export default config;
