"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { GoStopwatch } from "react-icons/go";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function QuizResult({
  questions,
  answers,
  topic,
  timeTaken,
  onRestart,
}: {
  questions: any[];
  timeTaken: number;
  topic: string;
  answers: { questionId: string; answer: number | null }[];
  onRestart: () => void;
}) {
  const [current, setCurrent] = useState(0);

  // Calculate overall stats
  let totalScore = 0;
  let totalPossibleScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let notAttemptedCount = 0;

questions.forEach((question) => {
  // Add the maximum possible marks for this question
  totalPossibleScore += question.marksPositive ?? 0;

  // Find the user's answer for this question
  const userAnswer = answers.find((a) => a.questionId === question.id)?.answer;

  // Adjust the correct option index (DB uses 1-based index)
  const correctIndex = question.correctOption - 1;

  if (userAnswer === correctIndex) {
    // Correct answer
    totalScore += question.marksPositive ?? 0;
    correctCount++;
  } else if (userAnswer != null) {
    // Wrong answer
    totalScore += question.marksNegative ?? 0;
    incorrectCount++;
  } else {
    // Not attempted
    notAttemptedCount++;
  }
});


  const q = questions[current];
  const userAnswerObj = answers.find((a) => a.questionId === q.id);
  const userAnswerIndex = userAnswerObj?.answer; // 0-based from answers
  const correctAnswerIndex = q.correctOption - 1; // normalize to 0-based

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

    const marksCardRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if (marksCardRef.current) {
    const top = marksCardRef.current.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: top - 100, // adjust this number (50, 80, 120…)
      behavior: "smooth",
    });
  }
}, []);
  

  return (
    <div className="max-w-[1400px] mx-auto dark:bg-black  py-14">
      {/* Header card */}


      <div ref={marksCardRef} className="w-[90%] bg-[#FAFCFC] border-2 mx-auto flex flex-col items-center dark:bg-[#313131] py-6 border-[#E6F1F1] rounded-2xl ">
        <div
          className="-mt-14 rounded-full p-3 bg-white"
          style={{
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.15)",
          }}
        >
          <Image
            src={"/ui/client/current-affaris-page/party.svg"}
            alt="party"
            width={50}
            height={50}
          />
        </div>

        <div className="py-4">
          <p className="font-bold dark:text-white text-xl px-4 max-sm:text-center">
            Congratulations!!! Your Score Card is Here
          </p>
        </div>

        <div className="flex flex-row gap-2 items-center justify-center">
          <GoStopwatch className="size-6 dark:text-white" />
          <p className="text-xl dark:text-white">
            Time Taken:{" "}
            {Number(timeTaken) < 60
              ? `${Number(timeTaken).toFixed(2)} seconds`
              : `${(Number(timeTaken) / 60).toFixed(2)} minutes`}
          </p>
        </div>

        <div className="flex flex-row max-sm:flex-col max-sm:gap-2 justify-around w-full py-12">
          <div className="flex flex-row gap-2 min-w-[160px] justify-center">
            <FaRegCircle className="bg-[#2CBB01] my-auto rounded-full text-[#2CBB01]" />
            <p className="text-xl dark:text-white">Correct : {correctCount}</p>
          </div>
          <div className="flex flex-row gap-2 min-w-[160px] justify-center">
            <FaRegCircle className="bg-[#FF0000] my-auto rounded-full text-[#FF0000]" />
            <p className="text-xl dark:text-white">Incorrect : {incorrectCount}</p>
          </div>
          <div className="flex flex-row gap-2 min-w-[160px] justify-center">
            <FaRegCircle className="bg-[#6C6C6C] my-auto rounded-full text-[#6C6C6C]" />
            <p className="text-xl dark:text-white">Not Attempted: {notAttemptedCount}</p>
          </div>
        </div>

        <div>
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-[#FFE332] rounded-full"
          >
            Restart Quiz
          </button>
        </div>
      </div>

      {/* Explanation section */}
      <div className="w-[90%] py-4 dark:bg-[#313131] bg-[#FAFCFC] rounded-2xl mx-auto px-6 mt-14 border-2 border-[#E6F1F1]">
        {/* question number */}
        <div className="flex flex-row justify-between items-center w-[90%] mx-auto -mt-10">
          <div
            className="min-w-[60px] bg-white py-1"
            style={{
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.15)",
            }}
          >
            <p className="font-montserrat font-bold text-3xl max-sm:text-2xl shadow-black/80 text-[#007076] text-center">
              {current < 9 ? "0" + (current + 1) : current + 1}
            </p>
          </div>
        </div>

        {/* question + topic */}
        <div className="flex flex-row justify-between items-start min-h-[20vh] mt-6">
          <div className="w-[60%]  max-sm:w-full">
            <p className="font-bold dark:text-white">{q.questionText}</p>
          </div>
          <div className="flex items-end max-sm:hidden">
            <button className="px-4 py-2 bg-[#FFE332] rounded-full text-sm">
              {topic}
            </button>
          </div>
        </div>

        {/* options */}
        <div className="flex flex-row max-sm:flex-col justify-between items-stretch max-sm:gap-4">
          {/* left options */}
          <div className="max-sm:py-2 max-sm:w-full max-sm:grid-cols-1 grid grid-cols-2 gap-6 w-[60%]">
            {q.options.map((opt: { text: string }, idx: number) => (
              <button
                key={idx}
                className={`px-3 py-3 border dark:border-white rounded-full flex flex-row justify-between  ${
                      idx === correctAnswerIndex
                        ? "bg-[#2CBB0126] border-[#2CBB0126]" // correct answer
                        : idx === userAnswerIndex
                        ? "bg-[#FF000026] border-[#FF000026]" // user wrong choice
                        : "" // default
                    } `}
              >
                <p className={`max-lg:text-sm  ${
                      idx === correctAnswerIndex
                        ? "text-black dark:text-white" // correct answer
                        : idx === userAnswerIndex
                        ? "text-black dark:text-white" // user wrong choice
                        : "text-my-text-color" // default
                    }`}>{opt.text}</p>


                <div className="my-auto">
                  <FaRegCircle
                    size={22}
                    className={`rounded-full ${
                      idx === correctAnswerIndex
                        ? "bg-[#2CBB01] text-[#2CBB01]" // correct answer
                        : idx === userAnswerIndex
                        ? "bg-[#FF0000] text-[#FF0000]" // user wrong choice
                        : " text-[#6C6C6C]" // default
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* right navigation */}
          <div className="w-[30%] max-sm:w-full flex flex-col justify-end">
            <div className="flex flex-row justify-between gap-2">
              <button
                onClick={handlePrev}
                disabled={current === 0}
                className="bg-[#FFE332] py-2 px-4 rounded-full flex flex-row items-center disabled:opacity-50 pl-2"
              >
                <MdKeyboardArrowLeft className="my-auto size-6" /> Prev
              </button>
              <button
                onClick={handleNext}
                disabled={current === questions.length - 1}
                className="bg-[#FFE332] py-2 px-4 rounded-full flex flex-row items-center disabled:opacity-50 pr-2"
              >
                Next <MdKeyboardArrowRight className="my-auto size-6" />
              </button>
            </div>
          </div>
        </div>

      
      </div>

      {/* detail explanation  */}


      <div className="w-[90%] py-4 dark:bg-[#313131] bg-[#FAFCFC] rounded-2xl mx-auto px-6 mt-14 border-2 border-[#E6F1F1]">

            <div className="flex flex-col items-start ">

              <p>
                <span className="font-bold dark:text-white">Answer : {q.options[correctAnswerIndex]?.text}</span>

              </p>

              <p className="py-4">

                {q.solutionText ? (
                  <span className=" dark:text-white">Explanation : {q.solutionText}</span>
                ) : (
                  <span className=" dark:text-white">No explanation provided for this question.</span>
                )}

              </p>

            </div>

      </div>
    </div>
  );
}
