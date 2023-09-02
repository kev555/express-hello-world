const net = require('net');
const port = process.env.PORT || 3001;

const server = net.createServer();
server.listen(port, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

var allow_list = ['184.22.5.56', '110.168.248.105', '146.190.96.130'];

let sockets = [];

server.on('connection', function(sock) {
    if (allow_list.indexOf(sock.remoteAddress) < 0) {
        sock.destroy();
        return;
    }
    console.log('connection from IP: ' + sock.remoteAddress + ' Port: ' + sock.remotePort);
    sockets.push(sock);

    sock.on('data', function(data) {
        console.log('Data from IP: ' + sock.remoteAddress + 'Port:: ' + sock.remotePort + '    Data: ' + data);
        // Write the data back to all the connected, the client will receive it as data from the server
        //sockets.forEach(function(sock, index, array) {
            sock.write("hello from server") //sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        //});
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
});
