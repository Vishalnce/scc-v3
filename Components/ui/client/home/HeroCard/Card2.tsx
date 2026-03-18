import Image from "next/image";
import React from "react";

function Card2() {
  return (
    <div className="bg-gradient-to-r from-[#289AA2] to-[#8CD6DB] rounded-2xl shadow pb-5 relative  md:min-h-[380px] ">
      {/* main div */}

      <div className="flex flex-row items-center justify-center max-md:justify-start md:pt-10 pt-6 md:px-6 px-3">
        {/* text */}
        <div className=" flex flex-col  justify-between items-start md:gap-6 w-[70%] max-md:w-[70%]   ">
          <p className="text-4xl max-md:text-lg text-white font-montserrat font-semibold">
            Conquer SSC CGL{" "}
            <span className="max-md:hidden">
              with Our Power-Packed Test Series
            </span>
          </p>

          <p className="text-white text-xl max-md:text-sm max-md:pt-2 max-md:leading-4">
            Sharpen Your Skills and Track Your Progress with Realistic Mock
            Tests
            <span className="max-md:hidden">
              {" "}
              Designed for SSC CGL Excellence.
            </span>
          </p>

          <div className="flex flex-row max-md:items-center max-md:justify-center gap-2 w-full  pt-4">
            <button className="md:mt-6  bg-[#FFFFFFCC] md:text-xl md:px-12 px-2 py-2 rounded-2xl font-semibold max-sm:text-sm whitespace-nowrap">
              <p className=" ">Mock Test</p>
            </button>

            <button className="md:mt-6 bg-[#FFFFFFCC] md:text-xl md:px-12 py-2 rounded-2xl font-semibold max-md:px-2  max-sm:text-sm whitespace-nowrap">
              <p>Test Series</p>
            </button>
          </div>
        </div>

        {/* image */}
        <div className="w-[20%] max-md:w-[35%] max-md:absolute right-0 bottom-4">
          <Image
            src="/ui/client/home/Hero/boy1.png"
            width={300}
            height={300}
            alt="hero"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Card2;
