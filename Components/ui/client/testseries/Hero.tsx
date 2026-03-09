import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <>
      <div className="bg-white dark:bg-[#313131]">
        <div className="max-w-[1400px] mx-auto   flex justify-center items-center  ">
          {/* card */}
          <div className="  w-[95%]  my-4 rounded-2xl flex flex-row justify-around items-start bg-primary-gradient">
            {/* text */}

            <div className="w-[50%]   flex flex-col  gap-8  mt-16">
              <p className="font-bold text-4xl font-montserrat  text-white">
                Data Entry Practice for SSC Aspirants
              </p>
              <p className="font-medium text-xl  text-white">
                Test your typing speed, accuracy, and consistency with SSC-level
                data entry practice tests.
              </p>

              <div className="flex flex-row gap-4  text-xl">
                <Link
                  href={"/"}
                  className="px-8 py-2 rounded-2xl bg-[#FFFFFFCC] opacity-80 "
                >
                  <p> Mock Test</p>
                </Link>
                <Link
                  href={"/"}
                  className="px-8 py-2 rounded-2xl bg-[#FFFFFFCC] opacity-80"
                >
                  <p>Test Series</p>
                </Link>
              </div>
            </div>

            {/* imaeg */}
            <div className="w-[30%]  my-4">
              <Image
                src="/ui/client/test-series/boy-hero.png"
                alt="boy"
                width={344}
                height={324}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
