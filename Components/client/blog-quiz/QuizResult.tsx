"use client";

import Image from "next/image";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type QuizItem = {
  id: string;
  postId: number;
  questionText: string;
  options: { text: string }[];
  solutionText?: string;

  correctOption: number; // ✅ ADD THIS

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

export default function QuizResultNew({ quizData, answers, onRestart }: Props) {
  const [current, setCurrent] = useState(0);

  const total = quizData.length;
 
  // console.log(answers)

  const correct = quizData.reduce(
    (acc, q, i) => acc + (answers[i]?.answer === q.correctOption ? 1 : 0),
    0,
  );

  const incorrect = quizData.reduce(
    (acc, q, i) =>
      acc +
      (answers[i]?.answer !== null && answers[i]?.answer !== q.correctOption ? 1 : 0),
    0,
  );

  const notAttempted = total - correct - incorrect;

  const percentage = Math.round((correct / total) * 100);

const q = quizData[current];
const userAnswerIndex = answers[current]?.answer;
const correctAnswerIndex = q.correctOption;



  // 🎯 Circle math
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  // 🎯 Dynamic message
  const getMessage = () => {
    if (percentage >= 80)
      return {
        mess: "Excellent!",
        color: "text-green-600",
        image: "/ui/client/TestIcons/1.png",
      };
    if (percentage >= 50)
      return {
        mess: "Good Job!",
        color: "text-yellow-500",
        image: "/ui/client/TestIcons/2.png",
      };
    return {
      mess: "Needs Improvement",
      color: "text-red-500",
      image: "/ui/client/TestIcons/3.png",
    };
  };

  const selectedMessage = getMessage();
  
  return (
    <>
      {/* RESULT CARD  */}
      <div className="md:p-6 max-md:py-4 max-md:px-4 shadow-[0_0_12px_rgba(0,0,0,0.3)] w-full bg-white rounded-2xl my-4 ">
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

          <p className={`font-bold text-2xl ${selectedMessage.color}`}>
            {selectedMessage.mess}
          </p>

          <p className="text-[#6F6F6F]">Quiz Completed!</p>
        </div>

        {/* 🎯 Circle Score */}
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
              stroke="#047077"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-[#047077]">
              {correct}/{total}
            </p>
            <p className="text-sm text-gray-500">{percentage}%</p>
          </div>
        </div>

        {/* 📊 Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#F8FAFC] shadow rounded py-4 text-center">
            <p className="text-2xl font-bold text-green-600">{correct}</p>
            <p className="text-sm text-gray-500">Correct</p>
          </div>

          <div className="bg-[#F8FAFC] shadow rounded py-4 text-center">
            <p className="text-2xl font-bold text-red-600">{incorrect}</p>
            <p className="text-sm text-gray-500">Incorrect</p>
          </div>

          <div className="bg-[#F8FAFC] shadow rounded py-4 text-center">
            <p className="text-2xl font-bold text-gray-600">{notAttempted}</p>
            <p className="text-sm text-gray-500">Not Attempted</p>
          </div>
        </div>

        {/* Buttons */}
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

      {/*  REVIEW SECTION  */}
      <div className="w-full mx-auto mt-10 bg-white shadow-[0_0_12px_rgba(0,0,0,0.3)]  rounded-2xl  p-6">
        {/* Question */}
        <div className="flex justify-between mb-4">
          <p className="text-sm text-gray-500">
            Question {current + 1} / {total}
          </p>
        </div>

        <h3 className="font-semibold mb-4">{q.questionText}</h3>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            const isCorrect = idx === correctAnswerIndex;
            const isWrong =
              idx === userAnswerIndex && idx !== correctAnswerIndex;

            return (
              <div
                key={idx}
                className={`px-4 py-3 rounded-xl border flex justify-between
                ${
                  isCorrect
                    ? "bg-green-100 border-green-400"
                    : isWrong
                      ? "bg-red-100 border-red-400"
                      : "bg-gray-50"
                }`}
              >
                <span>{opt.text}</span>

                {isCorrect && <span className="text-green-600">✔</span>}
                {isWrong && <span className="text-red-600">✖</span>}
              </div>
            );
          })}
        </div>

        {/* Answer Summary */}
        <div className="mt-6 space-y-2">
          {/* Chosen Answer */}
          <div
            className={`px-4 py-2 rounded-lg text-sm font-medium
    ${
      userAnswerIndex === correctAnswerIndex
        ? "bg-green-50 text-green-700 border border-green-200"
        : userAnswerIndex === null
          ? "bg-gray-50 text-gray-500 border border-gray-200"
          : "bg-red-50 text-red-700 border border-red-200"
    }`}
          >
            Chosen Answer:{" "}
            {userAnswerIndex !== null
              ? q.options[userAnswerIndex]?.text
              : "Not Attempted"}
          </div>

          {/* Correct Answer */}
          <div className="px-4 py-2 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200">
            Correct Answer: {q.options[correctAnswerIndex]?.text}
          </div>
        </div>

        {/* Explanation */}
        <div className="mt-4">
          <p className="text-gray-600">
            {q.solutionText || "No explanation provided."}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrent((p) => p - 1)}
            disabled={current === 0}
            className="px-4 py-2 bg-[#047077] text-white rounded disabled:opacity-50"
          >
            <MdKeyboardArrowLeft /> Prev
          </button>

          <button
            onClick={() => setCurrent((p) => p + 1)}
            disabled={current === total - 1}
            className="px-4 py-2 bg-[#047077] text-white rounded disabled:opacity-50"
          >
            Next <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}
