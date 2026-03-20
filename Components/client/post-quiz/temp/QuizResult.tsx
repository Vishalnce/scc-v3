"use client";

import Image from "next/image";
import { useState } from "react";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { QuizItem } from "./quiz";

type Props = {
  quizData: QuizItem[];
  answers: string[];
  timeTaken: number;
  onRestart: () => void;
};

export default function QuizResult({
  quizData,
  answers,
  timeTaken,
  onRestart,
}: Props) {
  const [current, setCurrent] = useState(0);

  const total = quizData.length;

  // ✅ CALCULATIONS
  const correct = quizData.reduce((acc, q, i) => {
    return acc + (answers[i] === q.correctAnswer ? 1 : 0);
  }, 0);

  const notAttempted = answers.filter((a) => !a).length;
  const incorrect = total - correct - notAttempted;
  const percentage = Math.round((correct / total) * 100);

  // ✅ COLOR LOGIC
  let color = "text-red-500";
  let stroke = "#ef4444";

  if (percentage >= 80) {
    color = "text-green-500";
    stroke = "#22c55e";
  } else if (percentage >= 40) {
    color = "text-yellow-500";
    stroke = "#eab308";
  }

  // ✅ CIRCLE
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  // ✅ MESSAGE
  const messages = [
    { image: "/ui/client/TestIcons/1.png", text: "Excellent!", color: "#11C352" },
    { image: "/ui/client/TestIcons/2.png", text: "Good Job", color: "#24B3CB" },
    { image: "/ui/client/TestIcons/1.png", text: "Needs Improvement!", color: "#F14343" },
  ];

  let msgIndex = percentage >= 80 ? 0 : percentage >= 40 ? 1 : 2;
  const msg = messages[msgIndex];

  const q = quizData[current];
  const userAnswer = answers[current];

  const handlePrev = () => setCurrent((p) => Math.max(p - 1, 0));
  const handleNext = () =>
    setCurrent((p) => Math.min(p + 1, quizData.length - 1));

  return (
    <div className="dark:bg-black py-10">

      {/* 🔥 RESULT CARD */}
      <div className="md:p-6 max-md:px-4 mx-auto w-[70%] max-md:w-full bg-white rounded-2xl shadow dark:bg-[#313131]">

        {/* MESSAGE */}
        <div className="flex flex-col items-center py-4">
          <div className="w-12">
            <Image src={msg.image} width={100} height={100} alt="result" />
          </div>

          <p className="font-bold text-2xl" style={{ color: msg.color }}>
            {msg.text}
          </p>

          <p className="text-[#6F6F6F]">Quiz Completed!</p>

          <p className="text-sm mt-2 dark:text-white">
            ⏱ Time Taken: {timeTaken}s
          </p>
        </div>

        {/* 🎯 CIRCLE */}
        <div className="relative w-40 h-40 mx-auto mb-6">
          <svg width="160" height="160">
            <circle cx="80" cy="80" r={radius} stroke="#e5e7eb" strokeWidth="10" fill="none" />
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
              {correct}/{total}
            </p>
            <p className="text-sm text-gray-500">{percentage}%</p>
          </div>
        </div>

        {/* 📊 STATS */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#F8FAFC] shadow rounded py-4 text-center">
            <p className="text-green-600 text-2xl font-bold">{correct}</p>
            <p className="text-sm">Correct</p>
          </div>

          <div className="bg-[#F8FAFC] shadow rounded py-4 text-center">
            <p className="text-red-600 text-2xl font-bold">{incorrect}</p>
            <p className="text-sm">Incorrect</p>
          </div>

          <div className="bg-[#F8FAFC] shadow rounded py-4 text-center">
            <p className="text-gray-600 text-2xl font-bold">{notAttempted}</p>
            <p className="text-sm">Not Attempted</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className="w-1/2 py-2 bg-[#047077] text-white rounded"
          >
            Restart
          </button>

          <button className="w-1/2 py-2 bg-[#F89716] text-white rounded">
            More Quiz
          </button>
        </div>
      </div>

      {/* 🔥 EXPLANATION SECTION */}
      <div className="w-[70%] max-md:w-full mx-auto mt-10 bg-white dark:bg-[#313131] rounded-2xl p-6 shadow">

        {/* QUESTION */}
        <p className="font-semibold mb-3 dark:text-white">
          Q{current + 1}. {q.question}
        </p>

        {/* OPTIONS */}
        <div className="space-y-2">
          {q.options.map((opt:any, i:any) => {
            const isCorrect = opt === q.correctAnswer;
            const isUser = opt === userAnswer;

            return (
              <div
                key={i}
                className={`p-3 rounded border flex justify-between
                ${
                  isCorrect
                    ? "bg-green-100 border-green-400"
                    : isUser
                    ? "bg-red-100 border-red-400"
                    : ""
                }`}
              >
                <span className="dark:text-white">{opt}</span>

                {isCorrect && "✅"}
                {!isCorrect && isUser && "❌"}
              </div>
            );
          })}
        </div>

        {/* EXPLANATION */}
        <div className="mt-4 dark:text-white">
          <p className="font-semibold">
            Answer: {q.correctAnswer}
          </p>

          <p className="mt-2 text-sm">
            {q.explanation || "No explanation provided."}
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="px-4 py-2 bg-[#FFE332] rounded-full disabled:opacity-50 flex items-center gap-1"
          >
            <MdKeyboardArrowLeft /> Prev
          </button>

          <button
            onClick={handleNext}
            disabled={current === quizData.length - 1}
            className="px-4 py-2 bg-[#FFE332] rounded-full disabled:opacity-50 flex items-center gap-1"
          >
            Next <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}