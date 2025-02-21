import React from "react";

import roundele from "../../../assets/round elemnet.svg";
import fifty from "../../../assets/Group 130.svg";
import eq1 from "../../../assets/eq-1.svg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex bg-[#FCF5FE] w-full h-[500px]">
      <div className="pt-[5%] pl-[10%] w-[50%] h-[500px] ">
        <p className={` text-[#FB2E86] text-[20px] font-[500]`}>
          Best Mechanical Equipment
        </p>

        <p className="text-[2.5rem] text-[#000] font-[500] font-JosefinSans">
          New Equipments Available at 50% off !
        </p>

        <p className=" mt-2 text-[1.1rem]  text-[#8A8FB9] font-[200]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          quisquam voluptates dolore quasi odio earum facere autem. Eos
          perspiciatis magni ducimus tempora quo et
        </p>

        <div className="w-[150px] bg-[#FB2E86] mt-8 h-[50px] flex items-center justify-center rounded-[2px] cursor-pointer">
          <Link to="/product">
            <h1 className="text-[#fff] flex items-center">Shop now</h1>
          </Link>
        </div>
      </div>

      {/* left side text ends */}

      <div className=" w-[50%] h-[500px]">
        <div className="pt-[5%] pl-[10%] ">
          <img
        src={roundele}
        alt=""
        className=" absolute w-[30%]"
      />
    
      <img
        src={fifty}
        alt=""
        className=" absolute w-[90px] ml-[22%]"
      />
      <img
        src={eq1}
        alt=""
        className="absolute w-[25%] ml-[1%] mt-[5%]"
      />

        </div>
      </div>
    </div>
  );
};

export default Hero;
