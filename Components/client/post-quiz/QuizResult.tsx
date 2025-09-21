"use client";
import { useState } from "react";

export default function QuizResult({
  questions,
  answers,
  timeTaken,
  onRestart,
}: {
  questions: any[];
  timeTaken:number;
  answers: { questionId: string; answer: number | null }[];
  onRestart: () => void
}) {
  const [current, setCurrent] = useState(0);

  // Calculate overall stats
  let totalScore = 0;
  let totalPossibleScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let notAttemptedCount = 0;

  questions.forEach((q) => {
    totalPossibleScore += q.marksPositive ?? 0;
    const ua = answers.find((a) => a.questionId === q.id);
    if (ua?.answer === q.correctOption) {
      totalScore += q.marksPositive ?? 0;
      correctCount++;
    } else if (ua?.answer != null && ua.answer !== q.correctOption) {
      totalScore += q.marksNegative ?? 0;
      incorrectCount++;
    } else {
      notAttemptedCount++;
    }
  });

  const q = questions[current];
  const userAnswerObj = answers.find((a) => a.questionId === q.id);
  const userAnswerIndex = userAnswerObj?.answer;
  const correctAnswerIndex = q.correctOption;

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

  function handleOnClick (){
    onRestart()
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Overall Summary */}
      <div className="p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-bold mb-2">Quiz Summary</h2>
        <p>Total Score: {totalScore} / {totalPossibleScore}</p>
        <p>Correct: {correctCount}</p>
        <p>Incorrect: {incorrectCount}</p>
        <p>Not Attempted: {notAttemptedCount}</p>
        <p>Total Questions: {questions.length}</p>
        <p>Total Time Taekn : {timeTaken}</p>

        <button onClick={handleOnClick}>Reattempt</button>
      </div>

      {/* Current Question */}
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">{q.questionText}</h3>

        <p>
          Your Answer:{" "}
          <span
            className={
              userAnswerIndex === correctAnswerIndex
                ? "text-green-600 font-bold"
                : userAnswerIndex == null
                ? "text-gray-500 font-bold"
                : "text-red-600 font-bold"
            }
          >
            {userAnswerIndex != null
              ? q.options[userAnswerIndex]?.text
              : "Not answered"}
          </span>
        </p>

        <p>
          Correct Answer:{" "}
          <span className="text-green-600 font-bold">
            {q.options[correctAnswerIndex]?.text}
          </span>
        </p>

        <p>
          Status: <span className="font-bold">{status}</span> | Marks:{" "}
          <span className="font-bold">{marksEarned}</span>
        </p>

        {q.solutionText && (
          <p className="text-gray-600 italic mt-2">{q.solutionText}</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {current < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 border rounded bg-gray-100"
          >
            Next
          </button>
        ) : (
          <button className="px-4 py-2 border rounded bg-green-300">
            Finish
          </button>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-2 text-center">
        Question {current + 1} / {questions.length}
      </p>
    </div>
  );
}
