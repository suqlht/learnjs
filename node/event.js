var events = require('events')
   , net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};
channel.on('join', function(id, client){
  var welcome = 'welcome!, guests on line:' + this.listeners('broadcast').length;
  client.write(welcome);
  this.clients[id] = client;
  this.subscriptions[id] = function(senderid, message){
    if(id != senderid){
      this.clients[id].write(senderid + ':' + message);
    }
  }
  this.on('broadcast', this.subscriptions[id]);
  //console.log('cnnected');
});

channel.on('leave', function(id){
  channel.removeListener('broadcast', this.subscriptions[id]);
  channel.emit('broadcast', id, id + " has left the chat.\n");
});

var server = net.createServer(function(client){
  var id = client.remoteAddress + ':' + client.remotePort;
  channel.emit('join', id, client);
  // client.on('connection', function(sock){
  //   channel.emit('join', id, client);
  //   });
  client.on('data', function(data){
    data = data.toString();
    channel.emit('broadcast', id, data);
  });
  client.on('close', function(){
    channel.emit('leave', id);
  });
});

server.listen(8888);
