// Xtribe manager API

/**
 * Module etsman includes various utilities in addition to the main method 'startManager' (see below).
 * 
 * It exports the useful library async (https://github.com/caolan/async -> provides straight-forward, 
 * powerful functions for working with asynchronous JavaScript)
 * 
 * on etsman.async
 * 
 * and the library lodash (https://lodash.com/ -> learn how to take the hassle out of working 
 * with arrays, numbers, objects, strings, etc!) 
 * 
 * on etsman._
 * 
 * so you don't have to include them again.
 * 
 * Useful methods you can find are:
 * 
 * - etsman.tryWaterfall(functions, callback) see below for an explanation
 * 
 * - etsman.userError(errorString) to stop execution and send back a user error
 * 
 * - etsman.nothingFound() to stop execution and send back a 'nothingfound' error
 * 
 * - etsman.exitIfEmpty(obj) to stop execution and send back a 'nothingfound' error if the object is empty
 * 
 * - etsman.exitIfNull(obj) to stop execution and send back a 'nothingfound' error if the object is strictly null
 * 
 * - etsman.errIfEmpty(obj) to stop execution and send back an 'empty object' error if the object is empty
 * 
 * - etsman.errIfNull(obj) to stop execution and send back an 'null object' error if the object is strictly null
 * 
 * - etsman.isEmpty(obj) to check if an object is empty (returns true or false)
 * 
 * - etsman.prettyJson(obj) to format an object in a readable JSON
 * 
 */
var etsman = require('etsman');

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

function readUser(userId, callback) {
	etsman.errIfEmpty(userId);
	//read the user data...
	var user = {
			userId : userId,
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

var options = {
	port : 9000, //port on which to listen
	onClientMessage : onClientMessageExample, //handler for client messages
	onReady : onReadyExample, //handler for "ready" server message
	monitor : {
		enabled : true, //create monitor website
		dir : "/monitor" //serve it on this directory (http://localhost:9000/monitor)
	},
	testSiteDir : "/test" //create a directory with tests for the manager (http://localhost:9000/test)
};

/**
 * We start the manager passing the options object. For all the possible
 * recognized options properties see the etsman.js file in the etsman package.
 * 
 * You can specify the port on which to listen, a series of handlers for the
 * various kind of messages (onClientMessage, onPing, onInstance, onJoin,
 * onLeave, onReady, onOver, onDrop, onAbort, onEnd, onError), if to enable the
 * monitor service, etc.
 * 
 * All of the handler functions must receive two parameters (as described in the
 * example above): the incoming message and a callback to be called on
 * completion.
 */
etsman.startManager(options);
