/*****************************************************************************
 * FILE: max.js
 * @author Gawdly
 *         Modified by MarsEnyalios for node.js
 * Summary: contains logic needed for calculating maximum possible roll of a 
 *          dice expression.
 *****************************************************************************/

const Graf = require('discord-graf');
const Evaluator = require('dice-expression-evaluator');

class MaxRollCommand extends Graf.Command {
   constructor(bot) {
      super(bot, {
         name: 'max-roll',
	 module: 'dice',
         memberName: 'max',
	 description: 'Calculates the maximum possible roll for a dice expression.',
	 usage: 'max-roll <dice expression>',
	 details: 'The dice expression follows the same rules as !roll, but targets (< or >) cannot be used.',
	 examples: ['max-roll 2d20', 'max-roll 3d20 - d10 + 6']
      });
   }

   async run(message, args) {
      if(!args[0]) throw new Graf.CommandFormatError(this, message.guild);
      
      try {
	 const maxRoll = new Evaluator.DiceExpression(args[0]).max();
         return `The maximum possible roll is **${maxRoll}**.`;
      } catch(err) {
         return 'Invalid dice expression specified.';
      }
   } // ASYNC
} // MAXROLLCOMMAND

module.exports = MaxRollCommand; 
