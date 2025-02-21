import React from "react";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png"
import img3 from"../../assets/img3.png";
import img4 from"../../assets/img4.png";
import img5 from"../../assets/img5.png";


const TrendProdCard2 = () => {
  return (
    <div className="grid grid-cols-3 gap-[61px] mt-[40px]  ">
      <div className="bg-[#FEF6FB] w-[385px] h-[250px] p-[20px]">
        <h2 style={{ fontSize: "30px", color: "#111772", fontWeight: "bold" }}>
          15% off on all products
        </h2>
        <span
          className="underline"
          style={{ fontSize: "18px", color: "#F06BA1" }}
        >
          Shop Now
        </span>
        <img
          src={img1}
          alt=""
          className="float-right w-[180px] p-[5%]"
        ></img>
      </div>
      <div className="bg-[#EEEFFA]  w-[385px] h-[250px] p-[20px]">
        <h2 style={{ fontSize: "30px", color: "#111772", fontWeight: "bold" }}>
          25% off on all products
        </h2>
        <span
          className="underline"
          style={{ fontSize: "18px", color: "#F06BA1" }}
        >
          Shop Now
        </span>
        <img
          src={img2}
          alt=""
          className="float-right w-[180px] p-[5%] "
        ></img>
      </div>
      <div className="grid gap-5">
        {/* 1 */}
        <div className="flex w-[385px] h-[70px] shadow-sm">
          <div className=" w-[80px] m-[5px] h-[60px] bg-[#FCF5FE] p-[5px] flex justify-center">
            <img src={img3} alt="" className="w-[60px]"></img>
          </div>
          <div className=" m-[10px]">
            <h4 className="font-medium font-JosefinSans text-[#151875]">
              Dirt Plougher
            </h4>
            <span className="text-sm font-JosefinSans text-[#151875]">
              Rs. 6000
            </span>
          </div>
        </div>
        {/* 1 */}

        {/* 2*/}
        <div className="flex w-[385px] h-[70px] shadow-sm">
          <div className=" w-[80px] m-[5px] h-[60px] bg-[#FCF5FE] p-[5px] flex justify-center">
            <img src={img4} alt="" className="w-[40px]"></img>
          </div>
          <div className=" m-[10px]">
            <h4 className="font-medium font-JosefinSans text-[#151875]">
              Soil Scooper
            </h4>
            <span className="text-sm font-JosefinSans text-[#151875]">
              Rs. 1000
            </span>
          </div>
        </div>
        {/* 2 */}

        {/* 3 */}
        <div className="flex w-[385px] h-[70px] shadow-sm">
          <div className=" w-[80px] m-[5px] h-[60px] bg-[#FCF5FE] p-[5px] flex justify-center">
            <img src={img5} alt="" className="w-[60px]"></img>
          </div>
          <div className=" m-[10px]">
            <h4 className="font-medium font-JosefinSans text-[#151875]">
            Baler Tractor
            </h4>
            <span className="text-sm font-JosefinSans text-[#151875]">
              Rs. 8000
            </span>
          </div>
        </div>
        {/* 3 */}
      </div>
    </div>
  );
};

export default TrendProdCard2;
