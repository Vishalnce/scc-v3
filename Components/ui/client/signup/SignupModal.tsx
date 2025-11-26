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
  const [success, setSuccess] = useState(false);
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

    if (!res.ok) {
      if (result.error === "Email already exists") {
        setError("email", {
          type: "manual",
          message: "Email already exists",
        });
      }
      return;
    }

    // Show success UI instead of redirect/close
    setSuccess(true);

  } catch (error) {
    console.error("Signup error:", error);
  }
};
return (
  <>
    <div className="flex flex-col items-center justify-center py-8 w-[60%] max-md:w-[90%]">
      {!success ? (
        <>
          <p className="py-2 font-bold text-4xl font-montserrat dark:text-white max-md:text-center max-md:text-2xl">
            Create an Account
          </p>

          {/* Social */}
          {/* <div className="flex flex-row items-center gap-8 py-2">
            <div className="rounded-full p-2 bg-white shadow-2xl dark:bg-black">
              <div
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="rounded-full p-1 bg-white shadow-2xl dark:bg-black hover:cursor-pointer"
              >
                <FcGoogle className="text-[#0E76FD] size-6" />
              </div>
            </div>

            <div className="rounded-full p-2 bg-white shadow-2xl dark:bg-black">
              <Link href={"/"}>
                <FaFacebook className="text-[#0E76FD] size-6" />
              </Link>
            </div>
          </div> */}

          <p className="py-2 text-lg text-my-text-color">
            or use your email for Registration
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(signupFormData)}>
            <div className="flex flex-col gap-4 w-full max-w-sm pt-4">
              <div className="flex flex-row gap-5">
                <div className="relative">
                  <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-my-text-color size-5" />
                  <input
                    type="text"
                    {...register("first")}
                    placeholder="First Name"
                    className="p-4 pl-10 pr-10 w-full bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black"
                  />
                </div>

                <div className="relative">
                  <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-my-text-color size-5" />
                  <input
                    type="text"
                    {...register("last")}
                    placeholder="Last Name"
                    className="p-4 pl-10 pr-10 w-full bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black"
                  />
                </div>
              </div>

              <div className="relative">
                <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-my-text-color size-5" />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className={`p-4 pl-10 pr-10 w-full bg-white rounded-md focus:outline-none focus:ring-2 ${
                    errors.email ? "focus:ring-red-500 border-red-500" : "focus:ring-blue-500"
                  } dark:bg-black`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-my-text-color" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                  className="p-4 pl-10 pr-10 w-full bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black"
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
                className="bg-[#FFE332] rounded-3xl py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <p className="font-bold text-xl">Sign Up</p>
              </button>
            </div>
          </form>
        </>
      ) : (
        // 🎉 SUCCESS UI
        <div className="text-center space-y-4 max-w-sm py-8">
          <h2 className="text-2xl font-bold text-green-600">
            🎉 Account Created!
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Your account was created successfully.
          </p>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            Please close this window and log in with your email & password.
          </p>

          <button
            onClick={() => window.close()}
            className="bg-black text-white px-6 py-2 rounded-full hover:opacity-80 transition"
          >
            Close Window
          </button>
        </div>
      )}
    </div>
  </>
);

}
