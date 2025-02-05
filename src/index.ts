import fs from 'fs';
import http from 'http';
import https from 'https';
import WebSocket, { WebSocketServer } from 'ws';

// Load SSL certificate (for WSS)
const sslOptions = {
    key: fs.readFileSync('./certs/key.pem'),  // Private key
    cert: fs.readFileSync('./certs/cert.pem') // Certificate
};

// Create an HTTP server (for WS)
const httpServer = http.createServer();
const wsServer = new WebSocketServer({ server: httpServer });

// Create an HTTPS server (for WSS)
const httpsServer = https.createServer(sslOptions);
const wssServer = new WebSocketServer({ server: httpsServer });

// WebSocket event handlers (common function for both servers)
const handleConnection = (ws, type) => {
    console.log(`New ${type} connection established!`);

    ws.on('message', (message) => {
        console.log(`Received message on ${type}:`, message.toString());
        ws.send(`Echo from ${type}: ${message}`);
    });

    ws.on('close', () => {
        console.log(`${type} connection closed.`);
    });
};

// Attach connection event for unsecure WebSocket (WS)
wsServer.on('connection', (ws) => handleConnection(ws, 'WS'));

// Attach connection event for secure WebSocket (WSS)
wssServer.on('connection', (ws) => handleConnection(ws, 'WSS'));

// Start servers
const WS_PORT = 8080;
const WSS_PORT = 8443;

httpServer.listen(WS_PORT, () => {
    console.log(`Unsecure WebSocket (WS) server running on ws://localhost:${WS_PORT}`);
});

httpsServer.listen(WSS_PORT, () => {
    console.log(`Secure WebSocket (WSS) server running on wss://localhost:${WSS_PORT}`);
});
