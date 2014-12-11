require('util-log-timestamp');

var net = require('net'),
  sys = require('sys')
,sqs = require('./sqs.js');
    ;


// Keep track of the device clients
var clients = {};

// An incremental id to assign a particular socket identify 
var clientId = 1000000 

// A counter for tracking no of clients
var noOfClients = 0;

// A list of all sockets for devices
var deviceSockets = {};

// Cleans the input of carriage return, newline
var cleanInput = function (data) {
  return data.toString().replace(/(\r\n|\n|\r)/gm,"");
};

var performOperation = function(message, socket) {

  // Create a domain for exception handling
  var domain = require('domain').create();

  // For logging message 
  // logMessage(message.toString());
  console.log(message.toString());


  domain.on('error', function(err) {
    sys.puts("Data Error for " + socket.name + " : "  + err.message + '\n' + err.stack);
    domain.dispose();
  });

domain.run(function () 
	{
		sqs.sendMessage(message);
	});
};

// Deletes a client from clients and deviceSockets
var deleteClient = function(socket) {
  var client = clients[socket.id];
  if (client) {
      sys.puts(client.name + " disconnected, total connections " + (--noOfClients));
      if (client.deviceId && deviceSockets[client.deviceId][client.id]) {
        delete deviceSockets[client.deviceId][client.id];
        deviceSockets[client.deviceId].count--;
        if (deviceSockets[client.deviceId].count <= 0) delete deviceSockets[client.deviceId];
      }
      delete clients[socket.id];
  }
};

// Start a TCP Server
var tcpServer = net.createServer(function (socket) {
 
  // Identify this client by name
  socket.name = socket.remoteAddress + ":" + socket.remotePort 

  // Identify this clinet by an id
  socket.id = ++clientId; 

  // Increment noOfClients 
  noOfClients++;

  // Set lastseen for debugging purpose
  socket.lastSeen = new Date();

  // Put this new client in the list
  clients[socket.id] = socket;
  
  // Set content encoding to UTF8, to avoid conversion
  socket.setEncoding('utf8');

  // Log on console about its connection
  console.log(socket.name + " connected , total connections " + noOfClients);
  
  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    if (data && data.toString() == 'exit\r\n') {
      socket.end();
    } else {
      // Set lastseen for debugging purpose
      socket.lastSeen = new Date();

      // add data in Appacitive 'data' schema
      performOperation(data, socket);
    }
  });
 
  // Remove the client from the list when it leaves
  socket.on('end', function () {
    //delete client from clients
    deleteClient(socket);
  });

  // Error handling for sockets
  socket.on("error", function(err) {
    console.log("Caught socket error for " + socket.name);
    console.log(err.stack);

    // Destroy socket
    socket.destroy();

    //delete client from clients
    deleteClient(socket);
  });

  // Send socket alive every 45 seconds
  socket.setKeepAlive(true, 45000);

  // Set idle timeout to 1800000 (30 minutes)
  socket.setTimeout(1800000);

  // Timeout handling for scokets
  socket.on("timeout", function() {
    sys.puts(socket.name + " timed out");

    // Destroy socket
    socket.destroy();

    //delete client from clients
    deleteClient(socket);
  });
 
  // Close signal from client side
  socket.on("close", function() {
    sys.puts(socket.name + " close signal received");

    // Destroy socket
    socket.end();

    //delete client from clients
    deleteClient(socket);
  });
  
  
});

tcpServer.on('error', function(e) {
  sys.puts("\n\nTCP server error " + e.message + "\n Stack: " + e.stack + "\n\n");
});

// Start listening on port 8086
tcpServer.listen(8086);
 
console.log("TCP Server running at port 8086");