/**
 * Xtribe Games Manager Framework
 * Module 'etsman' includes several utilities to build a manager for an Xtribe experiment.
 */

/* TODO
- errore trovato da pietro (quello nel modulo per cui la risposta al ready viene inviata con "system" come recipient e quindi al client nn arriva)
- pagina html settings e unire pagina test al monitor
- authentication on monitor*/

// Import our library! Every utility will be available as etsman.functionName. Please refer
// to documentation for details about available functions.
var etsman = require('etsman');

/** We start the manager passing the 'options' object. For all the available options refer to documentation.
 * 
 * You can specify the port on which to listen, a series of handlers for the
 * various kind of messages (onClientMessage, onPing, onInstance, onJoin,
 * onLeave, onReady, onOver, onDrop, onAbort, onEnd, onError), if to enable the
 * monitor service, and so on.
 */
var options = {
	port : 9000, 								//Your manager will be listening on this port E.g.: http://localhost:9000 (or http://yourServerAddress:9000)
	onClientMessage : onClientMessageExample, 	//Handler for client messages
	onReady : onReadyExample, 					//Handler for "ready" server message
	monitor : {							        //Monitor displays all the chain of messages exchanged between Xtribe, your manager and your clients to let you understand what is going on and to debug your code
		enabled : true, 						//Enable/disable monitor, it will be available by default on this link: http://localhost:9000/monitor (or http://yourServerAddress:yourPort/monitor)
		customLink : "myMonitor" 	            //You can customize the link to be http://localhost:9000/myMonitor (or http://yourServerAddress:yourPort/myMonitor)
	},
	debugSender : {							    //Send messages directly to your manager to debug it
		enabled : true, 						//Enable/disable debug sender, it will be available by default on this link: http://localhost:9000/monitor (or http://yourServerAddress:yourPort/debugSender)
		customLink : "mySender" 	            //You can customize the link to be http://localhost:9000/mySender (or http://yourServerAddress:yourPort/mySender)
	}							                
};
etsman.startManager(options);

/**
 * An example of a simple handler for client messages.
 * 
 * All the handlers must accept the same two parameters as described here.
 * 
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
	console.log("received message from user: " + message.clientId);
	console.log("data received: " + etsman.prettyJson(message.params));
	try {
		etsman.errIfEmpty(message.topic); // throws an exception in case the
											// object is null or empty

		var outTopic = "nothing";

		switch (message.topic) {
			case 'say':
				outTopic = "hello";
				// do something
				break;

			case 'wave':
				outTopic = "goodbye";
				// do something
				break;

		}

		var outMessage = {
			topic : outTopic,
			params : {
				'foo' : 'bar'
			}
		};

		//we call the callback function passing null as error (everything is ok) and the message object
		callback(null, outMessage);

	} catch (err) {
		// we catch any thrown exception so we are sure to call the callback
		// function (to which we pass the error as the first parameter)
		callback(err);
	}
}

/**
 * An example of a simple handler for the 'ready' system message.
 * 
 * In this example you can see some useful features you can use.
 * 
 * @param message
 * @param callback
 */
function onReadyExample(message, callback) {
	console.log("received ready message with data: " + etsman.prettyJson(message.params));

	/*
	 * Utility function similar to async.waterfall, with exception handling.
	 * 
	 * Runs the tasks array of functions in series, each passing their results
	 * to the next in the array. However, if any of the tasks pass an error to
	 * their own callback, the next function is not executed, and the main
	 * callback is immediately called with the error.
	 * 
	 * See https://github.com/caolan/async
	 * 
	 * This useful library is included in etsman and exported as etsman.async,
	 * so you can use for example etsman.async.each(arr, iteratee, [callback])
	 */
	etsman.tryWaterfall(
			[
			 function(callback) {
				 /*
				  * if empty this throws an exception which is caught by the tryWaterfall
				  * method, which then calls the callback passing the caught error, thus stopping
				  * the waterfall and sending immediately the response (which will include the error)
				  */
				 etsman.errIfEmpty(message.params);
				 etsman.errIfEmpty(message.params.data);
				 
				 // we read asynchronously the user's saved data in our database
				 readUser(message.clientId, callback);
				 
			 }, 
			 function(user, callback) {
				 user.spoken_languages = message.params.data.spoken_languages;
				 user.birth_date = message.params.data.birth_date;
				 saveUser(user, callback);
			 }, 
			 function(user, callback) {
                 var outMessage = {
                         userdata: user
                 };
                 callback(null, outMessage);
			 }
			 ], callback);
}

function readUser(clientId, callback) {
	etsman.errIfEmpty(clientId);
	//read the user data...
	var user = {
			clientId : clientId,
			points : 300,
			level : 2
	};
	
	if (etsman.isEmpty(user))
		return callback('user_not_found'); 
		// if you call the callback in more than one place, you must be certain
		// that you cannot call it twice, so better prepend a nice 'return'
		// statement
	
	
	//...and send it to the caller
	callback(null, user);
}

function saveUser(user, callback) {
	user.lastseen = new Date();
	//save the user
	
	//call the callback
	callback(null, user);
}
