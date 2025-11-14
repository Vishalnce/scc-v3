import React from "react";
import Link from "next/link";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function page() {


    const session = await getServerSession(NEXT_AUTH);


  return (
    <>
    <div className="dark:bg-black ">

     {session?.user?.role === "ADMIN" ? (
          <div className="w-[90%] dark:bg-[#191919] mx-auto m-6 max-md:hidden">
            <Link href="/admin/typing ">
              <button className="p-2 px-6 bg-[#007076] rounded-full text-center text-white">
                Add Typing Test
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}


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


