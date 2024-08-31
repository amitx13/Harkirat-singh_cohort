import { WebSocket, WebSocketServer } from "ws";

const wsServer = new WebSocketServer({ port: 8080 })

let senderSocker: null | WebSocket = null
let receiverSocker: null | WebSocket = null

wsServer.on("connection", (ws) => {
    ws.on("error", (error) => {
        console.error(error)
    })
    ws.on("message", (msg) => {
        const message = JSON.parse(msg.toString())
        if(message.type === "sender"){
            senderSocker = ws
        }
        else if (message.type === "receiver"){
            receiverSocker = ws
        }
        else if (message.type === "createOffer"){
            if(ws !== senderSocker) return
            receiverSocker?.send(JSON.stringify({type:"createOffer", sdp:message.sdp}))
        }
        else if (message.type === "createAmswer"){
            if(ws !== receiverSocker) return
            senderSocker?.send(JSON.stringify({type:"createAmswer", sdp:message.sdp}))
        }
        else if (message.type === "iceCandidate"){
            if(ws === senderSocker){
                receiverSocker?.send(JSON.stringify({type:"iceCandidate", candidate:message.candidate}))
            }
            else if(ws === receiverSocker){
                senderSocker?.send(JSON.stringify({type:"iceCandidates", candidate:message.candidate}))
            }
        }
    }) 

    ws.send(JSON.stringify({ message: "Hello from server" }))
})