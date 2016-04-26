/**
* Xtribe Games Manager Framework
* 
* Example 3: Receiving system messages
*
* Xtribe sends system messages to your manager and clients to manage some
* events of their lifecycle. In your manager, you can receive these messages
* declaring in the option object your own function handling the request.
*/
var etsman = require('etsman');

/*
* Declare in the option object the specific handler for any message. 
* For the sake of this example, we will handle 'ready' message.
* Please refer to documentation for details about available messages and their meaning. 
*/
var options = {
	port : 9000, 							
	onReady : onReadyExample,	//Handler for 'ready' system message
	onPing : null,				//Handler for 'ping' system message
	onInstance : null,			//Handler for 'instance' system message
	onJoin : null,				//Handler for 'join' system message
	onLeave : null,				//Handler for 'leave' system message
	onOver : null,				//Handler for 'over' system message
	onDrop : null,				//Handler for 'drop' system message
	onAbort : null,				//Handler for 'abort' system message
	onEnd : null,				//Handler for 'end' system message
	onError : null,				//Handler for 'error' system message	
	monitor : {							        
		enabled : true 			//Enable/disable Monitor, it will be available by default on this link: http://localhost:9000/monitor (or http://yourServerAddress:yourPort/monitor)
	}               
};
etsman.startManager(options);

/**
 * An example of a simple handler for the 'ready' system message.
 * In this example, you can see some useful features you can use. 
 * We'll collect from the 'ready' message some user data and add custom 
 * game data to send back to the client that generated the message itself.
 *
 * Parameters: 
 * @param messageReceived
 *            The message received.
 */
function onReadyExample(messageReceived) {
	// Log to Monitor data sent with 'ready' message.
	// For this example to work, you must have enabled Xtribe 'Enable user data sending' option for your experiment.
	// Please refer to documentation for details about sending user data along with 'ready' message.
	etsman.logToMonitor("Received ready message with data: " + etsman.prettyJson(messageReceived.params));

	// Declare our custom user object
	var user = {
			clientId : messageReceived.clientId,
			points : 100,
			level : 1
	};

	// Collect a subset of the user data available in the 'ready' message
	// and add them to our custom user object enriched with custom user data

	if (messageReceived.params.data) { 
		// Throw an error if data are empty
		etsman.errIfEmpty(messageReceived.params.data.spoken_languages);
		etsman.errIfEmpty(messageReceived.params.data.birth_date);

		user.spoken_languages = messageReceived.params.data.spoken_languages;
		user.birth_date = messageReceived.params.data.birth_date;
	};

	// Send a message back to the client that generated the 'ready' message
	// (broadcast: false and includeSelf: true)
	// with the custom user data generated.
	// The client will receive this message and could use data received
    var outMessage={
        topic: "myGameUserData",
	    broadcast:      false,
	    includeSelf:    true,
        params: {
            userdata: user
        }
    }

    // To send a reply message simply return it at the end of the function
	// You can also return nothing. In that case, a generic confirmation of 
	// arrival will be sent to your client
	return outMessage;
}