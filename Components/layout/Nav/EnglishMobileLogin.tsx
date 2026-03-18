import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function EnglishMobileLogin() {
  const { status } = useSession();
  return (
    <>
      <div className="flex flex-row  w-full">
        {status === "authenticated" ? (
          <div className=" w-full flex justify-center">
            <button
              className=" border-2 border-[#007076] px-6 py-1 rounded-full bg-my-green  w-full text-white max-lg:text-lg max-sm:px-2  "
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center gap-2  w-full">


            <Link href={"/login"} className=" w-[50%] flex justify-center ">
              <button
                onClick={() => {
                  signIn();
                }}
                className=" border-2 px-6 py-1 rounded-full w-full "
              >
                Login
              </button>
            </Link>

            <Link href={"/signup"} className= "w-[50%] flex justify-center">
              <button className=" border-2 border-[#007076] px-6 py-1 rounded-full bg-my-green text-white w-full ">
                Signup
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default EnglishMobileLogin;
