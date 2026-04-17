"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaFacebook, FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type SignupFormProps = {
  first: string;
  last: string;
  email: string;
  password: string;
};

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormProps>();

  const router = useRouter();

  const signupFormData = async (data: SignupFormProps) => {
    try {
      const res = await fetch(`/api/en/signup/client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      // ❌ EMAIL ALREADY EXISTS
      if (!res.ok) {
        if (result.error === "Email already exists") {
          setError("email", {
            type: "manual",
            message: "Email already exists",
          });
        }
        return; // STOP HERE
      }

      // ✅ SUCCESS → redirect
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center py-8 w-[80%] max-md:w-[90%] my-8 mx-auto shadow-[0_0_9px_rgba(0,0,0,0.2)] ">
        <p className="py-2 font-bold text-4xl font-montserrat dark:text-white max-md:text-center max-md:text-2xl">
          Create an Account
        </p>

        <div className="flex flex-row items-center gap-8 py-2">
          <div className="rounded-full p-2 bg-white shadow-2xl dark:bg-black">
            <div
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="rounded-full p-1 bg-white shadow-2xl dark:bg-black hover:cursor-pointer"
            >
              <FcGoogle className="text-[#0E76FD] size-6" />
            </div>
          </div>

          
        </div>

        <p className="py-2 text-lg text-my-text-color">
          or use your email for Registration
        </p>

        <form onSubmit={handleSubmit(signupFormData)} className=" w-[90%]">
          <div className="flex flex-col gap-4 w-full   pt-4">
            {/* First + Last name */}
            <div className="flex flex-row gap-5">
              <div className="relative w-full">
                <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-my-text-color size-5" />
                <input
                  type="text"
                  {...register("first")}
                  placeholder="First Name"
                  className="p-4 pl-10 pr-10 w-full bg-[#F8FAFC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:placeholder-[#C2C2C2]"
                />
              </div>

              <div className="relative w-full">
                <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-my-text-color size-5" />
                <input
                  type="text"
                  {...register("last")}
                  placeholder="Last Name"
                  className="p-4 pl-10 pr-10 w-full bg-[#F8FAFC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:placeholder-[#C2C2C2]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative w-full">
              <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-my-text-color size-5" />
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className={`p-4 pl-10 pr-10 w-full bg-[#F8FAFC] rounded-md focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "focus:ring-red-500 border-red-500"
                    : "focus:ring-blue-500"
                } dark:bg-black dark:placeholder-[#C2C2C2]`}
              />

              {/* ❌ Display Email Error */}
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-my-text-color" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Password"
                className="p-4 pl-10 pr-10 w-full bg-[#F8FAFC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:placeholder-[#C2C2C2]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <button
              type="submit"
              className="bg-[#047077] rounded-3xl py-2 transition-all duration-300 ease-in-out transform hover:scale-101 hover:shadow-lg"
            >
              <p className="font-bold text-xl text-white">Sign Up</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
