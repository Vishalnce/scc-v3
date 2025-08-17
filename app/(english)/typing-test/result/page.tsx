"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
        console.error("Failed to parse typing results from localStorage", error);
      }
    }
  }, []);

  if (!latestResult) {
    return <p>No typing results found.</p>;
  }

  return (
    <>
      <div>
      {/* <h1>Latest Typing Result</h1>
      <div className="mb-4 border-b border-gray-300 pb-2">
        <div>Date: {latestResult.date}</div>
        <div>
          Level: {latestResult.level} | Duration: {latestResult.duration} minutes
        </div>
        <div>Total Duration: {latestResult.totalDuration} seconds</div>
        <div>Time Taken: {latestResult.} seconds</div>
      
    
     
       
        <div>Gross WPM: {latestResult.grossWPM}</div>
        
        <div>Keystrokes: {latestResult.keystrokes}</div>
      </div> */}
    </div>
     
    <div className="w-[90%] mx-auto border-1 my-12 flex flex-col">
        {/* heading */}
        <div className="w-[100%] my-4">
          <p className="text-center text-lg font-semibold">Congratulation Your Score Card Is Here</p>
        </div>
        {/* body  */}
        <div className="flex flex-row border-1 justify-center items-center">
          {/* left half
           */}

          <div className="flex flex-col w-[45%] ">
            <div className="flex flex-row justify-between items-center  my-2 ">

            <div className="flex flex-row  min-w-[41%] gap-2">
              <Image
                src="/typing-test/icons/duration.svg"
                alt="typing-test"
                width={24}
                height={24}

              />
              <p>Total Duration</p>
            </div>

            <p>{latestResult.totalDuration }s</p>
            <div>

            </div>
            </div>

            <div className="flex flex-row justify-between  my-2">
            <div className="flex flex-row  min-w-[41%] gap-2">
              <Image
                src="/typing-test/icons/taken.svg"
                alt="typing-test"
                width={24}
                height={24}

              />
              <p>Time Taken</p>
            </div>
            <p>{latestResult.timeTaken }s</p>
            <div>

            </div>
            </div>
            <div className="flex flex-row justify-between  my-2">
            <div className="flex flex-row min-w-[41%] gap-2">
              <Image
                src="/typing-test/icons/typed.svg"
                alt="typing-test"
                width={24}
                height={24}

              />
              <p>Total Typed Words</p>
            </div>
            <p>{latestResult.totalTypedWords }</p>
            <div>

            </div>
            </div>
            <div className="flex flex-row justify-between  my-2">
            <div className="flex flex-row min-w-[41%] gap-2">
              <Image
                src="/typing-test/icons/correct.svg"
                alt="typing-test"
                width={24}
                height={24}

              />
              <p>Correct Words</p>
            </div>
            <p>{latestResult.correctWords }</p>
            <div>

            </div>
            </div><div className="flex flex-row justify-between  my-2">
            <div className="flex flex-row min-w-[41%] gap-2">
              <Image
                src="/typing-test/icons/wrong.svg"
                alt="typing-test"
                width={24}
                height={24}

              />
              <p>Incorrect Words</p>
            </div>
            <p>{latestResult.incorrectWords }</p>
            <div>

            </div>
            </div><div className="flex flex-row justify-between  my-2">
            <div className="flex flex-row min-w-[41%] gap-2">
              <Image
                src="/typing-test/icons/skipped.svg"
                alt="typing-test"
                width={24}
                height={24}

              />
              <p>Skipped words</p>
            </div>
            <p>{latestResult.skippedWords }</p>
            <div>

            </div>
            </div>

          </div>

          {/* right half */}
         <div className="flex flex-col w-[45%]">
            <div className="flex flex-row justify-between  my-2">
            <div className="flex flex-row  min-w-[41%] gap-2">
              <Image
                src="/typing-test/icons/accuracy.svg"
                alt="typing-test"
                width={24}
                height={24}

              />
              <p>Accuracy</p>
            </div>
            <p>{latestResult.accuracy }%</p>
            <div>

            </div>
            </div>

            <div className="flex flex-row justify-between  my-2">
            <div className="flex flex-row  min-w-[41%] gap-2">
              <Image
                src="/typing-test/icons/error.svg"
                alt="typing-test"
                width={24}
                height={24}

              />
              <p>Error Percentage</p>
            </div>
            <p>{latestResult.errorPercentage }%</p>
            <div>

            </div>
            </div>
            <div className="flex flex-row justify-between  my-2">
            <div className="flex flex-row min-w-[41%] gap-2">
              <Image
                src="/typing-test/icons/speed.svg"
                alt="typing-test"
                width={24}
                height={24}

              />
              <p>Speed(WPM)</p>
            </div>
            <p>{latestResult.speedWPM }</p>
            <div>

            </div>
            </div>
            <div className="flex flex-row justify-between  my-2">
            <div className="flex flex-row min-w-[41%] gap-2">
              <Image
                src="/typing-test/icons/net.svg"
                alt="typing-test"
                width={24}
                height={24}

              />
              <p>Net Typing Speed (WPM) </p>
            </div>
            <p>{latestResult.netWPM }</p>
            <div>

            </div>
            </div><div className="flex flex-row justify-between  my-2">
            <div className="flex flex-row min-w-[41%] gap-2">
              <Image
                src="/typing-test/icons/wrong.svg"
                alt="typing-test"
                width={24}
                height={24}

              />
              <p>Gross WPM</p>
            </div>
            <p>{latestResult.grossWPM }</p>
            <div>

            </div>
            </div><div className="flex flex-row justify-between  my-2">
            <div className="flex flex-row min-w-[41%] gap-2">
              <Image
                src="/typing-test/icons/keystroke.svg"
                alt="typing-test"
                width={24}
                height={24}

              />
              <p>Keystroke</p>
            </div>
            <p>{latestResult.keystrokes }</p>
            <div>

            </div>
            </div>

          </div>
        </div>

    </div>
    </>
  
  );
}

export default Page;
