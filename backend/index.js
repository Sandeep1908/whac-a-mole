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

const connectedUser = new Map();
let waitingUser=null
 

io.on("connection", (socket) => {


  //Multiplayer

  socket.on('userjoining',async(data)=>{

    if(!waitingUser){
      waitingUser=data
      io.emit('userjoined',{currentUser:data.userId,room:data.roomId})
    }
    else{
      const currentuserId=waitingUser.userId
      const roomId=waitingUser?.roomId || data.roomId
      const opponentId=data.userId
      socket.join(roomId)

      socket.emit('playerjoined')
      io.emit('userjoined',{currentUser:currentuserId,opponentUser:opponentId,room:roomId})

      waitingUser=null
      
    }



  })

  


   


  //Singleplayer

  socket.on("singleplayer", (data) => {
    const username = data;
    connectedUser.set(socket.id, username);
    socket.emit("gamestart", username);
  });

  socket.on("scoreupdate", (data) => {
    socket.emit("scoreupdate", data.score);
  });


  socket.on("disconnect", () => {
    connectedUser.delete(socket.id);
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server" });
});

httpServer.listen(PORT, () =>
  console.log(`server is up and running at ${PORT}`)
);
