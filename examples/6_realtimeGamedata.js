/**
* Xtribe Games Manager Framework
* 
* Example 6: Real-time Gamedata
*
* The global variable GAMEDATA contains data about your game instances, in JSON format, and gets filled in real-time from the moment 
* the manager is started to the moment it is stopped. GAMEDATA contain these data for each instance of the game:
* - instanceId: id of the current instance of the game
* - experimentId: id of the current game
* - created/started/ended/aborted: when the game is created,started,ended or aborted, a timestamp of that event is added in this field. 
* Please refer to ['System Message'](http://xtribe.eu/it/page/xtribe-documentation#System_messages) section in Xtribe documentation, 
* for details about the occurring of these events.
* - players:    
*    - clientId: identifies univocally a player, 
*    - readyTimestamp: timestamp of the moment the player started to play 
*    - player data: eventually delivered by Xtribe, along with the ready message, if you enabled, in your game settings, the option 
* 		'Enable user data sending'. Please refer to ['Messages in detail - Ready'](http://xtribe.eu/node/64#messagesindetail) section in Xtribe 
* 		documentation, for details about these data, 
*		and to ['Advanced Options'](http://xtribe.eu/it/page/xtribe-documentation#Advanced_options) section for enabling this setting
* 		in your game.
* You can access these data by the GAMEDATA variable directly, or using the method getInstanceData(instanceId) which returns data about the
* instance identified by the instanceId passed as parameter. Remember that the instanceId of a specific istance of your game is passed as part
* of almost any Xtribe message received and sent by your manager and client, during that instance lifetime.
*
* N.B.: Don't use Debug Sender to test this example, but a real game client. GAMEDATA is filled with data as messages get exchanged
* between your client and manager. If messages doesn't respect the correct order, GAMEDATA content will be not meaningful.
*
*/
var etsman = require('etsman');

var options = {
	port : 9006, 					// Your manager will be listening on this port E.g.: http://localhost:9006 (or http://yourServerAddress:yourPort)
	onReady : onReadyMsg,			// Handler for 'ready' system message
	onJoin : onJoinMsg,				// Handler for 'join' system message
	monitor : {							        
		enabled : true, 				// Enable/disable Monitor, it will be available by default on this link: http://localhost:9006/monitor (or http://yourServerAddress:yourPort/monitor)
		verbose : true
	}								                
};
etsman.startManager(options);

function onJoinMsg(message) {
	// On the arrival of a join message, print GAMEDATA to Debug Monitor. Start two or more instance to see GAMEDATA grow.
	etsman.logToMonitor("***** GAMEDATA on join: " + etsman.prettyJson(GAMEDATA)+"*****");
	// Print this specific instance data, just to see how getInstanceData works.
	etsman.logToMonitor("***** INSTANCE DATA on join: " + etsman.prettyJson(etsman.getInstanceData(message.instanceId))+"*****");
}

function onReadyMsg(message) {
	// Check the difference in GAMEDATA at Ready time. Try to enable the option 'Enable user data sending' to see optional data
	// added to every player data when ready message arrives.
	etsman.logToMonitor("***** GAMEDATA on ready: " + etsman.prettyJson(GAMEDATA)+"*****");
	etsman.logToMonitor("***** INSTANCE DATA on ready: " + etsman.prettyJson(etsman.getInstanceData(message.instanceId))+"*****");
}

