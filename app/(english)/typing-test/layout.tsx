import React from "react";
import { formula } from "@/constants/typing-test/formula";
export default function page({ children }: { children: React.ReactNode }) {
  return (
    <>
 

      {children}

      {/* formula */}
      <div className="dark:bg-black">
        <div className="w-[90%] mx-auto pt-12">
          {/* heaing */}
          <div>
            <p className="font-bold text-xl dark:text-white">Standard Formulas </p>
          </div>

          {/* Description */}

          <div className="w-full flex flex-col gap-2 py-2">
            {formula.map((items, index) => (
              <div className="flex flex-row  dark:text-white" key={index}>
                <div className="w-[20%] bg-[#F7F7FF] dark:bg-[#191919] flex justify-center items-center ">
                  <p className="text-center font-bold py-3">{items.heading}</p>
                </div>
                <div className="w-[70%] py-2 pl-4">
                  <p className="font-medium">{items.des}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
