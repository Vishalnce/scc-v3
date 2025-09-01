"use client"
import React, { useState } from "react";

const quizData = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    answer: "Delhi",
  },
  {
    question: "Which is the largest planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Jupiter",
  },
  {
    question: "Who wrote the Ramayana?",
    options: ["Valmiki", "Tulsidas", "Vyasa", "Kalidasa"],
    answer: "Valmiki",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "National animal of India?",
    options: ["Lion", "Tiger", "Elephant", "Peacock"],
    answer: "Tiger",
  },
];

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionClick = (option: string) => {
    setSelected(option);
    setIsCorrect(option === quizData[currentQ].answer);
  };

  const handleNext = () => {
    setSelected(null);
    setIsCorrect(null);
    setCurrentQ((prev) => prev + 1);
  };

  const question = quizData[currentQ];

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        Q{currentQ + 1}. {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={!!selected} // disable after selecting
            className={`w-full p-3 border rounded text-left ${
              selected === option
                ? isCorrect
                  ? "border-green-500 bg-green-100"
                  : "border-red-500 bg-red-100"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {selected && currentQ < quizData.length - 1 && (
        <button
          onClick={handleNext}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      )}

      {selected && currentQ === quizData.length - 1 && (
        <p className="mt-4 font-semibold text-green-700">Quiz Completed 🎉</p>
      )}
    </div>
  );
}
