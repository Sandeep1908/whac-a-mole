import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [roomNo, setRoomNo] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [socketId, setSocketId] = useState();
  const [username, setUsername] = useState("");

  const socket = useMemo(() => io("http://localhost:8080"), []);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("User connected", socket.id);
    });

    socket.on("received-message", (data) => {
      console.log("receiived", data);
      setMessages((messages) => [...messages, data]);
    });

    socket.on("user-joined", (data) => {
      alert(`${data.username} is joined this room ${data.room}`);
    });
  }, []);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomNo) {
      socket.emit("join-room", { roomNo, username });
      setRoomNo("");
    }
  };

  const handleMessage = (e) => {
    e.preventDefault();

    socket.emit("message", { message, roomName, username });
    setMessage("");
  };
  return (
    <div className="w-full h-full">
      <div className="w-full   flex-col  pt-[100px] space-y-7  flex justify-center items-center">
        <h1>user Id:{socketId}</h1>
        <form action="" onSubmit={(e) => handleJoinRoom(e)}>
          <h1>join room</h1>
          <input
            type="text"
            placeholder="Message"
            className="p-5 border"
            onChange={(e) => setRoomNo(e.target.value)}
          />
          <input
            type="text"
            placeholder="username"
            className="p-5 border"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" className="w-20 h-10 bg-blue-500 ml-10">
            Join
          </button>
        </form>

        <form action="" onSubmit={(e) => handleMessage(e)}>
          <h1>Message</h1>
          <input
            type="text"
            placeholder="Message"
            className="p-5 border"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="text"
            placeholder="roomName"
            className="p-5 border"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button type="submit" className="w-20 h-10 bg-red-500 ml-10">
            send
          </button>
        </form>
      </div>

      <div>
        {messages?.map((item, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center"
            >
              <span>user:{item.user}</span>
              <p>{item.message}</p>;
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chat;
