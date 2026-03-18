import Image from "next/image";
import React from "react";

function Card1() {
  return (
    <>
    
        {/* main div */}
        <div className=" bg-gradient-to-r from-[#289AA2] to-[#8CD6DB]  relative rounded-2xl shadow lg:pb-6  md:min-h-[380px]  ">
          <div className="flex flex-row items-start justify-start md:justify-start md:pt-6 py-2  md:px-6 px-3 ">
            {/* text  */}
            <div className="  flex flex-col  justify-between r items-start md:gap-6 max-md:py-4 w-[70%] max-md:w-[85%] md:mt-8  max-md:pr-4  md:py-4  md:pl-12">
              <p className=" md:text-4xl max-md:text-xl text-white font-montserrat font-semibold"> <span className="max-md:hidden"> Master the</span> Data Entry Speed <span className="max-md:hidden">Test with SSC Examlife</span> </p>

              <p className="text-white text-xl max-md:text-sm max-md:pt-2 max-md:leading-4 max-md:w-[90%] ">
                Boost Your Typing Speed and Accuracy with Interactive Practice <span className="max-md:hidden">      to Ace the SSC CGL Data Entry Round.</span>
          
              </p>

              <button className=" px-8 mt-4 bg-[#FFFFFFCC] max-md:text-xs  text-xl md:px-16 py-2 rounded-2xl font-semibold">Enroll Now</button>
            </div>

            {/* image */}

             <div className="w-[25%]  max-md:w-[40%] max-md:absolute right-1 bottom-4">
          <Image
            src="/ui/client/home/Hero/hero1.png"
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

export default Card1;
