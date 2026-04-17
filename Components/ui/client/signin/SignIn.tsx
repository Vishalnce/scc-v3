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
  const router = useRouter();

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

    if (res?.ok) router.push("/");
  };

  return (
    <div className=" dark:bg-[#313131]">
      <div className="mx-auto flex justify-center  ">
        {/* Input fields */}
        <div className="flex flex-col items-center justify-center py-8   w-[80%] shadow-[0_0_9px_rgba(0,0,0,0.2)] my-8 ">
          <p className="py-2 font-bold text-3xl font-montserrat dark:text-white max-md:text-center max-md:text-2xl">
            Login to SSC ExamLife
          </p>

          <div className="flex flex-row items-center gap-8 py-2">
            <div
              onClick={() => signIn("google", { callbackUrl: "/" })}
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

          <p className="py-2 text-lg text-my-text-color">
            or use your email for Registration
          </p>

          <div className="flex flex-col gap-4  pt-4  w-[80%]  ">
            {/* Email */}
            <div className="relative">
              <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-my-text-color size-5" />
              <input
                type="email"
                placeholder="Email"
                ref={emailRef}
                className="p-4 pl-10 pr-10 w-full  bg-[#F8FAFC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:placeholder-[#C2C2C2]"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-my-text-color" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                ref={passwordRef}
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

            {/* <button>
              <p className="underline py-2 text-my-text-color">Forgot Your Password</p>
            </button> */}

            <button
              onClick={handleSignIn}
              className="bg-[#047077] rounded-3xl py-2  "
            >
              <p className="font-bold text-xl text-white"> Log In</p>
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
}
