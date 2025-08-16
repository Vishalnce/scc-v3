import React from "react";
import { formula } from "@/constants/typing-test/formula";
export default function page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-[image:var(--color-my-gradient)]">
        <div className="flex flex-col justify-center items-center min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <h1 className="text-3xl font-bold max-sm:text-2xl">
            Master the{" "}
            <span className="text-my-green">Data Entry Speed Test</span> Success
          </h1>
          <p className="mt-1 text-sm text-my-text-color">
            Boost Your Typing Speed and Accuracy with Interactive Practice to
            Ace the SSC CGL Data Entry Round
          </p>
        </div>
      </header>

      {children}

      {/* formula */}
      <div className="w-[90%] mx-auto mt-12">
        {/* heaing */}
        <div>
          <p className="font-bold text-xl">Standard Formulas </p>
        </div>

        {/* Description */}

        <div className="w-full ">
          {formula.map((items, index) => (
            <div className="flex flex-row m-3" key={index}>
              <div className="w-[30%] bg-[#E6F1F1] flex justify-center items-center ">
                <p className="text-center font-bold py-3">{items.heading}</p>
              </div>
              <div className="w-[70%] py-2 pl-4">
                <p className="font-medium">
                  {items.des}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
