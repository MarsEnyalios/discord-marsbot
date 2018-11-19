/*****************************************************************************
 * FILE: analytics.js
 * @author Gawdly, MarsEnyalios
 * Summary: ??? universal-analytics is a google tracking thing, i'm not too
 *              hot for that :thonk:
 *****************************************************************************/

// https://www.npmjs.com/package/universal-analytics
import ua from 'universal-analytics'; // TODO install dependency
import config from '../config';
var about = require ('../about.json');

export const user = config.analytics ? ua('UA-81182461-1', { https: true }) : null;

export function sendEvent(eventCategory, eventAction, eventLabel = null, eventValue = null) {
   if(user) {
      user.event({
         ec: eventCategory,
	 ea: eventAction,
	 el: eventLabel,
	 ev: eventValue,
	 an: about.name,
	 av: about.version
      }).send();
   } // end if
} // export sendEvent

export function sendException(err) {
   if(user) {
      user.exception({
         exd: `${err.name}: ${err.message}`,
	 an: about.name,
	 av: about.version
      }).send();
   }
} // export sendException
