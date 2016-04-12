/**
* Xtribe Games Manager Framework
* 
* Example 4: Receiving client messages
*
* You can share information with your client(s) sending messages with custom topics.
* Declare in option object the handler for these messages, to manage them. 
*/
var etsman = require('etsman');

var options = {
	port : 9000, 								
	onClientMessage : onClientMessageExample,	//Handler for client messages
	monitor : {							        
		enabled : true 			//Enable/disable Monitor, it will be available by default on this link: http://localhost:9000/monitor (or http://yourServerAddress:yourPort/monitor)
	}					                
};
etsman.startManager(options);

/**
 * An example of a simple handler for client messages.
 *
 * Parameters: 
 * @param message
 *            The message received.
 * 
 * @param callback
 *            A callback function that has to be called after everything is
 *            done, to send the reply back. This callback function accepts the
 *            following two parameters.
 * 
 * The first one, as all Node-style callbacks, is an Error object. If it is null
 * the operation is considered successful, otherwise it means that an error has
 * occurred.
 * 
 * The second parameters is the message to be sent back.
 * 
 * IMPORTANT NOTE: The callback MUST ALWAYS be called (also in case of error or
 * exception), and it must be called ONLY ONCE. Otherwise the request by Xtribe
 * remains open, or an exception is thrown with the result that the manager crashes.
 */
function onClientMessageExample(message, callback) {
	// Log to Monitor identifier of the client that sent the message and data.
	etsman.logToMonitor("Received message from user: " + message.clientId);
	etsman.logToMonitor("Data received: " + etsman.prettyJson(message.params));
	try {
		// Throws an exception in case no topic was defined for the message
		etsman.errIfEmpty(message.topic); 

		// Let's generate a reply message depending on the topic of the incoming message
		var outTopic = "nothing";
		switch (message.topic) {
			case 'chat':
				outTopic = "hello";
				// do something
				break;
			case 'wave':
				outTopic = "goodbye";
				// do something
				break;
			default:
				outTopic = "unrecognizedTopic";
				// do something
				break;
		}

		// Enrich the reply message with custom data and settings
		// In this case, the reply message will be sent to all clients involved
		// in the specific game instance, except the one who sent the original message
		var outMessage = {
			topic : outTopic,
			broadcast: true,
			includeSelf: false,
			params : {
				'foo' : 'bar'
			}
		};

		// Call the callback function passing null as error (everything is ok) and the message to be sent as reply
		callback(null, outMessage);

	} catch (err) {
		// Catch any thrown exception so we are sure to call the callback
		// function (to which we pass the error as the first parameter)
		callback(err);
	}
}
