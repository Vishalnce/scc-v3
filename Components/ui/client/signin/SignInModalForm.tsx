"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { signIn, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
export default function SignUpModals({ onClose }: { onClose: () => void }) {

  
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState<Window | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  
  useEffect(() => {
    if (session) {
      console.log("User logged in ✔ Closing modal...");
      onClose();
    } else {
      console.log("User not logged in ❌");
    }
  }, [session, onClose]);

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

    if (res?.ok) {
      onClose();
    }
  };

  const saveQuizState = () => {
    const quizState = {
      // Example data: replace with your actual quiz state values
      stage: "login",
      answers: JSON.parse(localStorage.getItem("answers") || "[]"),
      questions: JSON.parse(localStorage.getItem("questions") || "[]"),
      timeTaken: Number(localStorage.getItem("timeTaken") || "0"),
    };
    localStorage.setItem("quizState", JSON.stringify(quizState));
  };


  const  popupCenter = (url:any, title:any) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };

  
  const handleCreateAnAccount = () => {
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const newPopup = window.open(
      `/signup-modal`,
      "signupPopup", // Name is required to avoid new tab behavior
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center py-8 w-full max-md:w-[90%] mx-auto">
        <p className="py-2 font-bold text-3xl font-montserrat dark:text-white max-md:text-center max-md:text-2xl">
          Login in to SSC ExamLife
        </p>

        <div className="flex flex-row items-center gap-8 py-2">
          <div
            onClick={() => popupCenter("/google-signin", "Sample Sign In")}
            className="rounded-full p-2 bg-white shadow-2xl dark:bg-black"
          >
            <FcGoogle className="text-[#0E76FD] size-6" />
          </div>

          {/* <div className="rounded-full p-2 bg-white shadow-2xl dark:bg-black">
            <Link href={"/"}>
              <FaFacebook className="text-[#0E76FD] size-6" />
            </Link>
          </div> */}
        </div>

        <p className="py-2 text-my-text-color">
          or use your email for Registration
        </p>

        <div className="flex flex-col gap-4 w-full max-w-sm pt-4">
          {/* Email */}
          <div className="relative">
            <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-my-text-color size-5" />
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              className="p-2 pl-10 pr-10 w-full bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:placeholder-[#C2C2C2]"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-my-text-color" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              ref={passwordRef}
              className="p-2 pl-10 pr-10 w-full bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:placeholder-[#C2C2C2]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button onClick={handleCreateAnAccount} className=" text-center">
            <p className="underline py-2 text-my-text-color">
              Create An Account
            </p>
          </button>

          <button
            onClick={handleSignIn}
            className="bg-[#FFE332] rounded-3xl py-2"
          >
            <p className="font-bold">Sign In</p>
          </button>
        </div>
      </div>
    </>
  );
}
