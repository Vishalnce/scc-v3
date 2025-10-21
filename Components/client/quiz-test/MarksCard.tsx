"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef } from "react";
import { FaRegCircle } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { useEffect } from "react";
import { GoClock } from "react-icons/go";
import { CiStopwatch } from "react-icons/ci";
type Props = {
  questions: any;
  answers: any;
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
  const calculateScore = () => {
    let correctMarks = 0;
    let incorrectMarks = 0;
    let totalMarks = questions.reduce(
      (sum: any, q: any) => sum + q.marksPositive,
      0
    );

    answers.forEach((ans: any) => {
      const q = questions.find((qq: any) => qq.id === ans.questionId);
      if (!q) return;

      if (ans.answer !== null) {
        if (ans.answer === q.correctOption - 1) {
          correctMarks += q.marksPositive;
        } else {
          incorrectMarks += Math.abs(q.marksNegative);
        }
      }
    });

    return { totalMarks, correctMarks, incorrectMarks };
  };

  const { data, status } = useSession();
  const { totalMarks, correctMarks, incorrectMarks } = calculateScore();
  // Calculate overall stats
  let totalScore = 0;
  let totalPossibleScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let notAttemptedCount = 0;

  questions.forEach((question: any) => {
    // Add the maximum possible marks for this question
    totalPossibleScore += question.marksPositive ?? 0;

    // Find the user's answer for this question
    const userAnswer = answers.find(
      (a: any) => a.questionId === question.id
    )?.answer;

    // Adjust the correct option index (DB uses 1-based index)
    const correctIndex = question.correctOption - 1;

    if (userAnswer === correctIndex) {
      // Correct answer
      totalScore += question.marksPositive ?? 0;
      correctCount++;
    } else if (userAnswer != null) {
      // Wrong answer
      totalScore += question.marksNegative ?? 0;
      incorrectCount++;
    } else {
      // Not attempted
      notAttemptedCount++;
    }
  });

  
  // 


        const didSaveRank = useRef(false);
//learn this 
    useEffect(() => {
  if (didSaveRank.current) return;
  if (!data?.user?.name || !questions?.length || correctMarks === undefined || totalMarks === undefined || timeTaken === undefined) return;

  didSaveRank.current = true; // mark immediately to avoid double call

  async function rankCard() {
    const rankObj = {
      name: data?.user?.name,
      quizId,
      score: correctMarks,
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
      didSaveRank.current = false; // allow retry on error
    }
  }

  rankCard();
}, [data, questions, correctMarks, totalMarks, timeTaken, quizId]);

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
              {Number(timeTaken) < 60
                ? `${Number(timeTaken).toFixed(2)} seconds`
                : `${Math.floor(Number(timeTaken) / 60)} minutes`}
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

              <p>{totalMarks}</p>
            </div>

            <div className="flex flex-row justify-between items-center  py-1">
              <div className="flex flex-row  gap-1">
                <FaRegCircle className="my-auto    size-5 bg-[#2CBB01] rounded-full text-[#2CBB01]" />{" "}
                <p>Marks Obtained</p>
              </div>

              <p>{correctMarks}</p>
            </div>
            <div className="flex flex-row justify-between items-center  py-1">
              <div className="flex flex-row gap-1 ">
                <FaRegCircle className="my-auto   size-5  bg-[#FF0000] rounded-full text-[#FF0000]" />{" "}
                <p>Negative Marks</p>
              </div>

              <p>{incorrectMarks}</p>
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
