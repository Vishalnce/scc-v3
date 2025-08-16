import React from "react";
import Link from "next/link";

function page() {
  return (
    <>
      <div className="w-[90%] mx-auto">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center bg-[image:var(--color-my-gradient)] my-4"
          >
            <div className="py-4 ml-6">
              <p className="font-bold text-xl">Typing Test {index + 1}</p>
            </div>

            <Link href="">
              <button className="px-3 py-2  bg-[#007076] rounded-full ml-4 text-white mr-3">
                Start Test
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default page;
