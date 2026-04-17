"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { IoCheckmarkCircle, IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type Props = {
  questions: any;
  answers: any;
  topic: string;
};

export default function Explanation({ questions, answers, topic }: Props) {
  const [current, setCurrent] = useState(0);

  const q = questions[current];
  const userAnswerObj = answers.find((a: any) => a.questionId === q.id);
  const userAnswerIndex = userAnswerObj?.answer; // 0-based from answers
  const correctAnswerIndex = q.correctOption - 1; // normalize to 0-based

  // Marks and status for current question
  let marksEarned = 0;
  let status = "";

  if (userAnswerIndex === correctAnswerIndex) {
    marksEarned = q.marksPositive ?? 0;
    status = " Correct";
  } else if (userAnswerIndex == null) {
    marksEarned = 0;
    status = " Not Attempted";
  } else {
    marksEarned = q.marksNegative ?? 0;
    status = " Incorrect";
  }

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };
  const handleOnClick = (index: number) => {
    setCurrent(index);
  };

  const handleSelect = (optionIndex: number) => {};

  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <>
      <div className="max-sm:w-[100%] w-[95%]    rounded-2xl mx-auto px-6 mt-14  ">
        {/* vi qwuestrion asn wer  */}

        <div className="w-full mx-auto flex flex-row max-sm:flex-col-reverse justify-between   ">
          {/* left div */}

          <div className="w-[32%]  max-sm:w-full flex flex-col border-2 rounded-2xl shadow-[0_0_9px_rgba(0,0,0,0.2)] border-[#E6F1F1] dark:bg-[#313131]">
            {/* Header */}
            <div className=" hidden md:flex justify-center  px-4 py-4">
              <p className="font-bold text-lg">
                Total Question: {questions.length}
              </p>
            </div>

            {/* ================= DESKTOP ================= */}
            <div className="hidden md:block overflow-y-auto px-2 pb-4  w-[80%] mx-auto">
              <div className="flex flex-wrap justify-center items-start gap-4 min-h-[300px]">
                {questions.map((q: any, idx: any) => {
                  const userAnswer = answers.find(
                    (a: any) => a.questionId === q.id,
                  )?.answer;

                  const correctIndex = q.correctOption - 1;

                  let statusClass =
                    "bg-white dark:bg-[#2a2a2a] text-black dark:text-white"; // not answered

                  if (userAnswer === correctIndex) {
                    statusClass = "bg-[#2CBB01] text-white"; // correct
                  } else if (userAnswer != null) {
                    statusClass = "bg-[#FF0000] text-white"; // wrong
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOnClick(idx)}
                      className={`px-4 py-2 min-w-[50px] rounded-lg border border-[#6C6C6C] text-lg font-medium transition-all ${statusClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className=" flex flex-col justify-start gap-2 my-4">
                <div className="flex flex-row gap-2">
                  <IoCheckmarkCircle className="size-6 text-[#11C352]" />{" "}
                  <p className="font-bold"> Correct </p>
                </div>
                <div className="flex flex-row gap-2">
                  <IoCheckmarkCircle className="size-6 text-[#F14343]" />{" "}
                  <p className="font-bold"> Incorrect </p>
                </div>
                <div className="flex flex-row gap-2">
                  <IoCheckmarkCircleOutline className="size-6 " />{" "}
                  <p className="font-bold"> Unanswered </p>
                </div>
              </div>
            </div>

            <div
              className={`sm:hidden fixed bottom-8 left-0 w-full bg-white dark:bg-[#1e1e1e]   z-40 transform transition-all duration-300 pb-6 rounded-t-2xl  `}
            >
              {/* CLICK AREA (always visible) */}
              <div
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="w-full py-4 text-center font-semibold dark:text-white flex justify-center gap-2  cursor-pointer "
              >
                Questions ({questions.length})
                <IoIosArrowUp
                  className={`transition-transform duration-300 my-auto ${
                    isNavOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* CONTENT (only visible when open) */}
              {isNavOpen && (
                <>
                  {/* grid */}
                  <div className="  p-4 border-2 border-[#D0D0D0] ">
                    <div className="flex flex-wrap items-center justify-center gap-4  max-h-[30vh] overflow-y-auto ">
                      {questions.map((q: any, idx: any) => {
                        const userAnswer = answers.find(
                          (a: any) => a.questionId === q.id,
                        )?.answer;

                        const correctIndex = q.correctOption - 1;

                        let statusClass =
                          "dark:bg-[#2a2a2a] text-black dark:text-white";

                        if (userAnswer === correctIndex) {
                          statusClass = "bg-[#11C352] text-white";
                        } else if (userAnswer != null) {
                          statusClass = "bg-[#F14343] text-white";
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleOnClick(idx)}
                            className={`px-4 py-2 min-w-[50px] rounded-lg border border-[#6C6C6C]  font-medium ${statusClass}`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* legend */}
                  <div className="flex justify-center gap-4 pb-2 pt-1 my-4  ">
                    <div className="flex items-center gap-1">
                      <IoCheckmarkCircle className="text-[#11C352]" />
                      Correct
                    </div>
                    <div className="flex items-center gap-1">
                      <IoCheckmarkCircle className="text-[#F14343]" />
                      Incorrect
                    </div>
                    <div className="flex items-center gap-1">
                      <IoCheckmarkCircleOutline />
                      Unanswered
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* right div  */}

          <div className="shadow-[0_0_9px_rgba(0,0,0,0.2)] rounded-2xl my-2 w-[65%] max-md:w-full">
            {/* Header (NO TIMER) */}
            <div className="flex flex-row justify-between py-3 px-4">
              <p className="capitalize bg-[#FFE5F4] px-3 py-1 rounded-md">
                {topic}
              </p>

            </div>

            {/* Main Content */}
            <div className="flex flex-col dark:bg-[#313131] rounded-2xl pb-4">
              {/* Top Row */}
              <div className="flex justify-between items-center px-4">
                {/* Level */}
                <div className="px-4 py-1 rounded-2xl bg-[#F6FFF3]">
                  <p className="text-sm font-semibold capitalize text-[#11C352]">
                    Level {q.level}
                  </p>
                </div>

                {/* Marks */}
                <div className="flex gap-2">
                  <p className="w-[50px] text-center text-sm font-semibold bg-[#EBFFE4] text-[#11C352] border p-2">
                    +{q.marksPositive}
                  </p>
                  <p className="w-[50px] text-center text-sm font-semibold bg-[#FDE9E9] text-[#F14343] border p-2">
                    -{q.marksNegative}
                  </p>
                </div>
              </div>

              {/* Question */}
              <div className="w-full px-4 py-3">
                <p className="font-bold dark:text-white">
                  {" "}
                  Question {current + 1}: {q.questionText}
                </p>

                {q.questionImage && (
                  <div className="relative mt-2 aspect-[16/9]">
                    <Image
                      src={q.questionImage.toString()}
                      alt="question"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
              <p className=" px-4 text-xl "> Options:- </p>

              {/* Options */}
              <div className="w-full px-4 py-4">
                <div
                  className={`gap-4 ${
                    q.options[0]?.image
                      ? "flex flex-wrap justify-between"
                      : "grid grid-cols-1"
                  }`}
                >
                  {q.options.map((opt: any, idx: number) => {
                    const hasText = !!opt.text;
                    const hasImage = !!opt.image;
                    const hasBoth = hasText && hasImage;

                    const isCorrect = correctAnswerIndex === idx;
                    const isUser = userAnswerIndex === idx;

                    // status styling
                    let borderStyle = "";
                    let bgStyle = "";

                    if (isCorrect) {
                      borderStyle = "border-4 border-[#2CBB01]";
                      bgStyle = "bg-[#2CBB0126]";
                    } else if (isUser) {
                      borderStyle = "border-4 border-[#FF0000]";
                      bgStyle = "bg-[#FF000026]";
                    }

                    // TEXT + IMAGE
                    if (hasBoth) {
                      return (
                        <div key={idx} className="w-[45%] flex flex-col gap-2">
                          <p className="text-my-text-color">{opt.text}</p>

                          <div
                            className={`relative aspect-[16/9] rounded-xl overflow-hidden ${borderStyle}`}
                          >
                            <Image
                              src={opt.image}
                              alt="option"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      );
                    }

                    // TEXT ONLY
                    if (hasText) {
                      return (
                        <div
                          key={idx}
                          className={`px-4 py-3 rounded-xl  flex justify-between shadow-[0_0_9px_rgba(0,0,0,0.2)] ${bgStyle}`}
                        >
                          <p className="dark:text-white">{opt.text}</p>

                          <FaRegCircle
                            className={`${
                              isCorrect
                                ? "text-[#2CBB01]"
                                : isUser
                                  ? "text-[#FF0000]"
                                  : ""
                            }`}
                          />
                        </div>
                      );
                    }

                    // IMAGE ONLY
                    return (
                      <div
                        key={idx}
                        className={`relative w-[45%] aspect-[16/9] rounded-xl overflow-hidden ${borderStyle}`}
                      >
                        <Image
                          src={opt.image}
                          alt="option"
                          fill
                          className="object-contain"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation only (NO SUBMIT) */}
            <div className="flex px-4 py-4 justify-between">
              <button
                onClick={handlePrev}
                disabled={current === 0}
                className="bg-[#047077] w-[45%] py-2 rounded-xl text-white disabled:opacity-50"
              >
                Prev
              </button>

              <button
                onClick={handleNext}
                disabled={current === questions.length - 1}
                className="bg-[#047077] w-[45%] py-2 rounded-xl text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

      
      </div>

      {/* detail explanation  */}

      {/* Correct & User Chosen Answer */}
      <div className="w-[90%] py-4 dark:bg-[#313131]  rounded-2xl mx-auto px-6 my-6 shadow-[0_0_9px_rgba(0,0,0,0.2)]">
        <p className="text-lg font-bold  max-md:py-2">Explanation :- </p>
        <div className={`flex flex-col  gap-4 `}>
          {/* Correct Answer */}
          <div className="flex flex-row items-center gap-3 dark:text-white font-bold">
            <span>Correct Answer:</span>
            {q.options[correctAnswerIndex]?.image ? (
              <div className="relative w-[250px] max-sm:w-[220px] h-[140px] rounded-xl overflow-hidden border-2 border-green-600 flex-shrink-0">
                <Image
                  src={q.options[correctAnswerIndex].image.toString()}
                  alt="Correct answer image"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <span className="italic text-gray-500">
                {q.options[correctAnswerIndex]?.text || "No answer available"}
              </span>
            )}
          </div>

          {/* User's Chosen Answer */}
          <div className="flex flex-row items-center gap-3 dark:text-white font-bold">
            <span>Your Chosen Answer:</span>

            {userAnswerIndex == null ? (
              <span className="italic text-gray-500">Not Attempted</span>
            ) : q.options[userAnswerIndex]?.image ? (
              <div
                className={`relative w-[250px] max-sm:w-[220px] h-[140px] rounded-xl overflow-hidden border-2 flex-shrink-0 ${
                  userAnswerIndex === correctAnswerIndex
                    ? "border-green-600"
                    : "border-red-600"
                }`}
              >
                <Image
                  src={q.options[userAnswerIndex].image.toString()}
                  alt="User chosen answer image"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <span
                className={
                  userAnswerIndex === correctAnswerIndex
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {q.options[userAnswerIndex]?.text || "No answer available"}
              </span>
            )}
          </div>
        </div>

        {/* Explanation Section - KEEP AS IS */}
        <div className="py-4">
          <div
            className="dark:text-white text-lg prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: q.solution || "",
            }}
          />
        </div>
      </div>

      {/* 
      <div className="flex flex-row items-center gap-3 dark:text-white font-bold">
  <span>Correct Answer:</span>
  {q.options[correctAnswerIndex]?.image ? (
    <Image
      src={q.options[correctAnswerIndex].image.toString()}
      alt="Correct answer image"
      width={250}
      height={140}
      className="rounded-xl border-2 border-green-600 object-contain flex-shrink-0"
    />
  ) : (
    <span className="italic text-gray-500">
      {q.options[correctAnswerIndex]?.text || "No answer available"}
    </span>
  )}
</div>

      */}
    </>
  );
}
