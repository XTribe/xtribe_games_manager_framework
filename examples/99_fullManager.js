/**
 * Xtribe Games Manager Framework
 * 
 * This example merge all the other examples in one manager, ready to go.
 */

/*
* The module 'etsman', here included,
* provide a set of useful tools to enhance creating experiments experience.
*
* Import it and every tool will be available as etsman.toolName. 
* Please refer to documentation for details about available tools. 
*/
var etsman = require('etsman');

/** Start your manager passing the 'options' object. 
 * Please refer to documentation for details about available options.
 */
var options = {
	port : 9000, 					//Your manager will be listening on this port E.g.: http://localhost:9000 (or http://yourServerAddress:9000)							                
	onReady : onReadyExample,					//Handler for "ready" system message
	onClientMessage : onClientMessageExample,	//Handler for client messages
	monitor : {							        
		enabled : true, 			//Enable/disable Monitor, it will be available by default on this link: http://localhost:9000/monitor (or http://yourServerAddress:yourPort/monitor)
		customLink : "myMonitor"	//You can customize link to be http://localhost:9000/myMonitor (or http://yourServerAddress:yourPort/myMonitor)
	},
	debugSender : {							    
		enabled : true,				//Enable/disable Debug Sender, it will be available by default on this link: http://localhost:9000/monitor (or http://yourServerAddress:yourPort/debugSender)
		customLink : "mySender"		//You can customize link to be http://localhost:9000/mySender (or http://yourServerAddress:yourPort/mySender)
	}							                
};
etsman.startManager(options);

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

function onReadyExample(message, callback) {
	// Log to Monitor data sent with 'ready' message.
	// For this example to work, you must have enabled Xtribe 'Enable user data sending' option for your experiment.
	// Please refer to documentation for details about sending user data along with 'ready' message.
	etsman.logToMonitor("Received ready message with data: " + etsman.prettyJson(message.params));

	/*
	 * tryWaterfall is an utility function similar to async.waterfall, with exception handling.
	 * 
	 * Runs the tasks array of functions in series, each passing their results
	 * to the next in the array. However, if any of the tasks pass an error to
	 * their own callback, the next function is not executed, and the main
	 * callback is immediately called with the error. (Details on https://github.com/caolan/async)
	 * 
	 * This useful library is included in etsman and exported as etsman.async,
	 * so you can use for example etsman.async.each(arr, iteratee, [callback])
	 */
	etsman.tryWaterfall(
			[
			 function(callback) {
				 // If empty, this throws an exception which is caught by the tryWaterfall
				 // method, which then calls the callback passing the caught error, thus stopping
				 // the waterfall and sending immediately the response (which will include the error)
				 etsman.errIfEmpty(message.params);
				 etsman.errIfEmpty(message.params.data);
				 
				 // Read asynchronously the user's saved data in our database
				 readUser(message.clientId, callback);
			 }, 
			 function(user, callback) {
			 	 // Collecting a subset of the user data available in the 'ready' message
			 	 // needed by our game and add them to our custom user object enriched in
			 	 // the readUser function with custom user data
			 	 if (message.params.data) { 
				 	user.spoken_languages = message.params.data.spoken_languages;
				 	user.birth_date = message.params.data.birth_date;
			 	 };
			 	 // Save custom user data
				 saveUser(user, callback);
			 }, 
			 function(user, callback) {
			 	// Send a message back to the client that generated the 'ready' message
			 	// (broadcast: false and includeSelf: true)
			 	// with the custom user data we generated
			 	// In the client, we will receive this message and work with data received
                var outMessage={
                 	topic: "readyArrived",
	            	broadcast:      false,
	            	includeSelf:    true,
                 	params: {
                         userdata: user
                 	}
                };
                 callback(null, outMessage);
			 }
			 ], callback);
}

function readUser(clientId, callback) {
	etsman.errIfEmpty(clientId);
	// Read the user data... 
	// In this example, we create a user object with custom data.
	// In your game, you could extract these data from a database or whatever other source
	// of data you're comfortable with. You can identify users by their unique clientId.
	var user = {
			clientId : clientId,
			points : 300,
			level : 2
	};
	
	if (etsman.isEmpty(user))
		return callback('user_not_found'); 
		// If you call the callback in more than one place, you must be certain
		// that you cannot call it twice, so better prepend a nice 'return'
		// statement

	// ...and send it back to the caller
	callback(null, user);
}

function saveUser(user, callback) {
	user.lastseen = new Date();
	// You could save custom user data in a database or whatever other source
	// of data you're comfortable with.
	
	// Call the callback
	callback(null, user);
}
