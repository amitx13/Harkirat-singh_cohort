const app = require('express')(); //express app
const server = require('http').createServer(app); //http server from nodejs
const io = require('socket.io')(server); //node.js server is connected to socket.io server

io.on("connection",(socket)=>{ //connection
    socket.on("chat",(payload)=>{ //event
        io.emit("chat",payload); //event - broadcast
    })
})

server.listen(3000);