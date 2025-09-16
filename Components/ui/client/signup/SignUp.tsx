"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { MdEmail, MdLockOutline, MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
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
                <p className="text-white text-center">To keep connected with SSC Examlife please login with your personal info.</p>
              </div>


              <div className=" py-4">
                <Link href={"/login"} >

                <p className="underline text-white">
                  Already have an account?
                </p>
                </Link>
              </div>

              <button className="border-white border-2 w-[60%] rounded-4xl py-1">
                <Link href={"/"}>
               <p className="text-white">Sign Up</p>
                </Link>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center  py-8 w-[60%] max-md:w-[90%] ">
            <div className=" ">
              <p className="py-2 font-bold text-3xl font-montserrat dark:text-white max-md:text-center max-md:text-2xl">Create an Account</p>
            </div>

            <div className="flex flex-row items-center  gap-8 py-2">
              <div className="  rounded-full p-2  bg-white shadow-2xl dark:bg-black">
                 <Link href={"/"}>
                 <FcGoogle className="text-[#0E76FD] size-6" />
                 </Link>
                
              </div>

              <div className="  rounded-full p-2  bg-white shadow-2xl dark:bg-black">
                <Link href={"/"}>
                <FaFacebook className="text-[#0E76FD] size-6" />
                </Link>
                
              </div>
            </div>

            <div className="py-2">
              <p className="text-my-text-color ">or use your email for Registration</p>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-sm pt-4">

              {/* name  */}

              <div className="relative">
                <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-my-text-color size-5" />
                <input
                  type="text"
                  placeholder="Name"
                  className="p-2 pl-10 pr-10 w-full bg-white  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:placeholder-[#C2C2C2]"
                />
              </div>


              {/* Email */}
              <div className="relative">
                <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-my-text-color size-5" />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-2 pl-10 pr-10 w-full bg-white  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:placeholder-[#C2C2C2]"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <MdLockOutline  className="absolute left-3 top-1/2 -translate-y-1/2  size-5 text-my-text-color " />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="p-2 pl-10 pr-10 w-full bg-white  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:placeholder-[#C2C2C2]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              <button>
                <Link href = "/">
                  <p className="underline py-2 text-my-text-color">Forgot Your Password</p>
                </Link>
              
              </button>

              <button className=" bg-[#FFE332] rounded-3xl py-2">
                <p className="font-bold">Sign In</p>
              </button>
            </div>
          </div>

         
        </div>
      </div>
    </>
  );
}
