// Xtribe manager API
var etsman = require('etsman');

/* 
  startManager parameters:
    port: your manager will be available on this port
    system message callback: callback for managing system messages
    experiment message callback: callback for managing your own experiment messages
    debug mode: true or false to run it in debug mode
*/
etsman.startManager(11345, catchSystemMessage, catchExperimentMessage, true);

// Manage messages coming from the system. Please refer to xtribe API for details about messages.
function catchSystemMessage(response, message) {
    console.log("System message received: "+message.topic+" "+JSON.stringify(message)); 
}

// Manage messages relative to the experiment. Please refer to xtribe API for details about messages.
function catchExperimentMessage(response, message) { 
    console.log("Experiment message received: "+message.topic+" "+JSON.stringify(message)); 

    // Send a reply message to the client that sent a message, triggering this function
    var outMessage = {
      recipient:    'client',
      instanceId:   message.instanceId,  // id of the current game instance
      clientId:     message.clientId,    // id of the current client
      //broadcast:    true,              // sends the message to all clients partecipating the instance
      //includeSelf:  true,              // includes (or not) the current client in the broadcast
      topic:        'some_topic',        // a custom topic, or a system topic
      params:       'some_data'          // sends data along with message
    };
    response.json(outMessage);  
}
