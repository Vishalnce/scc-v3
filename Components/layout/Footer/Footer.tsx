import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPhone } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import TouchBanner from "./TouchBanner";


export default function Footer() {
  const quickLinks = [
    {
      topic: "Current Affairs",
      link: "/",
    },
    {
      topic: "One Liner Current Affairs",
      link: "/",
    },
    {
      topic: "Quiz",
      link: "/",
    },
    {
      topic: "Syllabus",
      link: "/",
    },
    {
      topic: "Test series",
      link: "/",
    },

    {
      topic: "Upcoming Exams",
      link: "/",
    },

    {
      topic: "Blogs",
      link: "/",
    },
  ];

  const concepts = [
    {
      topic: "Quantitative Apptitude",
      link: "/",
    },
    {
      topic: "English Language",
      link: "/",
    },
    {
      topic: "General Intelligence & Reasoning",
      link: "/",
    },
    {
      topic: "General Awareness",
      link: "/",
    },
    {
      topic: "Computer Knowledge",
      link: "/",
    },

    {
      topic: "Data Entry Typing Test",
      link: "/",
    },
  ];

  const quiz = [
    {
      topic: "Quantitative Apptitude",
      link: "/",
    },
    {
      topic: "English Language",
      link: "/",
    },
    {
      topic: "General Intelligence & Reasoning",
      link: "/",
    },
    {
      topic: "General Awareness",
      link: "/",
    },
    {
      topic: "Computer Knowledge",
      link: "/",
    },

    {
      topic: "Data Entry Typing Test",
      link: "/",
    },
  ];

  return (
    <>
      <div className="bg-[#E6F1F2]">
        <div className="max-w-[1400px] mx-auto  w-[90%] ">
          <div className="flex flex-row justify-between max-md:flex-col items-start py-12 max-md:py-8  ">
            {/* 1st box */}

            <div className="flex flex-col  w-[40%] max-md:w-[100%]  ">
              {/* image */}
              <div className="">
                <Image
                  src="/layout/logo1.png"
                  alt="kldsmf"
                  width={170}
                  height={50}
                />
              </div>

              {/* description  */}
              <div className="text-[#6F6F6F] ">
                <p className="py-6  text-md  w-[70%] font-normal  max-md:w-[90%]">
                  SSC ExamLife is a part of the ExamLife Series. Your complete
                  prepration platform for ssc cgl Exam..
                </p>
                <div className="flex flex-row gap-2 py-2 ">
                  <FaPhone className="my-auto size-6" />

                  <p className=" font-normal">
                    9815591973 <span className="px-1"> /</span>
                  </p>
                  <p className=" font-normal"> 7807960462</p>
                </div>
                <div className="flex flex-row gap-2 py-1">
                  <MdOutlineMailOutline className="my-auto font-normal size-6" />
                  <p className="font-normal">query@sscexamlife.Info</p>
                </div>
              </div>

              {/* links */}

              <div className="">
                <TouchBanner />
              </div>
            </div>

            {/* 2nd box */}

            <div className=" flex flex-row max-md:flex-col max-md:w-[100%] justify-between items-start  gap-4  w-[60%]">
              {/*  */}
              <div className="flex flex-col">
                <p className="py-2 font-bold"> Concepts </p>

                {concepts.map((items, index) => (
                  <Link key={index} href={items.link}>
                    <p className=" text-[#6F6F6F]  py-1">{items.topic}</p>
                  </Link>
                ))}
              </div>

              {/* quiz  */}

              <div className="flex flex-col">
                <p className="py-2 font-bold">Quiz</p>

                {quiz.map((items, index) => (
                  <Link key={index} href={items.link}>
                    <p className=" text-[#6F6F6F] py-1">{items.topic}</p>
                  </Link>
                ))}
              </div>

              {/* Quick LInks  */}

              <div className="flex flex-col">
                <p className="py-2 font-bold">Quick Links</p>

                {quickLinks.map((items, index) => (
                  <Link key={index} href={items.link}>
                    <p className=" text-[#6F6F6F] py-1">{items.topic}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* last banner */}
      <div className="bg-[#047077]">
        <div className="max-w-[1400px] mx-auto  w-[90%] bg-[#047077] ">
          <div className="   border-white flex flex-row text-white  justify-between items-center py-5 max-md:mb-10 ">
            <div className="flex flex-row gap-3 ">
              <div className="">
                <Link href={"/"} className="flex flex-row gap-2">
                  <span className="w-2 h-2 rounded-full bg-white my-auto"></span>
                  <p className=" text-sm font-light max-md:text-xs ">Privacy Policy</p>
                </Link>
              </div>

              <div>
                <Link href={"/"} className="flex flex-row gap-2">
                  <span className="w-2 h-2 rounded-full bg-white my-auto"></span>
                  <p className=" text-sm font-light max-md:text-xs ">Terms of Service</p>
                </Link>
              </div>

              <div>
                <Link href={"/"} className="flex flex-row gap-2">
                  <span className="w-2 h-2 rounded-full bg-white my-auto"></span>
                  <p className=" text-sm font-light max-md:text-xs">Security</p>
                </Link>
              </div>

              <div>
                <Link href={"/"} className="flex flex-row gap-2">
                  <span className="w-2 h-2 rounded-full bg-white my-auto"></span>
                  <p className=" text-sm font-light">Site map</p>
                </Link>
              </div>
            </div>

            <div className="max-md:hidden">
              <p className=" text-sm font-light">
                All Rights Reserved by sscexamlife.info
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
