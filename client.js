const net = require('net');
const client = new net.Socket();
const port = 80;
const host = 'https://test1-ejhl.onrender.com/';

client.connect(port, host, function() {
    console.log('Connected');
    client.write("Hello From Client 1");
});


client.on('data', function(data) {
    console.log('Server Says : ' + data);
    setTimeout(() => {
	client.write("Hello From Client 1");
    }, 3000);

});


client.on('close', function() {
    console.log('Connection closed');
});

