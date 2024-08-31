"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wsServer = new ws_1.WebSocketServer({ port: 8080 });
let senderSocker = null;
let receiverSocker = null;
wsServer.on("connection", (ws) => {
    ws.on("error", (error) => {
        console.error(error);
    });
    ws.on("message", (msg) => {
        const message = JSON.parse(msg.toString());
        if (message.type === "sender") {
            senderSocker = ws;
        }
        else if (message.type === "receiver") {
            receiverSocker = ws;
        }
        else if (message.type === "createOffer") {
            if (ws !== senderSocker)
                return;
            receiverSocker === null || receiverSocker === void 0 ? void 0 : receiverSocker.send(JSON.stringify({ type: "createOffer", sdp: message.sdp }));
        }
        else if (message.type === "createAmswer") {
            if (ws !== receiverSocker)
                return;
            senderSocker === null || senderSocker === void 0 ? void 0 : senderSocker.send(JSON.stringify({ type: "createAmswer", sdp: message.sdp }));
        }
        else if (message.type === "iceCandidate") {
            if (ws === senderSocker) {
                receiverSocker === null || receiverSocker === void 0 ? void 0 : receiverSocker.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }));
            }
            else if (ws === receiverSocker) {
                senderSocker === null || senderSocker === void 0 ? void 0 : senderSocker.send(JSON.stringify({ type: "iceCandidates", candidate: message.candidate }));
            }
        }
    });
    ws.send(JSON.stringify({ message: "Hello from server" }));
});
