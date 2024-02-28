import { useState } from "react";
import whac1 from "../../assets/images/welcome/1.png";
import whac2 from "../../assets/images/welcome/2.png";
import whac3 from "../../assets/images/welcome/3.png";
import socket from "../../socket.io/socket";
import {useNavigate} from 'react-router-dom'
 

function SinglePlayer() {
    const [username,setUsername]=useState(()=>{
        return localStorage.getItem('username') || ''
    })
    const navigate=useNavigate()
    const handleGameStart=()=>{
      setInterval(() => {
        localStorage.setItem('username',username)
        socket.emit('singleplayer',username)
        setUsername('')
        navigate('/sigleplayer-game')
      }, 1000);
     
     

     
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
            value={username}
            onChange={e=>setUsername(e.target.value)}
          />
        </div>

        <div>
          <button
           className="p-3 w-full rounded-md bg-[#022D11] text-white"
           onClick={()=>handleGameStart()}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default SinglePlayer;
