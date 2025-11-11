"use client";
import { useState, useRef, useCallback } from "react";
import CountdownTimer from "./CountdownTimer";
import { FaRegCircle } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function QuizQuestion({
  questions,
  topic,
  timeLimit,
  setTimeTaken,
  onFinish,
}: {
  questions: any[];
  topic: string;
  timeLimit: number;
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
      <div className=" dark:bg-black pb-14 pt-20 ">
        <div className=" w-[90%] py-4 dark:bg-[#313131] bg-[#FAFCFC] rounded-2xl mx-auto px-6 border-2 border-[#E6F1F1] ">
          {/* question number and timer */}
          <div className="flex flex-row justify-between items-center  w-[90%] mx-auto -mt-10 ">
            <div
              className="  min-w-[60px]  bg-white py-1  "
              style={{
                boxShadow:
                  "0 4px 10px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.15)",
              }}
            >
              <p className="font-montserrat font-bold text-3xl max-sm:text-2xl shadow-black/80 text-[#007076] text-center">
                {current < 10 ? "0" + Number(current+1) : current}
              </p>
            </div>

            <div>
              <CountdownTimer
                minutes={timeLimit}
                onFinish={handleTimerFinish}
                setTimeTaken={setTimeTaken}
              />
            </div>
          </div>

          {/* question  and topics */}

          <div className="flex flex-row justify-between items-start min-h-[20vh]   mt-6 ">
            <div className="w-[60%] max-sm:w-full">
              <p className="font-bold dark:text-white">{q.questionText}</p>
            </div>

            <div className=" flex items-end max-sm:hidden">
              <button className="px-4 py-2 bg-[#FFE332]  rounded-full text-sm">
                {topic}
              </button>
            </div>
          </div>

          {/* options and buttons */}
          <div className="flex flex-row max-sm:flex-col justify-between items-stretch   max-sm:gap-5">
            {/* left box */}

            <div className="max-sm:py-2 max-sm:w-full max-sm:grid-cols-1 grid grid-cols-2 gap-6 w-[60%] ">
              {q.options.map((opt: { text: string }, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`px-3 py-3 border dark:border-white rounded-full flex flex-row justify-between `}
                >
                  <p className="text-my-text-color max-lg:text-sm">
                    {opt.text}
                  </p>

                  <div className=" my-auto">
                    <FaRegCircle
                      size="22"
                      className={`text-my-text-color rounded-full ${
                        answers[current].answer === idx
                          ? "bg-[#6C6C6C]"
                          : ""
                      } `}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* right box  */}
            <div className=" w-[30%] max-sm:w-full flex flex-col justify-end max-sm:justify-between">
              <div className="flex flex-row justify-between gap-2 ">
                <button
                  onClick={handlePrev}
                  disabled={current === 0}
                  className="bg-[#FFE332] py-2 px-4 rounded-full  flex flex-row items-center disabled:opacity-50 pl-2"
                >
                  <MdKeyboardArrowLeft className="my-auto size-6" /> Prev
                </button>

                <button
                  onClick={handleNext}
                  disabled={current === questions.length - 1}
                  className="bg-[#FFE332] py-2 px-4 rounded-full  flex flex-row items-center disabled:opacity-50 pr-2"
                >
                  Next <MdKeyboardArrowRight className="my-auto size-6" />
                </button>

                <button
                  onClick={handleSubmit}
                  className="px-4 py-2  rounded-full bg-[#007076] text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  
  );
}
