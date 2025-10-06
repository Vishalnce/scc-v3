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
    status = "✅ Correct";
  } else if (userAnswerIndex == null) {
    marksEarned = 0;
    status = "⚪ Not Attempted";
  } else {
    marksEarned = q.marksNegative ?? 0;
    status = "❌ Incorrect";
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

  return (
    <>
      <div className="max-sm:w-[100%] w-[95%] py-4 dark:bg-[#313131] bg-[#FAFCFC] rounded-2xl mx-auto px-6 mt-14  border-[#E6F1F1]">
        {/* vi qwuestrion asn wer  */}

        <div className="w-full mx-auto flex flex-row max-sm:flex-col-reverse justify-between   ">
          {/* Left div  */}

          <div className="flex flex-col justify-start items-center  w-[65%] max-sm:w-full border-2 max-sm:mt-6">
            {/* top heaeding */}
            <div className="  flex flex-row justify-around items-center gap-12 w-full">
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

            <div className="border-2  flex flex-row justify-between items-stretch h-full w-full">
              {/* question and options  */}

              <div className="flex flex-col justify-between items-start w-full     ">
                {/* question  */}

                <div className="w-full px-4  min-h-[40vh] py-3 flex flex-row justify-between gap-2 border-2 max-sm:flex-col  ">
                  <p
                    className={`font-bold dark:text-white border-2 ${q.questionImage ? " w-[55%] max-sm:w-full" : "null"} `}
                  >
                    {q.questionText}
                  </p>

                  {/* image have to fixed size */}
                  {q.questionImage ? (
                    <div className="relative  max-w-[400px] w-[40%] max-sm:w-full aspect-[16/9]  border-2 border-pink-500">
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

                <div className="flex flex-row justify-between items-stretch border-2 border-red-300 w-full px-4 ">
                  <div
                    className={`max-sm:py-2 max-sm:w-full   mx-auto gap-6 w-full  py-4 ${q.options[0]?.image ? "flex flex-wrap justify-between " : "grid grid-cols-2"}`}
                  >
                    {q.options.map(
                      (opt: { text: string; image: string }, idx: number) =>
                        opt.text ? (
                          <button
                            key={idx}
                            onClick={() => handleSelect(idx)}
                            className={`px-3 py-3 border dark:border-white rounded-full flex flex-row justify-between `}
                          >
                            <p className="text-my-text-color max-lg:text-sm">
                              {opt.text}
                            </p>

                            <div className=" my-auto">
                              <FaRegCircle
                                size="22"
                                className={`text-my-text-color rounded-full ${
                                  answers[current].answer === idx
                                    ? "bg-[#6C6C6C]"
                                    : ""
                                } `}
                              />
                            </div>
                          </button>
                        ) : (
                          <div
                            className="relative  max-w-[400px] w-[40%] aspect-[16/9]  hover:cursor-pointer border-2 border-[#6C6C6C] "
                            key={idx}
                            onClick={() => handleSelect(idx)}
                          >
                            <Image
                              src={opt.image.toString()}
                              alt="question image"
                              fill
                              className={`object-contain ${
                                answers[current].answer === idx
                                  ? "border-4 border-[#6C6C6C] "
                                  : ""
                              }`}
                            />
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right div */}

          <div className="border-2 border-red-500 w-[32%] sm:self-stretch max-sm:w-full flex flex-col   ">
            {/* topic and navigation */}
            <div className="border-2 flex flex-row  justify-between items-center pb-3 ">
              <div className=" flex items-end ">
                <button className="px-4 py-2 bg-[#95DC7F]  rounded-full text-sm">
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
                    statusClass = "bg-gray-200";
                  }

                  return (
                    <div key={idx}>
                      <button
                        onClick={() => handleOnClick(idx)}
                        className={`px-4 py-2 border min-w-[50px] border-[#6C6C6C] rounded ${statusClass}`}
                      >
                        {idx + 1}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto flex flex-row sm:justify-end  border-2 ">
          {/* left box  */}

          {/* rightbox  */}

          <div className="border-2 w-[32%] max-sm:w-full flex flex-row justify-between items-center py-2 px-2">
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

      <div className="w-[90%] py-4 dark:bg-[#313131] bg-[#FAFCFC] rounded-2xl mx-auto px-6 mt-14 border-2 border-[#E6F1F1]">
        <div className="flex flex-col items-start ">
          <div className="flex flex-col">
            <span className="font-bold dark:text-white">
              Correct Answer : {q.options[correctAnswerIndex]?.text}
            </span>
            <span className="font-bold dark:text-white">
              Your Choose Answer :{" "}
              {userAnswerIndex !== null && userAnswerIndex !== undefined
                ? q.options[userAnswerIndex]?.text
                : "Not Attempted"}
            </span>
          </div>

          <p className="py-4">
            <p className=" dark:text-white"> Explanation : {q.solutionText} </p>

            {q.solutionImage ? (
              <div className="relative  max-w-[400px] w-[40%] max-sm:w-full aspect-[16/9]  border-2 border-pink-500">
                <Image
                  src={q.questionImage.toString()}
                  alt="question image"
                  fill
                  className="object-contain"
                />
              </div>
            ) : null}

           
          </p>
        </div>
      </div>
    </>
  );
}
