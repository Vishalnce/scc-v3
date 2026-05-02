"use client";
import { useState, useRef, useCallback } from "react";

import { FaRegCircle } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function QuizQuestion({
  questions,
  topic,

  setTimeTaken,
  onFinish,
}: {
  questions: any[];
  topic: string;
  
  setTimeTaken: (second: number) => void;
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
      const currentAnswer = copy[current].answer;

      // Toggle logic: if clicked again, deselect (set to null)
      copy[current] = {
        questionId: q.id,
        answer: currentAnswer === optionIndex ? null : optionIndex,
      };

      return copy;
    });
  };

  const handlePrev = () => setCurrent((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrent((prev) => Math.min(prev + 1, questions.length - 1));
  const handleSubmit = () => {
    calculateTimeSpent();
    onFinish(answers);
  };

  // Function to calculate total time spent
  const calculateTimeSpent = () => {
    const now = Date.now();
    const totalSeconds = Math.floor((now - startTimeRef.current) / 1000);
    setTimeTaken(totalSeconds);
    return totalSeconds;
  };

  // Stable callback for timer
  const handleTimerFinish = useCallback(() => {
    onFinish(answersRef.current); // read latest answers from ref
  }, [onFinish]);

  return (
    <>
      <div className="md:p-6 max-md:py-4 max-md:px-4 mx-auto shadow-[0_0_12px_rgba(0,0,0,0.3)] max-md:w-full  w-[100%] bg-white rounded-2xl my-4 px-2">
        {/* Progress */}
        <div className=" flex flex-row justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-[#047077] rounded-full"></span>
              <span className="pr-2">Question </span>
            </div>

            <div className="text-sm font-semibold text-[#047077]">
              {current + 1} of {questions.length}
            </div>
          </div>
         
        </div>

        <div className="bg-gray-200 h-2 w-[60%] rounded mb-4 mx-auto">
          <div
            className="bg-[#047077] h-2 rounded transition-all duration-300"
            style={{
              width: `${((current + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold mb-4">{q.questionText}</h3>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt: { text: string }, index: number) => {
            const isSelected = answers[current]?.answer === index;

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`w-full flex justify-between items-center px-4 py-3 border border-[#DADADA] shadow-[0_0_2px_rgba(0,0,0,0.2)] rounded-xl transition
          ${isSelected ? "bg-[#E6F7F8]" : "hover:bg-gray-50"}`}
              >
                {/* Option text */}
                <span className="text-left text-sm">{opt.text}</span>

                {/* Dot indicator */}
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
              ${isSelected ? "border-[#047077]" : "border-gray-400"}
            `}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? "bg-[#047077]" : ""
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <button
            disabled={current === 0}
            onClick={handlePrev}
            className="px-4 py-2 bg-[#047077] text-white rounded disabled:opacity-50"
          >
            Prev
          </button>

          <button
            onClick={
              current === questions.length - 1 ? handleSubmit : handleNext
            }
            className="px-6 py-2 bg-[#047077] text-white rounded-xl"
          >
            {current === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
}
