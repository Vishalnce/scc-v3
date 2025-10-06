"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
export default function SignUpModals({ onClose }: { onClose: () => void }) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState<Window | null>(null);
  const router = useRouter();
  const handleSignIn = async () => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

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


  const handleGoogleLogin = () => {
    // saveQuizState();
    
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const newPopup = window.open(
      `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=98189081503-ctgekhbcc05uugj534hih2lj8v0fh4oj.apps.googleusercontent.com&scope=openid%20email%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle&state=aMVy6CzHnv_4aRIZncvAGQvpzkYdssWlaKFAXA_Wm24&code_challenge=l05rLaaEitfI-_txUJJF5SVyF9e2NTeiMxvi9OmeUWU&code_challenge_method=S256&service=lso&o2v=2&flowName=GeneralOAuthFlow`,
      "google-login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    setPopup(newPopup);

   const timer = setInterval(async () => {
  if (!newPopup || newPopup.closed) {
    clearInterval(timer);
    const session = await getSession();
    if (session) {
      // User logged in - update UI as needed (e.g., navigate to result page)
      // Example: router.push('/result') or set quiz stage to "result"
      console.log("User logged in via popup");
      // Optionally reload or just update state without reload
    } else {
      // User closed popup without logging in - do NOT reload
      console.log("Popup closed without login");
    }
  }
}, 500);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center py-8 w-full max-md:w-[90%] border-2 mx-auto">
        <p className="py-2 font-bold text-3xl font-montserrat dark:text-white max-md:text-center max-md:text-2xl">
          Sign in to SSC ExamLife
        </p>

        <div className="flex flex-row items-center gap-8 py-2">
          <div
            onClick={handleGoogleLogin}
            className="rounded-full p-2 bg-white shadow-2xl dark:bg-black"
          >
            <FcGoogle className="text-[#0E76FD] size-6" />
          </div>

          <div className="rounded-full p-2 bg-white shadow-2xl dark:bg-black">
            <Link href={"/"}>
              <FaFacebook className="text-[#0E76FD] size-6" />
            </Link>
          </div>
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

          <Link href={"/signup"} className="border-2 text-center">
            <p className="underline py-2 text-my-text-color">
              Create An Account
            </p>
          </Link>

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
