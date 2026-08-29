"use client";

import Image from "next/image";
import { useState } from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

type QuizItem = {
  id: string;
  postId: number;
  questionText: string;
  options: { text: string }[];
  solutionText?: string;

  // Backend sends:
  // 1 = first option
  // 2 = second option
  // 3 = third option
  // 4 = fourth option
  correctOption: number;

  marksPositive?: number;
  marksNegative?: number;
  level?: string;
  createdAt?: string;
  updatedAt?: string;
};

type Props = {
  quizData: QuizItem[];
  answers: { answer: number | null }[];
  onRestart: () => void;
};

export default function QuizResultNew({
  quizData,
  answers,
  onRestart,
}: Props) {
  const [current, setCurrent] = useState(0);

  const total = quizData.length;

 
  const correct = quizData.reduce((acc, q, i) => {
    const userAnswer = answers[i]?.answer ?? null;
    const correctAnswer = q.correctOption - 1;

    return acc + (userAnswer === correctAnswer ? 1 : 0);
  }, 0);


  const incorrect = quizData.reduce((acc, q, i) => {
    const userAnswer = answers[i]?.answer ?? null;
    const correctAnswer = q.correctOption - 1;

    if (userAnswer !== null && userAnswer !== correctAnswer) {
      return acc + 1;
    }

    return acc;
  }, 0);

  const notAttempted = total - correct - incorrect;


  const percentage =
    total > 0 ? Math.round((correct / total) * 100) : 0;


  const q = quizData[current];

  if (!q) {
    return null;
  }

  // User answer is already 0-based
  const userAnswerIndex = answers[current]?.answer ?? null;

  // Backend correctOption is 1-based
  // Convert it to 0-based
  const correctAnswerIndex = q.correctOption - 1;

  // -----------------------------
  // Circle Math
  // -----------------------------
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  // -----------------------------
  // Dynamic Message
  // -----------------------------
  const getMessage = () => {
    if (percentage >= 80) {
      return {
        mess: "Excellent!",
        color: "text-green-600",
        image: "/ui/client/TestIcons/1.png",
      };
    }

    if (percentage >= 50) {
      return {
        mess: "Good Job!",
        color: "text-yellow-500",
        image: "/ui/client/TestIcons/2.png",
      };
    }

    return {
      mess: "Needs Improvement",
      color: "text-red-500",
      image: "/ui/client/TestIcons/3.png",
    };
  };

  const selectedMessage = getMessage();

  return (
    <>

      <div className="md:p-6 max-md:py-4 max-md:px-4 shadow-[0_0_12px_rgba(0,0,0,0.3)] w-full bg-white rounded-2xl my-4">
        {/* Header */}
        <div className="flex flex-col items-center py-4">
          <div className="w-12 mb-2">
            <Image
              src={selectedMessage.image}
              width={100}
              height={100}
              alt="result"
              className="w-full h-auto"
            />
          </div>

          <p
            className={`font-bold text-2xl ${selectedMessage.color}`}
          >
            {selectedMessage.mess}
          </p>

          <p className="text-[#6F6F6F]">
            Quiz Completed!
          </p>
        </div>

  
        <div className="relative w-40 h-40 mx-auto mb-6">
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
          >
            {/* Background Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />

            {/* Progress Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#047077"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference - progress
              }
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-[#047077]">
              {correct}/{total}
            </p>

            <p className="text-sm text-gray-500">
              {percentage}%
            </p>
          </div>
        </div>



        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Correct */}
          <div className="bg-[#F8FAFC] shadow rounded py-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {correct}
            </p>

            <p className="text-sm text-gray-500">
              Correct
            </p>
          </div>

          {/* Incorrect */}
          <div className="bg-[#F8FAFC] shadow rounded py-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {incorrect}
            </p>

            <p className="text-sm text-gray-500">
              Incorrect
            </p>
          </div>

          {/* Not Attempted */}
          <div className="bg-[#F8FAFC] shadow rounded py-4 text-center">
            <p className="text-2xl font-bold text-gray-600">
              {notAttempted}
            </p>

            <p className="text-sm text-gray-500">
              Not Attempted
            </p>
          </div>
        </div>

     
        <div className="flex justify-between gap-4">
          <button
            onClick={onRestart}
            className="w-1/2 py-2 bg-[#047077] text-white rounded"
          >
            Restart Quiz
          </button>

          <button className="w-1/2 py-2 bg-[#F89716] text-white rounded">
            More Quiz
          </button>
        </div>
      </div>

      <div className="w-full mx-auto mt-10 bg-white shadow-[0_0_12px_rgba(0,0,0,0.3)] rounded-2xl p-6">
        {/* Question Number */}
        <div className="flex justify-between mb-4">
          <p className="text-sm text-gray-500">
            Question {current + 1} / {total}
          </p>
        </div>

        {/* Question */}
        <h3 className="font-semibold mb-4">
          {q.questionText}
        </h3>

        {/* ================================
            OPTIONS
        ================================= */}
        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            const isCorrect =
              idx === correctAnswerIndex;

            const isWrong =
              idx === userAnswerIndex &&
              idx !== correctAnswerIndex;

            return (
              <div
                key={idx}
                className={`
                  px-4
                  py-3
                  rounded-xl
                  border
                  flex
                  justify-between
                  ${
                    isCorrect
                      ? "bg-green-100 border-green-400"
                      : isWrong
                        ? "bg-red-100 border-red-400"
                        : "bg-gray-50 border-gray-200"
                  }
                `}
              >
                <span>{opt.text}</span>

                {/* Correct Icon */}
                {isCorrect && (
                  <span className="text-green-600 font-bold">
                    ✔
                  </span>
                )}

                {/* Wrong Icon */}
                {isWrong && (
                  <span className="text-red-600 font-bold">
                    ✖
                  </span>
                )}
              </div>
            );
          })}
        </div>


        <div className="mt-6 space-y-2">
          {/* Chosen Answer */}
          <div
            className={`
              px-4
              py-2
              rounded-lg
              text-sm
              font-medium
              ${
                userAnswerIndex === correctAnswerIndex
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : userAnswerIndex === null
                    ? "bg-gray-50 text-gray-500 border border-gray-200"
                    : "bg-red-50 text-red-700 border border-red-200"
              }
            `}
          >
            Chosen Answer:{" "}
            {userAnswerIndex !== null
              ? q.options[userAnswerIndex]?.text ??
                "Invalid Answer"
              : "Not Attempted"}
          </div>

          {/* Correct Answer */}
          <div className="px-4 py-2 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200">
            Correct Answer:{" "}
            {q.options[correctAnswerIndex]?.text ??
              "Invalid Correct Answer"}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-600">
            {q.solutionText ||
              "No explanation provided."}
          </p>
        </div>


        <div className="flex justify-between mt-6">
          {/* Previous */}
          <button
            onClick={() =>
              setCurrent((p) => Math.max(0, p - 1))
            }
            disabled={current === 0}
            className="px-4 py-2 bg-[#047077] text-white rounded disabled:opacity-50 flex items-center gap-1"
          >
            <MdKeyboardArrowLeft size={20} />
            Prev
          </button>

          {/* Next */}
          <button
            onClick={() =>
              setCurrent((p) =>
                Math.min(total - 1, p + 1),
              )
            }
            disabled={current === total - 1}
            className="px-4 py-2 bg-[#047077] text-white rounded disabled:opacity-50 flex items-center gap-1"
          >
            Next
            <MdKeyboardArrowRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
}