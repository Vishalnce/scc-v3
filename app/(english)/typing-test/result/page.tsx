"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegCheckCircle, FaRegCircle, FaRegHourglass } from "react-icons/fa";
import { GoCircle, GoClock, GoStopwatch } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { PiClockCountdown } from "react-icons/pi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";
import { SiSpeedtest } from "react-icons/si";
import { BsSpeedometer2 } from "react-icons/bs";
import { CiKeyboard } from "react-icons/ci";
import Link from "next/link";



function Page() {
  const [latestResult, setLatestResult] = useState<any | null>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("typingResults");
    if (storedResults) {
      try {
        const results = JSON.parse(storedResults);
        if (Array.isArray(results) && results.length > 0) {
          setLatestResult(results[results.length - 1]); // only latest
        }
      } catch (error) {
        console.error(
          "Failed to parse typing results from localStorage",
          error
        );
      }
    }
  }, []);

  if (!latestResult) {
    return <p>No typing results found.</p>;
  }

  return (
    <>
      <div className="dark:bg-black py-12">
        <div className="w-[90%] mx-auto border-1 pb-4 flex flex-col dark:bg-[#313131] dark:border-white bg-[#FAFCFC] border-[#E6F1F1] rounded-2xl">
          {/* heading */}
          <div className="w-[100%] my-4">
            <p className="text-center text-lg py-2 font-semibold dark:text-white">
              Congratulation Your Score Card Is Here
            </p>
          </div>
          {/* body  */}
          <div className="flex flex-row max-sm:flex-col  justify-around items-center pb-6">
            {/* left half
             */}

            <div className="flex flex-col w-[42%] max-sm:w-[90%] dark:border-1 dark:border-white dark:bg-[#191919] px-4 rounded-2xl dark:text-white">
              <div className="flex flex-row justify-between items-center  my-2 ">
                <div className="flex flex-row  min-w-[41%] gap-2">
                  <GoClock className="my-auto size-6"/>
                  <p>Total Duration</p>
                </div>

                <p>{latestResult.totalDuration}s</p>
              
              </div>

              <div className="flex flex-row justify-between  my-2">
                <div className="flex flex-row  min-w-[41%] gap-2">
                 <GoStopwatch className="my-auto size-6" />
                  <p>Time Taken</p>
                </div>
                <p>{latestResult.timeTaken}s</p>
           
              </div>

              <div className="flex flex-row justify-between  my-2">
                <div className="flex flex-row min-w-[41%] gap-2">
                  <GoCircle   className="my-auto size-6" />
                  <p>Total Typed Words</p>
                </div>
                <p>{latestResult.totalTypedWords}</p>
             
              </div>
              <div className="flex flex-row justify-between  my-2">
                <div className="flex flex-row min-w-[41%] gap-2">
                  <IoIosCheckmarkCircleOutline  className="my-auto size-6 text-green-500" />
                  <p>Correct Words</p>
                </div>
                <p>{latestResult.correctWords}</p>
                
              </div>
              <div className="flex flex-row justify-between  my-2">
                <div className="flex flex-row min-w-[41%] gap-2">
                  <RxCrossCircled className="my-auto size-6 text-red-500" />
                  <p>Incorrect Words</p>
                </div>
                <p>{latestResult.incorrectWords}</p>
             
              </div>
              <div className="flex flex-row justify-between  my-2">
                <div className="flex flex-row min-w-[41%] gap-2">
                  <PiClockCountdown  className="my-auto size-6 " />
                  <p>Skipped words</p>
                </div>
                <p>{latestResult.skippedWords}</p>
            
              </div>
            </div>

            {/* right half */}
            <div className="flex flex-col w-[42%] max-sm:w-[90%] dark:border-1   dark:border-white dark:bg-[#191919] px-4 rounded-2xl dark:text-white ">
              <div className="flex flex-row justify-between  my-2">
                <div className="flex flex-row  min-w-[41%] gap-2">
                  <TbTargetArrow className="my-auto size-6 "/>
                  <p>Accuracy</p>
                </div>
                <p>{latestResult.accuracy}%</p>
              
              </div>

              <div className="flex flex-row justify-between  my-2">
                <div className="flex flex-row  min-w-[41%] gap-2">
                  <MdErrorOutline className="my-auto size-6 text-red-500 " />
                  <p>Error Percentage</p>
                </div>
                <p>{latestResult.errorPercentage}%</p>
         
              </div>
              <div className="flex flex-row justify-between  my-2">
                <div className="flex flex-row min-w-[41%] gap-2">
                  <SiSpeedtest className="my-auto size-6"  />
                  <p>Speed(WPM)</p>
                </div>
                <p>{latestResult.speedWPM}</p>
        
              </div>
              <div className="flex flex-row justify-between  my-2">
                <div className="flex flex-row min-w-[41%] gap-2">
                  <BsSpeedometer2 className="my-auto size-6" />
                  <p>Net Typing Speed (WPM) </p>
                </div>
                <p>{latestResult.netWPM}</p>
        
              </div>
              <div className="flex flex-row justify-between  my-2">
                <div className="flex flex-row min-w-[41%] gap-2">
                 <FaRegHourglass  className="my-auto size-6" />
                  <p>Gross WPM</p>
                </div>
                <p>{latestResult.grossWPM}</p>
    
              </div>
              <div className="flex flex-row justify-between  my-2">
                <div className="flex flex-row min-w-[41%] gap-2">
                  <CiKeyboard className="my-auto size-6" />
                  <p>Keystroke</p>
                </div>
                <p>{latestResult.keystrokes}</p>
    
              </div>
            </div>
          </div>
            
          <Link href={"/typing-test/intro"} className="mx-auto">
          <button className="bg-[#FFE332] px-2 rounded-full py-2">
            Retake Test
          </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Page;
