"use client";
import React, { useState } from "react";
import Image from "next/image";

import { TbLanguageHiragana } from "react-icons/tb";

import Link from "next/link";

import { MdOutlineLightbulb } from "react-icons/md";

import ThemeToggle from "@/utils/theme/ThemeToggle";
import { IoClose, IoHome, IoMoon } from "react-icons/io5";
import { RiMenu2Fill, RiMore2Fill } from "react-icons/ri";
import { signIn, signOut, useSession } from "next-auth/react";
import { LuClipboardList, LuCrown, LuNewspaper } from "react-icons/lu";
import Select from "react-select";

import { useRouter } from "next/navigation";

import EnglishMobMenu from "./EnglishMobMenu";
import SmallNav from "@/Components/layout/Nav/SmallNav";
import EnglishNoti from "./Notification/EnglishNoti";

function Nav() {
  const router = useRouter();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(true);

  const { status } = useSession();

  const handleClick = (menu: string) => {
    setActiveTag((prev) => (prev === menu ? null : menu));
  };

  const options = [
    { value: "en", label: "English", path: "/en" },
    { value: "hi", label: "Hindi", path: "/hi" },
  ];

  const handleChange = (selectedOption: any) => {
    router.push(selectedOption.path);
  };

  return (
    <>
      <nav className="bg-white  w-full sticky z-50   top-0   ">
        <div className=" px-4 py-2">
          <div className="  flex flex-row justify-between items-center mx-auto  py-1  md:w-[95%] ">
            {/* small screen toggle menu button */}

            {/* logo and hamburger icon */}
            <div className="m-2  flex flex-row gap-4 ">
              <Link href="/">
                <Image
                  src="/layout/logo1.png"
                  alt="Logo"
                  width={35}
                  height={35}
                  className="h-auto w-auto"
                />
              </Link>

              <div className="w-30 max-md:hidden ">
                <Select
                  options={options}
                  defaultValue={options[0]}
                  onChange={handleChange}
                  unstyled
                  classNames={{
                    control: () =>
                      "flex items-center rounded-full border border-gray-300 bg-[#F4F4FC] px-3 py-1",

                    valueContainer: () => " text-[#4E4E4E] font-semibold",

                    menu: () =>
                      "mt-1 rounded-md border border-gray-200 bg-white shadow-lg",

                    option: ({ isFocused, isSelected }) =>
                      `px-3 py-2 text-sm cursor-pointer ${
                        isSelected
                          ? "bg-gray-200"
                          : isFocused
                            ? "bg-gray-100"
                            : ""
                      }`,

                    indicatorSeparator: () => "hidden",

                    dropdownIndicator: () => " ",
                  }}
                />
              </div>
            </div>

            {/* button and login */}

            <div className="flex flex-row justify-around items-center space-x-2 mx-2">
              {/* bell button */}
                  <EnglishNoti/>
              <ThemeToggle />
              {/* pro and basic */}
              <div className="  rounded-full px-4 flex flex-row gap-4 bg-[#FFE5F4] py-1.5 max-lg:hidden">
                <button className="flex text-xl  rounded-full px-4 bg-gradient-to-r from-[#9F38D6] to-[#D63895] space-x-2 py-1">
                  {" "}
                  <LuCrown className="my-auto text-white  size-5" />{" "}
                  <p className="my-auto text-white "> Pro Pass</p>
                </button>

                <button className="flex text-xl  rounded-full px-4   gap-2">
                  {" "}
                  <p className="my-auto "> Basic</p>
                </button>
              </div>

              {/* <FaBell className="size-5 " /> */}

              {status === "authenticated" ? (
                <div>
                  <button
                    className="px-6 py-0.5 pb-1  border-[#007076] rounded-lg bg-my-green text-white max-lg:text-md max-sm:px-2  max-md:hidden "
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-row gap-2  py-2">
                  <Link href={"/login"}>
                    <button
                      onClick={() => {
                        signIn();
                      }}
                      className=" px-6 py-0.5 pb-1   max-sm:px-2 dark:border-white dark:text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-full max-md:hidden "
                    >
                      Login
                    </button>
                  </Link>

                  <Link href={"/signup"}>
                    <button className="px-6 py-0.5 pb-1  border-[#007076] rounded-full bg-my-green text-white  max-lg:hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ">
                      Signup
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* right menu for small screens   */}
            <div className="flex flex-row md:hidden">
              <TbLanguageHiragana className="size-7 dark:text-white " />

              <div
                className="my-auto m-1 md:hidden "
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <RiMore2Fill className="size-8 dark:text-white " />
                ) : (
                  <IoClose className="size-8  dark:text-white " />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className=" border-t-1 border-b-1 border-[#DADADADD] max-md:hidden">
          <SmallNav />
        </div>
      </nav>

      {/* bottom nav for menu screens */}
      <div className="w-full  bg-[image:var(--color-my-gradient)] fixed z-50 bottom-0 md:hidden  rounded-t-2xl  ">
        <div className="flex flex-row  max-md:w-[90%] mx-auto justify-between py-1  ">
          <div className="flex flex-col">
            <Link href={"/current-affairs"}>
              <IoHome className="size-7 dark:text-white text-[#6C6C6C] " />
              <p className="text-my-text-color text-[12px] text-center">Home</p>
            </Link>
          </div>

          <div className="flex flex-col">
            <Link href={"/quiz"}>
              <MdOutlineLightbulb className="size-7 dark:text-white text-[#6C6C6C] " />
              <p className="text-my-text-color text-[12px] text-center">Quiz</p>
            </Link>
          </div>

          <div className="flex flex-col">
            <Link href={"/test-series"}>
              <LuClipboardList className="size-7 dark:text-white text-[#6C6C6C]" />
              <p className="text-my-text-color text-[12px] text-center">Test</p>
            </Link>
          </div>

          <div className="flex flex-col">
            <Link href={"/current-affairs"}>
              <LuNewspaper className="size-7 dark:text-white text-[#6C6C6C] " />
              <p className="text-my-text-color text-[12px] text-center">News</p>
            </Link>
          </div>

          {/* <div className="flex flex-col">
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
              <RiMore2Fill className="size-7 dark:text-white text-[#6C6C6C]" />
              <p className="text-my-text-color text-[12px] text-center">More</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* side menu for small screen  */}
      {isOpen ? <> </> : <EnglishMobMenu />}
    </>
  );
}

export default Nav;
