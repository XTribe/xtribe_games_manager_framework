/**
* Xtribe Games Manager Framework
* 
* Example 2: Debug Tools
*
* Module 'etsman' offers two debug tool:
*  - Monitor: displays all the chain of messages exchanged between Xtribe, your manager 
*           and your clients to let you understand what is going on and to debug your code
*
*  - Debug Sender: allow you to send messages directly to your manager to debug it
*/

var etsman = require('etsman');

// Use option object to enable/disable debug tools
var options = {
	port : 9002,					// Your manager will be listening on this port E.g.: http://localhost:9002 (or http://yourServerAddress:yourPort)	
	onReady : onReadyMsg,			// Handler for 'ready' system message
	monitor : {							        
		enabled : true, 			// Enable/disable Monitor, it will be available by default on this link: http://localhost:9002/monitor (or http://yourServerAddress:yourPort/monitor)
		customLink : 'myMonitor',	// You can customize link to be http://localhost:9002/myMonitor (or http://yourServerAddress:yourPort/myMonitor)
		verbose: true				// Enable verbose mode to log system more informations
	},
	debugSender : {							    
		enabled : true,				// Enable/disable Debug Sender, it will be available by default on this link: http://localhost:9002/monitor (or http://yourServerAddress:yourPort/debugSender)
		customLink : 'mySender'		// You can customize link to be http://localhost:9002/mySender (or http://yourServerAddress:yourPort/mySender)
	}							                
};
etsman.startManager(options);

function onReadyMsg(message) {
	// If you want to log something to the monitor, use the function logToMonitor
	etsman.logToMonitor("Hello World!");
}

/* Launch your manager, try to use Debug Sender to send messages
and see the result in Monitor. */