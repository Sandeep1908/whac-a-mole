import React, { useEffect, useState } from "react";
import whac1 from "../assets/images/welcome/1.png";
import whac2 from "../assets/images/welcome/2.png";
import whac3 from "../assets/images/welcome/3.png";
import socket from "../socket.io/socket";
import { getUserId } from "../utils/getUserId";
import {useNavigate} from 'react-router-dom'
import getRandomNumber from "../utils/getRandomNumber";
import { toast } from "react-toastify";

function Multiplayer() {
  const [username,setUsername]=useState('')
  const [waiting,setWaiting]=useState(false)
  const navigate=useNavigate()
  const [roomId,setRoomId]=useState('')

useEffect(()=>{
  socket.on('playerjoined',()=>{
    navigate('/multi-player-game')
  })
},[socket])
  
  const handleJoin=()=>{  
    const userId=getUserId()
    const roomId=userId+"-"+getRandomNumber()
    setRoomId(roomId)
      socket.emit('userjoining',{userId,roomId})
      setWaiting(true)

  }


  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex flex-col justify-center space-y-5 items-center bg-[#AFE57F]">
        <div className="w-96">
          <img src={whac1} alt="whac-1" />
          <img src={whac2} alt="whac-2" />
          <img src={whac3} alt="whac-3" />
        </div>
 
        <div>
          <input
            type="text"
            placeholder="username"
            className="p-3 w-full rounded-md bg-[#022D11] text-white"
            onChange={(e)=>setUsername(e.target.value)}
          />
        </div>

        <div>
          <button
           className="p-3 w-full rounded-md bg-[#022D11] text-white"
           onClick={()=>handleJoin()}
           >
            Join
          </button>
        </div>

        {waiting?<h1>Waiting to join another player</h1>:''}
        {roomId?`please use this roomId to join ${roomId} `:''}
      </div>
    </div>
  );
}

export default Multiplayer;
