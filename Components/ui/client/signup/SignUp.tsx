"use client";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";



export default function SignUp() {


  return (
    <>
      <div className="bg-[#E6f1f1] dark:bg-[#313131] ">
        <div className=" mx-auto  flex flex-row max-md:items-center max-md:justify-center ">
          {/* image */}

          <div className=" w-[40%]  flex justify-center items-center relative max-md:hidden">
            <Image
              src="/ui/client/signin/signingirl.png"
              alt="boy"
              width={520} // natural width
              height={485} // natural height
              className="object-contain w-full h-auto"
            />

            <div className="absolute flex flex-col items-center justify-between">
              <div>
                <p className="font-bold text-white text-3xl font-montserrat">
                  Welcome back
                </p>
              </div>

              <div className=" w-[70%] pt-3 pb-3">
                <p className="text-white text-center">
                  To keep connected with SSC Examlife please login with your
                  personal info.
                </p>
              </div>

              <div className=" py-4">
                <Link href={"/login"}>
                  <p className="underline text-white">
                    Already have an account?
                  </p>
                </Link>
              </div>
            <Link href={"/login"} className="border-white border-2 w-[60%] rounded-4xl py-1">
              <button className=" w-full">
                
                  <p className="text-white pointer">Login </p>
               
              </button>
               </Link>
            </div>
          </div>

          <SignUpForm/>
        </div>
      </div>
    </>
  );
}
