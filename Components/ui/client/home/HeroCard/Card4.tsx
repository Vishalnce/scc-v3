import Image from "next/image";
import React from "react";

function Card4() {
  return (
    <>
      {/* main div */}
      <div className=" bg-gradient-to-r from-[#289AA2] to-[#8CD6DB]  rounded-2xl shadow  max-md:min-h-[180px] max-md:pt-1  md:min-h-[380px]  ">
        <div className="flex flex-row items-center max-md:justify-start  max-md:px-2 justify-center md:pt-4  md:px-6">
          {/* text  */}
          <div className="  relative flex flex-col  justify-between  items-start md:gap-6  w-[70%]  md:pr-4 max-md:w-[75%]   max-md:py-4  ">
            <p className=" text-4xl max-md:text-lg text-white font-montserrat font-semibold  ">
              Conquer SSC CGL{" "}
              <span className="max-md:hidden">
                Exam and Secure Your dream Career!
              </span>
            </p>

            <p className="text-white text-xl max-md:text-sm max-md:pt-2">
              Empower your prep with Top-Notch study material, Mock Test,
              Quizzes{" "}
              <span className="max-md:hidden">
                and Exclusive SSC CGL Updates to help You succeed in exam.{" "}
              </span>
            </p>

            <button className=" px-8 md:mt-4 max-md:mt-4 bg-[#FFFFFFCC] max-md:text-xs  text-xl md:px-16 py-2 rounded-2xl font-semibold whitespace-nowrap">
              Upgrade Now
            </button>
          </div>

          {/* image */}

          <div className=" max-md:absolute right-4 max-md:w-[30%] w-[20%]  ">
            <Image
              src={"/ui/client/home/Hero/boy2.png"}
              width={220}
              height={400}
              alt="hero"
              className="max-md:scale-[100%]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Card4;
