import Image from "next/image";
import React from "react";

function Card2() {
  return (
    <>
      {/* main div */}
      <div className="bg-gradient-to-r from-[#289AA2] to-[#8CD6DB] relative rounded-2xl shadow max-md:min-h-[170px] max-md:pt-1 md:min-h-[380px]">

        <div className="flex flex-row items-center max-md:justify-start max-md:px-2 justify-center md:min-h-[380px] md:px-6">

          {/* text */}
          <div className="relative flex flex-col justify-between items-start md:gap-6 w-[70%] md:pr-4 max-md:w-[75%] max-md:py-4">

            <p className="text-4xl max-md:text-lg text-white font-montserrat font-semibold">
              Conquer SSC CGL{" "}
              <span className="max-md:hidden">
                with Our Power-Packed Test Series
              </span>
            </p>

            <p className="text-white text-xl max-md:text-sm max-md:pt-2">
              Sharpen Your Skills and Track Your Progress{" "}
              <span className="max-md:hidden">
                Designed for SSC CGL Excellence.
              </span>
            </p>

            <div className="flex flex-row max-md:items-center max-md:justify-between gap-2 w-full max-md:w-[90%] pt-2 md:pt-4">

              <button className="px-4 md:px-10 md:mt-2 max-md:mt-2 bg-[#FFFFFFCC] max-md:text-xs text-xl py-2 rounded-2xl font-semibold whitespace-nowrap">
                <p className="max-md:px-1 max-md:text-xs">
                  Mock Test
                </p>
              </button>

              <button className="px-4 md:px-10 md:mt-2 max-md:mt-2 bg-[#FFFFFFCC] max-md:text-xs text-xl py-2 rounded-2xl font-semibold whitespace-nowrap">
                <p className="max-md:px-1 max-md:text-xs">
                  Test Series
                </p>
              </button>

            </div>

          </div>

          {/* image */}
          <div className="w-[20%] max-md:w-[31%] max-md:absolute right-1 bottom-5 pointer-events-none">
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
    </>
  );
}

export default Card2;