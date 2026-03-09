import Image from "next/image";
import React from "react";

function Card2() {
  return (
    <div className="flex-none w-[80%] px-8 mb-8 ">
      {/* main div */}
      <div className=" bg-gradient-to-r from-[#289AA2] to-[#8CD6DB]  rounded-2xl shadow  ">
        <div className="flex flex-row items-center justify-center pt-6  px-6">
          {/* text  */}
          <div className="  flex flex-col  justify-between items-start gap-6  w-[70%]  pr-4">
            <p className=" text-4xl text-white font-montserrat font-semibold">
              Conquer SSC CGL with Our Power-Packed Test Series
            </p>

            <p className="text-white text-xl ">
              Sharpen Your Skills and Track Your Progress with Realistic Mock
              Tests Designed for SSC CGL Excellence.
            </p>

            <div className=" flex flex-row gap-6">
              <button className=" mt-6 bg-[#FFFFFFCC]  text-xl px-12  py-2 rounded-2xl font-semibold">
              Mock Test
              </button>
              <button className=" mt-6 bg-[#FFFFFFCC]  text-xl px-12 py-2 rounded-2xl font-semibold">
            Test Series
              </button>
            </div>
          </div>

          {/* image */}

          <div className=" ">
            <Image
              src={"/ui/client/home/Hero/boy1.png"}
              width={400}
              height={400}
              alt="hero"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card2;
