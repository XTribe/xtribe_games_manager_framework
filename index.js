/**
* Xtribe Games Manager Framework
* 
* Example 1: Building a simple manager
*
* The manager is the server side component in charge for the coordinating the game-specific 
* interaction among players such as decide initial data for each match, process in game interaction,
* decide winner and scores. The manager also record all relevant information about the game process,
* in order to allow scientific analysis of collected data. It can be implemented with any server 
* side technology and must be hosted on a server of yours.
*
* You can use our examples to install locally a node.js manager for your own Xtribe game.
* This is the starting point for developing your own manager, and the module 'etsman', here included,
* provide a set of useful tools to enhance creating experiments experience.
*
* Import it and every tool will be available as etsman.toolName. 
* Please refer to documentation for details about available tools. 
*/
var etsman = require('etsman');

/** Start your manager passing the 'options' object. 
 * Please refer to documentation for details about available options and defaults.
 */
var options = {
	port : 9000, 	//Your manager will be listening on this port E.g.: http://localhost:9000 (or http://yourServerAddress:9000)		
	monitor : {							        
		enabled : true, 			// Let's ignore this setting, for now
		verbose: true				
	}					                
};
etsman.startManager(options);

// Want to know more? Check the 'examples' directory to get familiar with all tools available!