import express from 'express';
import WebSocket, { WebSocketServer } from 'ws';
const app = express();
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
const wss = new WebSocketServer({ server });
// Handle new client connections
wss.on('connection', (ws) => {
    console.log('New client connected!', wss.clients.size);
    // Send a message to the client
    ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));
    // Listen for messages from the client
    ws.on('message', (data) => {
        const msgdata = data.toString();
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ message: `${msgdata}` }));
            }
        });
    });
    // Handle client disconnect
    ws.on('close', () => {
        console.log('Client disconnected.');
    });
});
