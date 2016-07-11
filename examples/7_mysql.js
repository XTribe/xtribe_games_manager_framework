/**
* Xtribe Games Manager Framework
* 
* Example 7: Using a MySQL database
* 
* Installing MySQL and prepare your db goes beyond the purposes of this tutorial, so it assumes you made already some preparations:
* 1) Install MySQL: please refer to http://dev.mysql.com/doc/refman/5.7/en/installing.html for information about installing a MySQL database.
* If you feel more comfortable with a graphical interface, you can use PhpMyAdmin https://www.phpmyadmin.net/ to create and easily manage your MySQL databases.
* 2) Create a database named 'xtribe_db'
* 3) Create a user 'xtribe_user' (password: 'xtribe_user_pwd'), having all privileges on 'xtribe_db', on the pc you're running the manager (localhost)
* 4) Create a table named 'xtribe_table' with three numeric field 'field_1', 'field_2', 'field_3'.
* Feel free to change all these values according to your needs, but don't forget to change the corresponding code, too.
* 
* Please refer to MySQL nodeJS library (https://github.com/mysqljs/mysql) for uses and capabilities of the object 'connection'.
* Let's go!
*
*/
var etsman = require('etsman');

var options = {
	port : 9007, 					// Your manager will be listening on this port E.g.: http://localhost:9007 (or http://yourServerAddress:yourPort)	
	onClientMessage : onClientMsg,	// Handler for client messages
	onReady : onReadyMsg,			// Handler for 'ready' system message
	monitor : {							        
		enabled : true 				// Enable/disable Monitor, it will be available by default on this link: http://localhost:9007/monitor (or http://yourServerAddress:yourPort/monitor)
	},
	debugSender : {							    
		enabled : true				// Enable/disable Debug Sender, it will be available by default on this link: http://localhost:9007/monitor (or http://yourServerAddress:yourPort/debugSender)
	}				                
};

// Connecting to database. Put here your database data: database host, database name, database user and database user password
var connection = etsman.connectToMysqlDb('localhost','xtribe_db','xtribe_user','xtribe_user_pwd');

etsman.startManager(options);

function onReadyMsg(message) {
	// On ready message, try to select data from a table and log them on the Debug Monitor
	connection.query('SELECT * FROM xtribe_table', function(err, rows, fields) {
	  if (err) throw err;
	  etsman.logToMonitor('xtribe_table content: ', rows);
	});
}

function onClientMsg(message) {
	// Let's try to insert data in database, taking them from a custom client message
	// Try to send a custom message from your client to the manager like this:
	// { 
	//	 "topic": "custom_data",
	//   "params": {
	//	   "field_1": 1,
	//	   "field_2": 2,
	//	   "field_3": 3,
	//    },
    // }
    // You can test this with your own client or using the Debug Sender.

    // Insert in xtribe_table data contained in our message params
	connection.query('INSERT INTO xtribe_table SET ?', message.params, function(err,res){
		if(err) throw err;
		etsman.logToMonitor('Last insert ID:', res.insertId);
	});
}



