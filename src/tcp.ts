import fs from 'fs';
import tls from 'tls';
import net from 'net';

const UNSECURE_PORT = 9000;
const SECURE_PORT = 9001;

// Load SSL certificate (for WSS)
const sslOptions = {
    key: fs.readFileSync('./certs/key.pem'),  // Private key
    cert: fs.readFileSync('./certs/cert.pem') // Certificate
};

const tcpServer = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        console.log('Received:', data.toString());
        socket.write('Hello from server!');
    });

    socket.on('end', () => console.log('Client disconnected'));
});

const tlsServer = tls.createServer(sslOptions, (socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        console.log('Received:', data.toString());
        socket.write('Hello from server!');
    });

    socket.on('end', () => console.log('Client disconnected'));
});

tcpServer.listen(UNSECURE_PORT, () => console.log(`TCP Server running on port ${UNSECURE_PORT}`));
tlsServer.listen(SECURE_PORT, () => console.log(`TLS Server running on port ${SECURE_PORT}`));
