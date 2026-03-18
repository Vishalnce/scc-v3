import Image from "next/image";
import React from "react";

function Card3() {
  return (
    <>
      {/* main div */}
      <div className="bg-gradient-to-r from-[#289AA2] to-[#8CD6DB] rounded-2xl shadow  md:min-h-[380px]   relative">
        <div className="flex flex-row relative items-center justify-center max-md:justify-start md:pt-4 md:px-6  max-md:py-2 px-2 ">
          {/* text */}
          <div className="flex flex-col justify-between items-start md:gap-6 w-[70%] pr-4  max-md:py-4 md:pt-10  max-md:w-[70%] ">
            <p className="text-4xl max-md:text-xl text-white font-montserrat font-semibold">
              Upgrade to Pro{" "}
              <span className="max-md:hidden">
                for In-Depth Performance Analysis{" "}
              </span>
            </p>

            <p className="text-white text-xl max-md:text-sm max-md:leading-4 max-md:pt-2">
              Unlock detailed insights after every test,{" "}
              <span className="max-md:hidden">
                understand where you went wrong, track your progress over time,
                and improve your{" "}
              </span>
              accuracy and speed
            </p>

            <button className=" px-8 md:mt-4 max-md:mt-4 bg-[#FFFFFFCC] max-md:text-xs  text-xl md:px-16 py-2 rounded-2xl font-semibold whitespace-nowrap">
              Upgrade Now
            </button>
          </div>

          {/* image */}
          <div className="w-[25%] max-md:w-[40%]  max-md:absolute right-1 bottom-6">
            <Image
              src="/ui/client/home/Hero/boy3.png"
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

export default Card3;
