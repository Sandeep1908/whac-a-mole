import React, { useEffect, useState } from 'react'
import getRandomNumber from '../utils/getRandomNumber'
function Main() {
     
    const [currentWhac,setCurrentWhac]=useState()
    const [intervalId,setIntervalId]=useState(null)

  

    const handleStart=()=>{
           
    const id=setInterval(() => {
            const randNo=getRandomNumber()
            setCurrentWhac(randNo)
            
        }, 1000);

    setIntervalId(id)

    }

    const handleStop=()=>{
        clearInterval(intervalId)
        setIntervalId(null)
    }

    const handleReset=()=>{
       setCurrentWhac(null)
    }
    
    
    
 

  
   const handleWhacClicked=(idx)=>{
    if(idx==currentWhac){
        console.log("right")
    }
    
    else{
        console.log("wrong")
    }

}
    

    
  return (
    <div className='w-full h-screen'>
    

            <div className='w-full h-full flex justify-center items-center'>
                <div className='flex justify-center items-center flex-col'>

      
                    <div className='w-full'>
                    <h1 className='text-2xl text-center uppercase font-bold'>Whac a mole</h1>
                    </div> 

                    <div className='w-full h-full bg-green-500 grid grid-cols-3'>
                        {[...Array(9).keys()].map((idx)=>{
                            return(
                                <div 
                                key={idx} 
                                className={`w-32 h-32 border  ${currentWhac===idx?'bg-red-500':''}`}
                                onClick={()=>handleWhacClicked(idx)}
                                ></div>
                            )
                        })}

                       
                       
                    </div>

                    <div className='w-full flex justify-center items-center gap-5 pt-10'>
                        <button className='w-20 h-10 bg-blue-500 text-white rounded-md' onClick={()=>handleStart()}>
                            Play
                        </button>

                        <button className='w-20 h-10 bg-red-500 text-white rounded-md' onClick={()=>handleStop()}>
                            Pause
                        </button>

                        <button className='w-20 h-10 bg-green-500 text-white rounded-md' onClick={()=>handleReset()}>
                            Reset
                        </button>


                    </div>


                    </div>
            </div>
    </div>
  )
}

export default Main