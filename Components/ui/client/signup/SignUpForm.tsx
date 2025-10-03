"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaFacebook, FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";

type SignupFormProps = {
  first: string;
  last: string;
  email: string;
  password: string;
};
export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, setValue, getValues, reset } =
    useForm<SignupFormProps>();

  const signupFormData = async (data: SignupFormProps) => {
    try {
    
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/en/signup/client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to signup");
      }

      const result = await res.json();
      console.log("Signup response:", result);

      return result; // you can use this in UI (e.g. success message)
    } catch (error) {
      console.error("Error while signup is:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center  py-8 w-[60%] max-md:w-[90%] ">
        <div className=" ">
          <p className="py-2 font-bold text-3xl font-montserrat dark:text-white max-md:text-center max-md:text-2xl">
            Create an Account
          </p>
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
          <p className="text-my-text-color ">
            or use your email for Registration
          </p>
        </div>
        <form onSubmit={handleSubmit(signupFormData)}>
          <div className="flex flex-col gap-4 w-full max-w-sm pt-4">
            {/* name  */}

            <div className="flex flex-row  gap-5">
              {/* first anem  */}

              <div className="relative">
                <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-my-text-color size-5" />
                <input
                  type="text"
                  {...register("first")}
                  placeholder="First Name"
                  className="p-2 pl-10 pr-10 w-full bg-white  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:placeholder-[#C2C2C2]"
                />
              </div>

              <div className="relative">
                <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-my-text-color size-5" />
                <input
                  type="text"
                  {...register("last")}
                  placeholder="Last Name"
                  className="p-2 pl-10 pr-10 w-full bg-white  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:placeholder-[#C2C2C2]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-my-text-color size-5" />
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="p-2 pl-10 pr-10 w-full bg-white  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:placeholder-[#C2C2C2]"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2  size-5 text-my-text-color " />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
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

            {/* <button>
                <Link href = "/">
                  <p className="underline py-2 text-my-text-color">Forgot Your Password</p>
                </Link>
              
              </button> */}

            <button type="submit" className=" bg-[#FFE332] rounded-3xl py-2">
              <p className="font-bold">Sign In</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
