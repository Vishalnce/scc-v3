import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";

function What() {
  const cards = [
    {
      border: "border-[#87D5E2]",
      bg: "bg-[#F8FBFF]",
      bgIcon: "bg-[#24B3CB]",
      checkbg: "bg-[#E9F3FF]",
      checktext: "text-[#24B3CB]",
      heading: "Quantitative Aptitude",

      text1: "Calculation speed training",
      text2: "Trap-based questions practice",
      text3: "Real SSC exam difficulty",
    },

    {
      border: "border-[#93E4A6] ",
      bg: "bg-[#F6FFF3]",
      bgIcon: "bg-[#11C352]",
      checkbg: "bg-[#EBFFE4]",
      checktext: "text-[#11C352]",
      heading: "Reasoning and GI",
      text1: "Full SSC logic syllabus coverage",
      text2: "Focus on accuracy & pattern mastery",
      text3: "Visual reasoning questions included",
    },
    {
      border: "border-[#E6C69C] ",
      bg: "bg-[#FFFDFA]",
      bgIcon: "bg-[#F89716]",
      checkbg: "bg-[#FFF1DF]",
      checktext: "text-[#F89716]",
      heading: "Reasoning and GI",
      text1: "Error spotting mastery",
      text2: "Vocabulary & idioms focus",
      text3: "Reading comprehension practice",
    },
    {
      border: "border-[#E8A2CB] ",
      bg: "bg-[#FCF4F8]",
      bgIcon: "bg-[#D63895]",
      checkbg: "bg-[#FFE5F4]",
      checktext: "text-[#D63895]",
      heading: "General Awareness",
      text1: "Static GK coverage",
      text2: "Current affairs updates",
      text3: "SSC-focused, no irrelevant facts",
    },

    {
      border: "border-[#C796E4] ",
      bg: "bg-[#F9F0FF]",
      bgIcon: "bg-[#9F38D6]",
      checkbg: "bg-[#F3E6FF]",
      checktext: "text-[#9F38D6]",
      heading: "Computer Knowledge",
      text1: "Basics of computers & hardware",
      text2: "MS Office, Internet & fundamentals",
      text3: "SSC-relevant questions only",
    },

    
    {
      border: "border-[#E38688] ",
      bg: "bg-[#FFF4F4]",
      bgIcon: "bg-[#F14343]",
      checkbg: "bg-[#FDE9E9]",
      checktext: "text-[#F14343]",
      heading: "Speed Test",
      text1: "Speed & accuracy improvement",
      text2: "Real SSC exam typing format",
      text3: "English & Hindi practice sets",
    },
  ];

  return (
    <>
      <div className=" mx-auto    flex rounded-xl flex-col shadow-[0_0_9px_rgba(0,0,0,0.2)] md:px-8 py-2">
        <div
          className=" w-full flex  flex-col my-4 
                  md:px-8"
        >
          {/* heading */}
          <div className="flex flex-col my-4">
            <p className="font-bold text-2xl">What You’ll Practice</p>
            <p className="text-[#6F6F6F]">
              Comprehensive coverage across all SSC CGL subjects
            </p>
          </div>

          {/* cards */}

          <div className=" grid grid-cols-2 max-md:grid-cols-1 gap-6   ">
            {/* card 1 */}

            {cards.map((item, index) => (
              <div
                key={item.text1}
                className={`  max-md:w-[90%] rounded-2xl ${item.bg} ${item.border} border-2 max-md:mx-auto `}
              >
                {/* heading  */}
                <div
                  className={`w-full  flex items-center px-8 py-4  rounded-t-2xl gap-6 max-md:gap-4 `}
                >
                  {/* icon */}

                  <div
                    className={`rounded-xl ${item.bgIcon}  p-2 sm:p-3  flex items-center justify-center`}
                  >
                    <VscGraph className={`  text-white size-6 md:size-8`} />
                  </div>

                  <div>
                    <p className="font-semibold text-xl max-md:text-lg">
                      {item.heading}
                    </p>
                  </div>
                </div>

                {/* boady  */}

                <div className=" px-8 py-4  flex flex-col gap-2">
                  <div className=" flex flex-row gap-2">
                    <div className={`p-2  ${item.checkbg} rounded-full`}>
                      <FaCheck
                        className={`my-auto ${item.checktext}  flex-none `}
                      />
                    </div>

                    <p className=" text-[#6F6F6F]">{item.text1} </p>
                  </div>

                  <div className=" flex flex-row gap-2">
                    <div className={`p-2  ${item.checkbg} rounded-full`}>
                      <FaCheck
                        className={`my-auto ${item.checktext}  flex-none `}
                      />
                    </div>

                    <p className=" text-[#6F6F6F]">{item.text2}</p>
                  </div>

                  <div className=" flex flex-row gap-2">
                    <div className={`p-2  ${item.checkbg} rounded-full`}>
                      <FaCheck
                        className={`my-auto ${item.checktext}  flex-none `}
                      />
                    </div>

                    <p className=" text-[#6F6F6F]">{item.text3}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default What;
