"use client";
import React, { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()



  const handleSignIn = async () => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
  
    // 1️⃣ Check if user exists
    const check = await fetch("/api/en/login/client", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
  
    if (check.status === 404) {
      alert("User does not exist. Please sign up.");
      return;
    }
  
    // 2️⃣ Continue Login process
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  
    if (res?.error) {
      alert("Invalid credentials");
      return;
    }
  
      if (res?.ok) router.push("/")
  };

  

  return (
    <div className="bg-[#E6f1f1] dark:bg-[#313131]">
      <div className="mx-auto flex flex-row max-md:items-center max-md:justify-center">
        {/* Input fields */}
        <div className="flex flex-col items-center justify-center py-8 w-[60%] max-md:w-[90%] ">
          
          <p className="py-2 font-bold text-4xl font-montserrat dark:text-white max-md:text-center max-md:text-2xl">
            Login  to SSC ExamLife
          </p>

          <div className="flex flex-row items-center gap-8 py-2">
            <div
              onClick={() => signIn("google",{ callbackUrl: "/" })}
              className="rounded-full p-2 bg-white shadow-2xl dark:bg-black"
            >
              <FcGoogle className="text-[#0E76FD] size-8" />
            </div>
{/* 
            <div className="rounded-full p-2 bg-white shadow-2xl dark:bg-black">
              <Link href={"/"}>
                <FaFacebook className="text-[#0E76FD] size-8" />
              </Link>
            </div> */}
          </div>

          <p className="py-2 text-lg text-my-text-color">or use your email for Registration</p>

          <div className="flex flex-col gap-4 w-full max-w-sm pt-4 ">
            {/* Email */}
            <div className="relative">
              <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-my-text-color size-5" />
              <input
                type="email"
                placeholder="Email"
                ref={emailRef}
                className="p-4 pl-10 pr-10 w-full bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:placeholder-[#C2C2C2]"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-my-text-color" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                ref={passwordRef}
                className="p-4 pl-10 pr-10 w-full bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:placeholder-[#C2C2C2]"
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
              <p className="underline py-2 text-my-text-color">Forgot Your Password</p>
            </button> */}

            <button
              onClick={handleSignIn}
              className="bg-[#FFE332] rounded-3xl py-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              <p className="font-bold text-xl"> Log In</p>
            </button>
          </div>
        </div>

        {/* Image section */}
        <div className="w-[40%] flex justify-center items-center relative max-md:hidden">
          <Image
            src="/ui/client/signin/signingirl.png"
            alt="girl"
            width={520}
            height={485}
            className="object-contain w-full h-auto"
          />

          <div className="absolute flex flex-col items-center justify-between ">
            <p className="font-bold text-white text-4xl font-montserrat">
              New to SSC Examlife
            </p>
            <div className="w-[70%] py-6">
              <p className="text-white text-xl text-center">
                Enter your personal details and your SSC journey with us!
              </p>
            </div>
            <button className="border-white border-2 w-[60%] rounded-4xl py-1">
              <Link href={"/signup"}>
                <p className="text-white text-xl">Sign Up</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
