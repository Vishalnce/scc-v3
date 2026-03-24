"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { FaRegCircle } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { GoClock } from "react-icons/go";
import { CiStopwatch } from "react-icons/ci";

type Option = {
  text: string;
  image: string;
};

type Question = {
  id: string;
  quizId: number;
  questionText: string;
  questionImage: string;
  options: Option[];
  solutionText: string;
  solutionImage: string;
  correctOption: number; // 1-based index
  marksPositive: number;
  marksNegative: number; // negative value
  level: string;
  createdAt: string;
  updatedAt: string;
};

type Answer = {
  questionId: string;
  answer: number | null; // 0-based index or null
};

type Props = {
  questions: Question[];
  answers: Answer[];
  timeTaken: number;
  timeLimit: number;
  quizId: number;
  onRestart: () => void;
};

export default function MarksCard({
  questions,
  answers,
  timeTaken,
  timeLimit,
  onRestart,
  quizId,
}: Props) {
  // Calculate total maximum positive marks
  const totalMarks = questions.reduce(
    (sum, q) => sum + (q.marksPositive ?? 0),
    0
  );

let correctMarks = 0;
let incorrectMarks = 0;
let correctCount = 0;
let incorrectCount = 0;
let notAttemptedCount = 0;

questions.forEach((question) => {
  const userAnswer = answers.find(
    (a) => a.questionId === question.id
  )?.answer;

  // ✅ FIXED INDEX
  const correctIndex = question.correctOption - 1;

  if (userAnswer === correctIndex) {
    correctMarks += Number(question.marksPositive ?? 0);
    correctCount++;
  } else if (userAnswer != null) {
    const rawNegative = Number(question.marksNegative ?? 0);
    const negative = rawNegative > 0 ? -rawNegative : rawNegative;

    incorrectMarks += negative;
    incorrectCount++;
  } else {
    notAttemptedCount++;
  }
});

const totalScore = Number((correctMarks + incorrectMarks).toFixed(2));

  const { data } = useSession();
  const didSaveRank = useRef(false);

  useEffect(() => {
    if (didSaveRank.current) return;
    if (
      !data?.user?.name ||
      !questions.length ||
      correctMarks === undefined ||
      totalMarks === undefined ||
      timeTaken === undefined
    )
      return;

    didSaveRank.current = true;

    async function rankCard() {
      const rankObj = {
        name: data?.user.name,
        quizId,
        score: totalScore,
        maxMarks: totalMarks,
        timeTaken,
      };

      try {
        const res = await fetch("/api/en/rankCard/client", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rankObj),
        });
        if (!res.ok) throw new Error("Failed to save rank");
        const savedRank = await res.json();
        console.log("Rank saved successfully:", savedRank);
      } catch (error) {
        console.error("Error saving rank:", error);
        didSaveRank.current = false;
      }
    }

    rankCard();
  }, [data, questions, correctMarks, totalMarks, timeTaken, quizId, totalScore]);

  // Format numbers with two decimal places
  const formatNumber = (num: number) => num.toFixed(2);

  return (
    <>
      <div className="w-[90%] bg-[#FAFCFC] border-2 mx-auto flex flex-col items-center dark:bg-[#313131] py-6 border-[#E6F1F1] rounded-2xl ">
        <div
          className="-mt-14 rounded-full p-3 bg-white"
          style={{
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.15)",
          }}
        >
          <Image
            src={"/ui/client/current-affaris-page/party.svg"}
            alt="party"
            width={50}
            height={50}
          />
        </div>

        <div className="py-4">
          <p className="font-bold dark:text-white text-xl max-sm:text-center max-sm:px-4">
            Congratulations!!! Your Score Card is Here
          </p>
        </div>

        <div className="flex flex-row max-sm:flex-col gap-4 items-center justify-center ">
          <div className="flex flex-row gap-1  dark:text-white">
            <CiStopwatch className="size-7 my-auto " />
            <p className="text-lg ">
              Time Taken:{" "}
              {timeTaken < 60
                ? `${timeTaken.toFixed(2)} seconds`
                : `${Math.floor(timeTaken / 60)} minutes`}
            </p>
          </div>

          <div className="flex flex-row gap-1 dark:text-white ">
            <GoClock className="size-6 my-auto " />
            <p className="text-lg"> Time Duration: {timeLimit} m</p>
          </div>
        </div>

        {/* report card */}
        <div className="w-[90%] mx-auto flex flex-row max-sm:flex-col justify-around items-center py-8 max-sm:gap-4">
          {/* left div  */}
          <div className="w-[35%] flex flex-col px-4 gap-1 bg-white rounded-2xl py-2  max-sm:w-full dark:bg-black dark:text-white ">
            <div className="flex flex-row justify-between items-center py-1">
              <div className="flex flex-row  gap-1">
                <FaRegCircle className="my-auto   size-5" /> <p>Total Marks</p>
              </div>

              <p>{formatNumber(totalMarks)}</p>
            </div>

            <div className="flex flex-row justify-between items-center  py-1">
              <div className="flex flex-row  gap-1">
                <FaRegCircle className="my-auto    size-5 bg-[#2CBB01] rounded-full text-[#2CBB01]" />{" "}
                <p>Marks Obtained</p>
              </div>

              <p>{formatNumber(totalScore)}</p>
            </div>
            <div className="flex flex-row justify-between items-center  py-1">
              <div className="flex flex-row gap-1 ">
                <FaRegCircle className="my-auto   size-5  bg-[#FF0000] rounded-full text-[#FF0000]" />{" "}
                <p>Negative Marks</p>
              </div>

              <p>{formatNumber(incorrectMarks)}</p>
            </div>
          </div>
          {/* right div  */}

          <div className="w-[35%] px-2 py-2 flex flex-col gap-1   bg-white rounded-2xl max-sm:w-full dark:bg-black dark:text-white ">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row justify-between items-center  py-1">
                <div className="flex flex-row gap-1 ">
                  <IoCheckmarkCircleOutline className="my-auto  size-6  rounded-full text-[#2CBB01]" />{" "}
                  <p>Correct Questions</p>
                </div>
              </div>
              <p>{correctCount}</p>
            </div>{" "}
            <div className="flex flex-row justify-between items-center  py-1">
              <div className="flex flex-row gap-1 ">
                <RxCrossCircled className="my-auto  size-6 rounded-full text-[#FF0000]" />{" "}
                <p>Incorrect Questions</p>
              </div>

              <p>{incorrectCount}</p>
            </div>
            <div className="flex flex-row justify-between items-center  py-1">
              <div className="flex flex-row gap-2 ">
                <FaRegCircle className="my-auto  bg-[#6C6C6C]  size-5 rounded-full text-[#6C6C6C]" />{" "}
                <p>Not Attempted</p>
              </div>

              <p>{notAttemptedCount}</p>
            </div>
          </div>
        </div>

        <div className="py-2">
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-[#FFE332] rounded-full"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </>
  );
}
