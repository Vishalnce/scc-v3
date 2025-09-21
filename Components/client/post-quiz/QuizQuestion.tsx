"use client";
import { useState, useRef, useCallback } from "react";
import CountdownTimer from "./CountdownTimer";

export default function QuizQuestion({
  questions,
  timeLimit,
  setTimeTaken,
  onFinish,
}: {
  questions: any[];
  timeLimit: number;
  setTimeTaken: (second:number) => void;
  onFinish: (answers: { questionId: string; answer: number | null }[]) => void;
}) {


  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: string; answer: number | null }[]
  >(questions.map((q) => ({ questionId: q.id, answer: null })));



  const answersRef = useRef(answers);
  answersRef.current = answers; // always have latest answers
 const startTimeRef = useRef<number>(Date.now()); 
  const q = questions[current];

  const handleSelect = (optionIndex: number) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[current] = { questionId: q.id, answer: optionIndex };
      return copy;
    });
  };

  const handlePrev = () => setCurrent((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrent((prev) => Math.min(prev + 1, questions.length - 1));
  const handleSubmit = () => {
    calculateTimeSpent();
    onFinish(answers);}


  // Function to calculate total time spent
const calculateTimeSpent = () => {
  const now = Date.now();
  const totalSeconds = Math.floor((now - startTimeRef.current) / 1000);
  setTimeTaken(totalSeconds)
  return totalSeconds;
};


  // Stable callback for timer
  const handleTimerFinish = useCallback(() => {
  
    onFinish(answersRef.current); // read latest answers from ref
  }, [onFinish]);

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold">{q.questionText}</h3>

      <CountdownTimer minutes={0.25} onFinish={handleTimerFinish} setTimeTaken={setTimeTaken} />

      <div className="flex flex-col gap-2 mt-4">
        {q.options.map((opt: { text: string }, idx: number) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`px-3 py-2 border rounded-lg ${
              answers[current].answer === idx
                ? "bg-blue-200"
                : "hover:bg-gray-100"
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>

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

      <p className="text-sm text-gray-500 mt-2">
        Question {current + 1} / {questions.length}
      </p>
    </div>
  );
}
