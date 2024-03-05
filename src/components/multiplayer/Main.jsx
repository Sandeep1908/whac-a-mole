import React, { useEffect, useId, useState } from "react";
import getRandomNumber from "../../utils/getRandomNumber";

import { Bounce, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import socket from "../../socket.io/socket";
import { getUserId } from "../../utils/getUserId";

function Main() {
  const [currentWhac, setCurrentWhac] = useState();
  const [intervalId, setIntervalId] = useState(null);
  const [roomUrl, setRoomUrl] = useState("");
  const [roomJoined, setRoomJoined] = useState(false);
  const location = useLocation();
  const [opponent, setOpponent] = useState("");
 
  const [localScore, setLocalScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [waiting,setIsWaiting]=useState(null)

  useEffect(() => {
    const host = window.location.host;
    const path = location.pathname;
    setRoomUrl(host + path);
  }, []);

  useEffect(() => {
    console.log("opponent",opponent)
    socket.on("room-info", (data) => {
      const players = Object.values(data.rooms.players);
      
      if(players.length>=2){
        const opponent = players.find(
          (player) => player.id !== localStorage.getItem("userId")
        );
          
         
        if (opponent) {
          setOpponent(opponent?.id);
          setRoomJoined(true);
          setIsWaiting(false)
        
        }
      }
      
    });


    socket.on("opponentScoreUpdate", (score) => {
      setOpponentScore(score);
    });
  }, [opponent]);

  const handleJoinRoom = () => {
    const userId = localStorage.getItem("userId");
    const roomId = location.pathname;
    socket.emit("join-game", { userId, roomId });
    setIsWaiting(true)
  };

  const handleStart = () => {
    const id = setInterval(() => {
      const randNo = getRandomNumber();
      setCurrentWhac(randNo);
    }, 1000);
    setIntervalId(id);
  };

  const handleStop = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleReset = () => {
    setCurrentWhac(null);
  };

  const handleWhacClicked = (idx) => {
    if (idx === currentWhac) {
      setLocalScore(localScore + 1);
      // Emit score update to the server
      const userId = localStorage.getItem("userId");
      const roomId = location.pathname;
      socket.emit("scoreUpdate", roomId, userId, localScore + 1);
    } else {
      console.log("wrong");
    }
  };

  return (
    <div className="w-full h-screen">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="w-full h-full flex justify-center items-center">
        <div className="flex justify-center items-center flex-col">
          <div className="w-full">
            <h1 className="text-2xl text-center uppercase font-bold">
              Whac a mole
            </h1>
            <p>Room name: {roomUrl}</p>
           
            {opponent &&   <p>Opponent Id:{opponent} opponent score:{opponentScore} your score:{localScore} </p>}

            {waiting && <p>Waiting for oppnent...</p>}
          
          </div>
          <div></div>

          {roomJoined ? (
            <div className="w-full h-full bg-green-500 grid grid-cols-3 md:grid-cols-4">
              {[...Array(12).keys()].map((idx) => {
                return (
                  <div
                    key={idx}
                    className={`w-32 h-32 border  ${
                      currentWhac === idx ? "bg-red-500" : ""
                    } `}
                    onClick={() => handleWhacClicked(idx)}
                  ></div>
                );
              })}
            </div>
          ) : (
            <button
              className="w-20 h-10 bg-blue-500 text-white rounded-md mt-4"
              onClick={handleJoinRoom}
            >
              Join Room
            </button>
          )}

          <div className="w-full flex justify-center items-center gap-5 pt-10">
            <button
              className="w-20 h-10 bg-blue-500 text-white rounded-md"
              onClick={handleStart}
              disabled={!roomJoined}
            >
              Play
            </button>

            <button
              className="w-20 h-10 bg-red-500 text-white rounded-md"
              onClick={handleStop}
              disabled={!roomJoined}
            >
              Pause
            </button>

            <button
              className="w-20 h-10 bg-green-500 text-white rounded-md"
              onClick={handleReset}
              disabled={!roomJoined}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
