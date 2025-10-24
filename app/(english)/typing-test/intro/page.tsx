import React from "react";
import Link from "next/link";

function page() {
  return (
    <>
    <div className="dark:bg-black ">
 <div className="w-[90%] mx-auto flex flex-col  gap-4 py-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center bg-[image:var(--color-my-gradient)] dark:bg-[#313131] rounded-2xl  "
          >
            <div className="py-4 ml-6">
              <p className="font-bold text-xl dark:text-white">Typing Test {index + 1}</p>
            </div>

            <Link href="/typing-test/level " >
              <button className="px-3 py-2  bg-[#007076] rounded-full ml-4 text-white mr-3 cursor-pointer">
                Start Test
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
     
    </>
  );
}

export default page;
