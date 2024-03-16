const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
app.use(cors()); 
const io = new Server(server,{
    cors:{
        origin:process.env.ORIGIN,
        methods:["GET","POST"],
    },
});

const connectedUsers = new Map();

io.on('connection', (socket) => {
    //Join Room
    socket.on("Join_Room",(data)=>{
        socket.join(data.room);
        socket.to(data.room).emit('Receive_message',data);
        connectedUsers.set(socket.id, { name: data.name  , room:data.room});
    });
    // Listen for messages from the client
    socket.on('Send_message', (data) => {
        socket.to(data.room).emit('Receive_message',data);
    });

    // User disconnect
    socket.on('disconnect', () => {
        try{
        const data={
            name:connectedUsers.get(socket.id).name,
            room:connectedUsers.get(socket.id).room,
            time:new Date(Date.now()).getHours()+ ":" + new Date(Date.now()).getMinutes(),
            message:connectedUsers.get(socket.id).name + ' Left the chat'
        }
        socket.to(data.room).emit('Receive_message',data);
        connectedUsers.delete(socket.id);
        }
        catch{
            console.log('error');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
