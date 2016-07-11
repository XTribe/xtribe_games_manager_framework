/**
* Xtribe Games Manager Framework
* 
* Example 4: Receiving client messages
*
* You can share information with your client(s) sending messages with custom topics.
* Declare in option object the handler for these messages, to manage them. 
* To send a reply to a message received, simply return it in the function you chose.
*/
var etsman = require('etsman');

var options = {
	port : 9004, 				// Your manager will be listening on this port E.g.: http://localhost:9004 (or http://yourServerAddress:yourPort)
	onClientMessage : onClientMessageExample,	//Handler for client messages
	monitor : {							        
		enabled : true 			// Enable/disable Monitor, it will be available by default on this link: http://localhost:9004/monitor (or http://yourServerAddress:yourPort/monitor)
	}					                
};
etsman.startManager(options);

/**
 * An example of a simple handler for client messages.
 *
 * Parameters: 
 * @param messageReceived
 *            The message received.
 */
function onClientMessageExample(messageReceived) {
	// Log to Monitor the identifier of the client that sent the message and data.
	etsman.logToMonitor("Received message from client: " + messageReceived.clientId);
	etsman.logToMonitor("Data received: " + etsman.prettyJson(messageReceived.params));
	try {
		// Let's generate a reply message depending on the topic of the message arrived
		var outTopic = "nothing";
		switch (messageReceived.topic) {
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
		// (broadcast: true and includeSelf: false)
		var outMessage = {
			topic : outTopic,
			broadcast: true,
			includeSelf: false,
			params : {
				'foo' : 'bar'
			}
		};

		// To send a reply message simply return it at the end of the function
		// You can also return nothing. In that case, a generic confirmation of 
		// arrival will be sent to your client
		return outMessage;

	} catch (err) {
		// Something went wrong? Send an error message back to all clients, for example
		var outMessage = {
			topic : 'error',
			broadcast: true,
			includeSelf: true,
			params : {
				'message' : 'Error occurred in function onClientMessageExample ('+err+')'
			}
		};
		return outMessage;
	}
}
