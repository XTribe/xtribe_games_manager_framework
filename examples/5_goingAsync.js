/**
* Xtribe Games Manager Framework
* 
* Example 5: Going Async
*
* If you need your messages handling function to perform asynchronous calls,
* like reading data from a file or a database
* you must sent a reply in an asynchronous way. Let's see how.
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
 * In this example you can see some useful features you can use. 
 * We'll collect from the 'ready' message some user data needed by our game
 * and add custom game data to send back to the client that generate the message itself.
 *
 * Parameters: 
 * @param messageReceived
 *            The message received.
 * 
 * @param callback
 *            A callback function that has to be called after everything is
 *            done, to send the reply back. This callback function accepts the
 *            following two parameters.
 * 
 * 			  The first one, as all Node-style callbacks, is an Error object. If it is null
 * 		      the operation is considered successful, otherwise it means that an error has
 * 		      occurred.
 * 
 * 			  The second parameters is the message to be sent back.
 * 
 * IMPORTANT NOTE: The callback MUST ALWAYS be called (also in case of error or
 * exception), and it must be called ONLY ONCE. Otherwise the request by Xtribe
 * remains open, or an exception is thrown which can result in the manager crash.
 */

function onReadyExample(messageReceived, callback) {
	// Log to Monitor data sent with 'ready' message.
	// For this example to work, you must have enabled Xtribe 'Enable user data sending' option for your experiment.
	// Please refer to documentation for details about sending user data along with 'ready' message.
	etsman.logToMonitor("Received ready message with data: " + etsman.prettyJson(messageReceived.params));

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
				 etsman.errIfEmpty(messageReceived.params);
				 etsman.errIfEmpty(messageReceived.params.data);
				 
				 // Read asynchronously the user's saved data in our database
				 readUser(messageReceived.clientId, callback);
			 }, 
			 function(user, callback) {
			 	 // Collecting a subset of the user data available in the 'ready' message
			 	 // needed by our game and add them to our custom user object enriched in
			 	 // the readUser function with custom user data
			 	 if (messageReceived.params.data) { 
				 	user.spoken_languages = messageReceived.params.data.spoken_languages;
				 	user.birth_date = messageReceived.params.data.birth_date;
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
			points : 200,
			level : 2
	};
	
	if (etsman.isEmpty(user))
		return callback('user_not_found'); 
		// If you call the callback in more than one place, you must be certain
		// that you cannot call it twice, so better prepend a 'return'
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