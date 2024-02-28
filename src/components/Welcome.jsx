import React from "react";
import whac1 from "../assets/images/welcome/1.png";
import whac2 from "../assets/images/welcome/2.png";

import whac3 from "../assets/images/welcome/3.png";
import whac from "../assets/images/welcome/mole.png";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex flex-col justify-center space-y-5 items-center bg-[#AFE57F]">
        <div className="w-96">
          <img src={whac1} alt="whac-1" />
          <img src={whac2} alt="whac-2" />
          <img src={whac3} alt="whac-3" />
        </div>

        <div className="w-96 flex justify-center items-center overflow-hidden">
          <img src={whac} alt="whac" className="w-32 h-32 whac-animation" />
        </div>

        <div>
          <Link to={"/mode"}>
            <button className="p-3 w-20 rounded-md bg-[#022D11] text-white">
              Start
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
