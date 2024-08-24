import express from "express"
import WebSocket, { WebSocketServer } from "ws"

const app = express()
const httpServer = app.listen(8080,() => {
    console.log('Server started on http://localhost:8080')
})

const wsServer = new WebSocketServer({ server: httpServer })

wsServer.on("connection", (ws) => { //ws: - a websocket connection instance
    ws.on("error", console.error)  //event registered to handle any error

    ws.on('message', (data,isBinary) => {  //event registered to handle any message received from client
        wsServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, {binary:isBinary});
            }
        });
    });

    ws.send('Hello! connected to wsServer!!');
})