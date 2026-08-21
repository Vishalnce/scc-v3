import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoClock } from "react-icons/go";



export default async function DataEntry() {
  const session = await getServerSession(NEXT_AUTH);
  return (
    <>
       {/* main div */}
       <div className="dark:bg-[#1f1f1f] md:py-8">
         <div className=" relative  rounded-2xl shadow border-1 border-[#CDE2E4] bg-[#CDE2E4] dark:bg-[#303333] md:py-4 w-[90%] mx-auto max-w-[1400px]   ">
               <div className="flex flex-row items-start justify-start md:justify-start md:pt-6 py-2  md:px-6 px-3 ">
                 {/* text  */}
                 <div className="  flex flex-col  justify-between  items-start md:gap-6 max-md:py-4 w-[70%] max-md:w-[70%] md:mt-8  max-md:pr-4  md:py-4  md:pl-12 ">
                   <p className=" md:text-4xl max-md:text-lg text-[#047077] font-montserrat font-semibold">  Explore Data Entry Speed Test </p>
     
                   <p className=" text-xl max-md:text-sm max-md:pt-2 max-md:leading-4 md:w-[80%] dark:text-white">
                     Practice and improve your typing speed <span className="max-md:hidden"> with our specialized data entry tests designed for SSC exams.    </span>
               
                   </p>
     
                   <Link href="/typing-test/intro"  className=" px-8 mt-4 bg-[#047077] max-md:text-xs  text-xl md:px-16 py-2 rounded-2xl font-semibold text-white">Start Typing</Link>

                    {session?.user?.role === "ADMIN" ? (
                  <div className="w-[90%]  max-md:hidden">
                    <Link href="/admin/typing ">
                      <button className="p-2 px-6 bg-[#007076] rounded-full text-center text-white">
                        Edit Typing Test
                      </button>
                    </Link>
                  </div>
                ) : (
                  ""
                )}
                 </div>
     
                 {/* image */}
     
                 <div className=" max-md:absolute right-6 top-10 max-md:w-[30%] ">
                   <Image
                     src={"/ui/client/home/d1.png"}
                        width={300}
                       height={300}
                     alt="hero"
                     className="max-md:scale-[140%]"
                   />
                 </div>
               </div>
             </div>


       </div>
            
    </>
  );
}
