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
    0,
  );

  let correctMarks = 0;
  let incorrectMarks = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let notAttemptedCount = 0;

  questions.forEach((question) => {
    const userAnswer = answers.find(
      (a) => a.questionId === question.id,
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
  }, [
    data,
    questions,
    correctMarks,
    totalMarks,
    timeTaken,
    quizId,
    totalScore,
  ]);

  // Format numbers with two decimal places
  const formatNumber = (num: number) => num.toFixed(2);

  //mesag image
  const messageShow = [
    {
      image: "/ui/client/TestIcons/1.png",
      mess: "Excellent!",
      color: "#11C352",
    },
    { image: "/ui/client/TestIcons/2.png", mess: "Good Job", color: "#24B3CB" },
    {
      image: "/ui/client/TestIcons/1.png",
      mess: "Needs Improvement!",
      color: "#F14343",
    },
  ];

  const totalQuestions = questions.length;

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  // 🎨 Color logic
  let color = "text-red-500";
  let stroke = "#ef4444";

  if (percentage >= 80) {
    color = "text-green-500";
    stroke = "#22c55e";
  } else if (percentage >= 30) {
    color = "text-yellow-500";
    stroke = "#eab308";
  }




  let messageIndex = 2; // default: Needs Improvement

  if (percentage >= 80) {
    messageIndex = 0; // Excellent
  } else if (percentage >= 40) {
    messageIndex = 1; // Good Job
  }

  const selectedMessage = messageShow[messageIndex];
  return (
    <div className="md:p-6 max-md:py-4 max-md:px-4 mx-auto shadow-[0_0_12px_rgba(0,0,0,0.2)] max-md:w-full w-[90%] bg-white dark:bg-[#1f1f1f] rounded-2xl my-4">
      {/* 🔥 Header */}
      <div className="flex flex-col items-center py-4">
        <div className="w-12 h-12">
          <Image
            src={selectedMessage.image}
            width={100}
            height={100}
            alt="result"
            className="w-full h-auto object-contain"
          />
        </div>

        <p
          className="font-bold text-2xl mt-2"
          style={{ color: selectedMessage.color }}
        >
          {selectedMessage.mess}
        </p>

        <p className="text-[#6F6F6F] dark:text-gray-300">Quiz Completed!</p>
      </div>

      {/*  Circle */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        <svg width="160" height="160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />

          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={stroke}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            transform="rotate(-90 80 80)"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className={`text-2xl font-bold ${color}`}>
            {correctCount}/{totalQuestions}
          </p>
          <p className="text-sm text-gray-500">{percentage}%</p>
        </div>
      </div>

      {/*  4 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Correct */}
        <div className="bg-[#E0F8E6] border-2 border-[#11C352] dark:bg-[#2a2a2a] shadow rounded-lg py-4 text-center">
          <p className="text-2xl  text-[#11C352] font-extrabold">{correctCount}</p>
          <p className="text-sm text-gray-500 font-medium">Correct</p>
        </div>

        {/* Incorrect */}
        <div className="bg-[#FEEDED] border-2 border-[#F14343] dark:bg-[#2a2a2a] shadow rounded-lg py-4 text-center">
          <p className="text-2xl  text-[#F14343] font-extrabold">{incorrectCount}</p>
          <p className="text-sm text-gray-500 font-medium">Incorrect</p>
        </div>

        {/* Skipped */}
        <div className="bg-[#DEF4F7] border-2 border-[#24B3CB] dark:bg-[#2a2a2a] shadow rounded-lg py-4 text-center">
          <p className="text-2xl  text-[#24B3CB] font-extrabold">
            {notAttemptedCount}
          </p>
          <p className="text-sm text-gray-500 font-medium">Skipped</p>
        </div>

        {/* Time */}
        <div className="bg-[#F9E1EF] border-2 border-[#D63895] dark:bg-[#2a2a2a] shadow rounded-lg py-4 text-center">
          <p className="text-2xl  text-[#D63895] font-extrabold">
            {timeTaken < 60
              ? `${timeTaken.toFixed(0)}s`
              : `${Math.floor(timeTaken / 60)}m`}
          </p>
          <p className="text-sm text-gray-500 font-medium">Time</p>
        </div>
      </div>

      {/* 🔁 Buttons */}
      <div className="flex flex-row gap-4">
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-[#047077] text-white rounded w-full"
        >
          Restart Quiz
        </button>

        <button className="px-6 py-2 bg-[#F89716] text-white rounded w-full">
          More Quiz
        </button>
      </div>
    </div>
  );
}
