/*****************************************************************************
 * FILE: index.js
 * @author MarsEnyalios, Gawdly
 * Purpose: ???
 *****************************************************************************/

require('./bot');

// Exit on interrupt
let interruptCount = 0;
process.on('SIGINT', async () => {
   interruptCount++;
   if(interruptCount === 1) {
   //   bot.logger.info('Received interrupt signal; destroying client and exiting...')
      await Promise.all([
         client.destroy()
      ]).catch(err => {
	 //bot.logger.error(err);
      });
      process.exit(0);
   } 
   else {
      process.exit(0);
   }
});
