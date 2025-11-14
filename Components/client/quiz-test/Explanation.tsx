"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
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
  console.log(questions);
  return (
    <>
      <div className="max-sm:w-[100%] w-[95%]    rounded-2xl mx-auto px-6 mt-14  ">
        {/* vi qwuestrion asn wer  */}

        <div className="w-full mx-auto flex flex-row max-sm:flex-col-reverse justify-between   ">
          {/* Left div  */}

          <div className="flex flex-col border-2 border-[#E6F1F1] justify-start items-center  w-[65%] max-sm:w-full  max-sm:mt-6 rounded-2xl dark:bg-[#313131]">
            {/* top heaeding */}
            <div className="  flex flex-row justify-around items-center gap-12 w-full py-2">
              {/* timer and marks */}
              <div className="flex flex-row justify-between items-center  w-[45%] gap-1 ">
                <div className="flex flex-row justify-between items-center -mt-8  ">
                  <div
                    className="  min-w-[60px]  bg-white py-1  "
                    style={{
                      boxShadow:
                        "0 4px 10px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.15)",
                    }}
                  >
                    <p className="font-montserrat font-bold text-3xl max-sm:text-2xl shadow-black/80 text-[#007076] text-center">
                      {current < 10 ? "0" + Number(current + 1) : current}
                    </p>
                  </div>
                </div>

                <div className="">
                  <p className=" text-sm text-green-600 font-semibold">
                    {" "}
                    {q.marksPositive}{" "}
                    <span className="max-sm:hidden"> Marks </span>{" "}
                  </p>
                </div>

                <div className="">
                  <p className="text-sm  text-red-600  font-semibold">
                    {" "}
                    {q.marksNegative}{" "}
                    <span className="max-sm:hidden"> Negative Marks </span>
                  </p>
                </div>
              </div>

              {/* level */}
              <div className="bg-[#E6F1F1] px-4 py-1 rounded-2xl ">
                <p className="text-sm  font-semibold"> Level {q.level}</p>
              </div>
            </div>

            <div className="  flex flex-row justify-between items-stretch h-full w-full">
              {/* question and options  */}

              <div className="flex flex-col justify-between items-start w-full     ">
                {/* question  */}

                <div className="w-full px-4  min-h-[40vh] py-3 flex flex-row justify-between gap-2  max-sm:flex-col  ">
                  <p
                    className={`font-bold dark:text-white  ${q.questionImage ? " w-[55%] max-sm:w-full" : "null"} `}
                  >
                    {q.questionText}
                  </p>

                  {/* image have to fixed size */}
                  {q.questionImage ? (
                    <div className="relative  max-w-[400px] w-[40%] max-sm:w-full aspect-[16/9]   border-pink-500">
                      <Image
                        src={q.questionImage.toString()}
                        alt="question image"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : null}
                </div>

                {/* option */}

                <div className="flex flex-row justify-between items-stretch  border-red-300 w-full px-4 ">
                  <div
                    className={`max-sm:py-2 max-sm:w-full   mx-auto gap-6 w-full  py-4 ${q.options[0]?.image ? "flex flex-wrap justify-between " : "grid grid-cols-2"}`}
                  >
                    {q.options.map((opt, idx) => {
  const hasText = !!opt.text;
  const hasImage = !!opt.image;
  const hasBoth = hasText && hasImage;

  // ⭐ CASE 1: TEXT + IMAGE (NEW)
  if (hasBoth) {
    return (
      <div
        key={idx}
        onClick={() => handleSelect(idx)}
        className={`flex flex-col gap-2 max-w-[400px] w-[40%] hover:cursor-pointer`}
      >
        {/* TEXT ABOVE */}
        <p className="text-my-text-color text-left px-2">
          {opt.text}
        </p>

        {/* IMAGE BELOW */}
        <div
          className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden transition-all duration-200 ${
            correctAnswerIndex === idx
              ? "border-[#2CBB01] border-3"
              : userAnswerIndex === idx
              ? "border-[#FF0000] border-3"
              : ""
          }`}
        >
          <Image
            src={opt.image.toString()}
            alt="question option"
            fill
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  // ⭐ CASE 2: TEXT ONLY (unchanged)
  if (hasText) {
    return (
      <button
        key={idx}
        onClick={() => handleSelect(idx)}
        className={`px-3 py-3 border dark:border-white rounded-full flex flex-row justify-between text-my-text-color ${
          correctAnswerIndex === idx
            ? "bg-[#2CBB0126] border-[#2CBB0126]"
            : userAnswerIndex === idx
            ? "bg-[#FF000026] border-[#FF000026]"
            : "bg-transparent"
        }`}
      >
        <p className="text-left">{opt.text}</p>

        <FaRegCircle
          size={20}
          className={`${
            correctAnswerIndex === idx
              ? "bg-[#2CBB01] rounded-full text-[#2CBB01]"
              : userAnswerIndex === idx
              ? "bg-[#FF0000] rounded-full text-[#FF0000]"
              : ""
          }`}
        />
      </button>
    );
  }

  // ⭐ CASE 3: IMAGE ONLY (unchanged)
  return (
    <div
      key={idx}
      onClick={() => handleSelect(idx)}
      className={`relative max-w-[400px] w-[40%] aspect-[16/9] rounded-xl overflow-hidden hover:cursor-pointer transition-all duration-200 ${
        correctAnswerIndex === idx
          ? "border-[#2CBB01] border-3"
          : userAnswerIndex === idx
          ? "border-[#FF0000] border-3"
          : ""
      }`}
    >
      <Image
        src={opt.image.toString()}
        alt="question image"
        fill
        className="object-contain"
      />
    </div>
  );
})}

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right div */}

          <div className=" w-[32%] sm:self-stretch max-sm:w-full flex flex-col border-2 rounded-2xl border-[#E6F1F1]  dark:bg-[#313131] ">
            {/* topic and navigation */}
            <div className=" flex flex-row  justify-between items-center pb-3 px-4 py-4">
              <div className=" flex items-end ">
                <button className="px-4 py-2 bg-[#95DC7F]  rounded-full text-sm capitalize">
                  {topic}
                </button>
              </div>
            </div>

            {/* navigation  */}

            <div className=" h-full overflow-y-auto max-sm:overflow-x-auto">
              <div className="flex flex-row sm:flex-wrap sm:justify-center  items-center gap-2 ">
                {Array.from({ length: questions.length }, (_, idx) => {
                  const q = questions[idx];
                  const userAnswer = answers.find(
                    (a: any) => a.questionId === q.id
                  )?.answer;
                  const correctIndex = q.correctOption - 1;

                  let statusClass = "";
                  if (userAnswer === correctIndex) {
                    statusClass = "bg-[#2CBB01] text-white";
                  } else if (userAnswer != null) {
                    statusClass = "bg-[#FF0000] text-white";
                  } else {
                    statusClass = "bg-white dark:bg-[#313131]";
                  }

                  return (
                    <div key={idx}>
                      <button
                        onClick={() => handleOnClick(idx)}
                        className={`px-4 py-2  min-w-[50px]  border-1 border-[#6C6C6C] rounded-lg ${statusClass} `}
                      >
                        <p className="text-black dark:text-white"> {idx + 1}</p>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto flex flex-row sm:justify-end  py-6 ">
          {/* rightbox  */}

          <div className="border-2 rounded-2xl border-[#E6F1F1] w-[32%] max-sm:w-full flex flex-row justify-between items-center py-2 px-2 dark:bg-[#313131]">
            <button
              onClick={handlePrev}
              disabled={current === 0}
              className="bg-[#FFE332] py-2 px-4 rounded-full  flex flex-row items-center disabled:opacity-50 pl-2"
            >
              <MdKeyboardArrowLeft className="my-auto size-6" /> Prev
            </button>

            <button
              onClick={handleNext}
              disabled={current === questions.length - 1}
              className="bg-[#FFE332] py-2 px-4 rounded-full  flex flex-row items-center disabled:opacity-50 pr-2"
            >
              Next <MdKeyboardArrowRight className="my-auto size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* detail explanation  */}

      {/* Correct & User Chosen Answer */}
      <div className="w-[90%] py-4 dark:bg-[#313131] bg-[#FAFCFC] rounded-2xl mx-auto px-6 border-2 border-[#E6F1F1]">
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
          <p className="dark:text-white text-lg">Explanation: {q.solutionText}</p>
          {q.solutionImage ? (
            <div className="relative max-w-[400px] w-[40%] max-sm:w-full aspect-[16/9] ">
              <Image
                src={q.solutionImage.toString()}
                alt="solution image"
                fill
                className="object-contain"
              />
            </div>
          ) : null}
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
