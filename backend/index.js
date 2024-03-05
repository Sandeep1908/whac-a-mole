import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectDB from './db/connections.js';
import { getUserId } from './utils/getUserId.js';
import { User } from './models/user.models.js';

const app = express();
const PORT = 8080;
const httpServer = createServer(app);
app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

connectDB()

// const connectedUser = new Map();
 
 
 
const rooms = {};
const score={}
io.on("connection", (socket) => {


  //Multiplayer 

  socket.on('join-game',({userId,roomId})=>{
    socket.join(roomId)
    if(!rooms[roomId]){
      rooms[roomId]={players:{},}
    }
    
    rooms[roomId].players[socket.id]={id:userId}
    io.to(roomId).emit('room-info',{rooms:rooms[roomId],userId})

  })
  

  


  socket.on('scoreUpdate', (roomId, playerId, score) => {
    
    rooms[roomId].players[socket.id].score = score;
    
 
    const opponentId = Object.keys(rooms[roomId].players).find(id => id !== socket.id);
    if (opponentId) {
      io.to(opponentId).emit('opponentScoreUpdate', score);
    }
  });
  


   


  //Singleplayer

  socket.on("singleplayer", (data) => {
    const username = data;
    socket.emit("gamestart", username);
  });

  socket.on("scoreupdate", (data) => {
    socket.emit("scoreupdate", data.score);
  });


  socket.on('disconnect', () => {
   
    const roomId = socket.roomId;
    if (roomId) {
     
      const room = rooms[roomId];
      if (room && room.players[socket.id]) {
      
        delete room.players[socket.id];
        
        io.to(roomId).emit('roomInfo', room);
      }
    }
    console.log('Client disconnected');
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server" });
});

httpServer.listen(PORT, () =>
  console.log(`server is up and running at ${PORT}`)
);
