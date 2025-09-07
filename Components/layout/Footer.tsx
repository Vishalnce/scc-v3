import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPhone } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

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

    {
      topic: "FAQ",
      link: "/",
    },
  ];

  return (
    <>
      <div className="bg-[#007076]">
        <div className="max-w-[1400px] mx-auto  w-[90%] ">
          <div className="flex flex-row justify-between items-start py-12 max-md:py-8 max-md:mb-10 ">
            {/* 1st box */}

            <div className="flex flex-col  w-[25%] max-md:w-[48%]">
              <div>
                <Image
                  src="/layout/footer/logo.png"
                  alt="kldsmf"
                  width={170}
                  height={50}
                />
              </div>

              <div>
                <p className="py-6 text-white text-sm font-light">
                  Your complete prepration platform for ssc cgl Exam.
                </p>
              </div>

              <div className="flex flex-row justify-between items-center gap-3 max-md:hidden">
                <Link href={"/"}>
                  <div>
                    <Image
                      src={"/layout/footer/yt.png"}
                      alt="youtube"
                      width={30}
                      height={30}
                    />
                  </div>
                </Link>

                <Link href={"/"}>
                  <div>
                    <Image
                      src={"/layout/footer/tele.png"}
                      alt="youtube"
                      width={30}
                      height={30}
                    />
                  </div>
                </Link>

                <Link href={"/"}>
                  <div>
                    <Image
                      src={"/layout/footer/wp.png"}
                      alt="youtube"
                      width={30}
                      height={30}
                    />
                  </div>
                </Link>
                <Link href={"/"}>
                  <div>
                    <Image
                      src={"/layout/footer/insta.png"}
                      alt="youtube"
                      width={30}
                      height={30}
                    />
                  </div>
                </Link>
                <Link href={"/"}>
                  <div>
                    <Image
                      src={"/layout/footer/fb.png"}
                      alt="youtube"
                      width={30}
                      height={30}
                    />
                  </div>
                </Link>
              </div>
            </div>

            {/* 2nd box */}

            <div className=" flex flex-row justify-between items-start text-white gap-4">
              {/*  */}
              <div className="flex flex-col max-md:hidden">
                <p className="py-2">Quick Links</p>

                {quickLinks.map((items, index) => (
                  <Link key={index} href={items.link}>
                    <p className="text-sm font-light py-1">{items.topic}</p>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col max-md:hidden">
                <p className="py-2">Concepts</p>

                {concepts.map((items, index) => (
                  <Link key={index} href={items.link}>
                    <p className="text-sm font-light py-1">{items.topic}</p>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col  ">
                <p className="py-2 max-md:text-center">Contact Us</p>

                <div className="flex flex-col max-md:items-center">
                  <div className="flex flex-row gap-2 py-2">
                    <FaPhone className="my-auto" />
                    <div className="flex flex-col">
                      <p className="text-sm font-light">9815591973</p>
                      <p className="text-sm font-light">7807960462</p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 py-1">
                    <MdOutlineMailOutline />
                    <p className="text-sm font-light">query@sscexamlife.Info</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-2   border-white flex flex-row justify-between items-center py-5 max-md:mb-10 max-md:hidden">
            <div className="flex flex-row gap-3">
              <div>
                <Link href={"/"} className="flex flex-row gap-2">
                  <span className="w-2 h-2 rounded-full bg-white my-auto"></span>
                  <p className="text-white text-sm font-light ">
                    Privacy Policy
                  </p>
                </Link>
              </div>

              <div>
                <Link href={"/"} className="flex flex-row gap-2">
                  <span className="w-2 h-2 rounded-full bg-white my-auto"></span>
                  <p className="text-white text-sm font-light">
                    Terms of Service
                  </p>
                </Link>
              </div>

              <div>
                <Link href={"/"} className="flex flex-row gap-2">
                  <span className="w-2 h-2 rounded-full bg-white my-auto"></span>
                  <p className="text-white text-sm font-light">Security</p>
                </Link>
              </div>

              <div>
                <Link href={"/"} className="flex flex-row gap-2">
                  <span className="w-2 h-2 rounded-full bg-white my-auto"></span>
                  <p className="text-white text-sm font-light">Site map</p>
                </Link>
              </div>
            </div>

            <div>
              <p className="text-white text-sm font-light">
                All Rights Reserved by sscexamlife.info
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
