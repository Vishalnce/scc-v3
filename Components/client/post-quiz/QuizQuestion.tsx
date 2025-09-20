"use client";
import { useState } from "react";



export default function QuizQuestion({
  questions,
  timeLimit,
  onFinish,
}: {
  questions: any[];
  timeLimit:number
  onFinish: (answers: { questionId: string; answer: number | null }[]) => void;
}) {


  const [current, setCurrent] = useState(0);

  // Initialize answers with null for each question
  
  const [answers, setAnswers] = useState<{ questionId: string; answer: number | null }[]>(
    questions.map((q) => ({ questionId: q.id, answer: null }))
  );

  const q = questions[current];

  // Handle selecting an option
  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = { questionId: q.id, answer: optionIndex };
    setAnswers(newAnswers);
  };

  // Navigate to previous question
  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  // Navigate to next question
  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  // Submit answers
  const handleSubmit = () => {
    onFinish(answers);
  };

  return (
    <div className="p-4 border rounded-lg">
      {/* Question Text */}
      <h3 className="font-bold">{q.questionText}</h3>

      {/* Options */}
      <div className="flex flex-col gap-2 mt-4">
        {q.options.map((opt: { text: string }, idx: number) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)} // store index
            className={`px-3 py-2 border rounded-lg ${
              answers[current].answer === idx ? "bg-blue-200" : "hover:bg-gray-100"
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

   
          <button
            onClick={handleNext}
            className="px-4 py-2 border rounded bg-gray-100"
          >
            Next
          </button>
      
          <button
            onClick={handleSubmit}
            className="px-4 py-2 border rounded bg-green-300"
          >
            Submit
          </button>
       
      </div>

      {/* Question Progress */}
      <p className="text-sm text-gray-500 mt-2">
        Question {current + 1} / {questions.length}
      </p>
    </div>
  );
}
