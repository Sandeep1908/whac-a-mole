import React from 'react'
import whac1 from '../assets/images/welcome/1.png'
import whac2 from '../assets/images/welcome/2.png'

import whac3 from '../assets/images/welcome/3.png'
import whac from '../assets/images/welcome/mole.png'


function Mode() {
  return (
    <div className='w-full h-screen'>

            <div className='w-full h-full flex flex-col justify-center space-y-5 items-center bg-[#AFE57F]'>

            <div className='w-96'>
                        <img src={whac1} alt="whac-1" />
                        <img src={whac2} alt="whac-2" />
                        <img src={whac3} alt="whac-3" />
                    </div>

                   
            <div>
                        <button className='p-3 w-full rounded-md bg-[#022D11] text-white'>Single Player</button>
                    </div>


                    <div>
                        <button className='p-3 w-full rounded-md bg-[#022D11] text-white'>Multiplayer</button>
                    </div>
            </div>
    </div>
  )
}

export default Mode