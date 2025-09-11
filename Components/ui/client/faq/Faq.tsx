"use client";

import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type dataTypes = {
  ques: string;
  ans: string;
};

export default function Faq() {
  const data: dataTypes[] = [
    {
      ques: "What is SSC CGL ExamLife.info?",
      ans: "A portal for banking exam prep offering daily Current Affairs, Quizzes, and Test Series for exams like Bank PO and Clerk.",
    },
    {
      ques: "Which exams does the portal cover?",
      ans: "It covers Bank PO, Banking Clerk, and similar banking recruitment exams with tailored study materials and practice tests.",
    },
    {
      ques: "How often is Current Affairs updated?",
      ans: "Updated daily with relevant news, events, and updates crucial for banking exam success.",
    },
    {
      ques: "What topics do daily Quizzes include?",
      ans: "Quizzes cover Reasoning, Quantitative Aptitude, English, Banking Awareness, and General Knowledge for holistic preparation.",
    },
    {
      ques: "How does the Test Series work?",
      ans: "Online tests simulate real exams, followed by a detailed report card analyzing performance, accuracy, and time management.",
    },
    {
      ques: "What’s included in the report card?",
      ans: "It highlights sectional scores, weak areas, correct answers, and time spent per question for improvement tracking.",
    },
    {
      ques: "Is the portal free to use?",
      ans: "Most resources, including Quizzes and Current Affairs, are free. Test Series may require a subscription for full access.",
    },
    {
      ques: "Can I track my progress over time?",
      ans: "A portal for banking exam prep offering daily Current Affairs, Quizzes, and Test Series for exams like Bank PO and Clerk.",
    },
    {
      ques: "What is SSC CGL ExamLife.info?",
      ans: "Yes! Report cards and performance analytics help track progress, strengths, and areas needing revision.",
    },
  ];

  const [show, setShow] = useState<number | null>(null);

  const handleOnClick = (value: number) => {
    // toggle logic
    setShow((prev) => (prev === value ? null : value));
  };

  return (
    <>
      <header className="bg-[image:var(--color-my-gradient)] ">
        <div className="flex flex-col justify-center items-center min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <h1 className="text-3xl font-bold max-sm:text-2xl font-montserrat">
            <span className="text-my-green">FAQs: </span>Your Ultimate Guide to
            Mastering SSC CGL!
          </h1>
          <p className="mt-1 text-sm max-sm:text-xs text-my-text-color">
            Explore Answers to Common Questions and Accelerate Your Exam
            Preparation Journey with Ease!
          </p>
        </div>
      </header>

      <main className="bg-white dark:bg-black ">
        <div className=" max-w-[1400px] mx-auto  ">
          <div className=" py-8 w-[90%] mx-auto gap-2 space-y-6">
            {/* card */}

            {data.map((item, index) => (
              <div
                key={index}
                onClick={() => handleOnClick(index)} // ✅ callback, not direct call
                className="border-1 border-[#E6F1F1] bg-[#FAFCFC] cursor-pointer dark:bg-[#313131] dark:border-white px-3"
              >
                <div className="flex flex-row justify-between items-center py-2 pt-3">
                  <span className="text-xl font-semibold dark:text-white">
                    {index + 1}. {item.ques}
                  </span>
                  <div className="dark:text-white">

                    {(show === index) ? <MdKeyboardArrowUp className="size-8" /> :  <MdKeyboardArrowDown className="size-8" />  }

                    
                    </div>
                  
                </div>

                {show === index && (
                  <div className="py-2">
                    <p className="text-my-text-color sm:pl-7">{item.ans}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

// <div className="border-1 border-[#E6F1F1] bg-[#FAFCFC]">
//   {/* ques card */}
//   <div className="  flex flex-row justify-between items-center py-2 pt-3">
//     {/* left side */}
//     <ol className="">
//       <li className="text-xl font-semibold">What is SSC CGL ExamLife.info?</li>
//     </ol>

//     {/* right side */}

//     <div className="">
//       <MdKeyboardArrowDown className="size-8" />
//     </div>
//   </div>

//   {/* ans card  */}

//   <div className=" py-2 ">
//     <p className="text-my-text-color pl-7">
//       A portal for banking exam prep offering daily Current Affairs, Quizzes,
//       and Test Series for exams like Bank PO and Clerk.
//     </p>
//   </div>
// </div>;
