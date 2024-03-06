import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectDB from "./db/connections.js";

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

connectDB();

// const connectedUser = new Map();

const rooms = {};

io.on("connection", (socket) => {
  //Multiplayer

  socket.on("join-game", ({ userId, roomId }) => {
    console.log("roomId",roomId)
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = { players: {} };
    }
    rooms[roomId].players[socket.id] = { id: userId, score: 0 };
    io.to(roomId).emit("room-info", { rooms: rooms[roomId], userId });
  });





  socket.on("scoreUpdate", (roomId, playerId, score) => {
     
    if (rooms[roomId] && rooms[roomId].players[socket.id]) {
      rooms[roomId].players[socket.id].score = score;

      io.to(roomId).emit("opponentScoreUpdate", {
        rooms: rooms[roomId]
      });
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

  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      if (rooms[roomId].players[socket.id]) {
        const user=rooms[roomId].players[socket.id]
        delete rooms[roomId].players[socket.id];

        if (Object.keys(rooms[roomId]).length === 0) {
          delete rooms[roomId];
        } else {
          io.to(roomId).emit("room-info", { rooms: rooms[roomId] });
          io.emit('user-disconnected',user)
        }

        break;
      }
    }
    console.log("Client disconnected");
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server" });
});

httpServer.listen(PORT, () =>
  console.log(`server is up and running at ${PORT}`)
);
