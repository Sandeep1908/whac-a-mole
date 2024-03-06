import React, { useEffect, useId, useMemo, useState } from "react";
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
  const [opponent, setOpponent] = useState([]);

  const [localScore, setLocalScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [waiting, setIsWaiting] = useState(null);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const host = window.location.host;
    const path = location.pathname;
    setRoomUrl(host + path);
  }, []);

  useEffect(() => {
    socket.on("room-info", ({ rooms, userId }) => {
       
      const opponents = Object.values(rooms.players).filter(
        (item) => item?.id !== localStorage.getItem("userId")
      );
       
   

      if (opponents.length >= 1) {
        setIsWaiting(false);
        setRoomJoined(true);
        setInterval(() => {
            const no=getRandomNumber()
            setCurrentWhac(no)
        }, 1000);
      } else {
        setIsWaiting(true);
      }
    });

    socket.on('opponentScoreUpdate',({rooms})=>{
      const opponents = Object.values(rooms.players).filter(
        (item) => item?.id !== localStorage.getItem("userId")
      );
      setOpponent(opponents);

    })

    socket.on("user-disconnected", (data) => {
      console.log('user Dissconnected',data)
    });
  }, [opponent.length]);

  const handleJoinRoom = () => {
    const userId = localStorage.getItem("userId");
    const roomId = location.pathname;
    socket.emit("join-game", { userId, roomId });
    setIsWaiting(true);
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
            <h1>Time:{timer}</h1>
            <p>Room name: {roomUrl}</p>
            <p>Your score :{localScore} You :{localStorage.getItem('userId')}</p>
            {opponent?.map((item, id) => {
              return (
                <h1 key={id}>
                  Opponent {id} --- {item.id} Score:-- {item.score}
                </h1>
              );
            })}

            {/* {opponent && (
              <p>
                Opponent Id:{opponent} opponent score:{opponentScore} your
                score:{localScore}{" "}
              </p>
            )} */}

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
        </div>
      </div>
    </div>
  );
}

export default Main;
