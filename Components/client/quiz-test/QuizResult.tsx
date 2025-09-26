"use client";
import Image from "next/image";
import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
export default function QuizResult({
  questions,
  answers,
  topic,
  timeTaken,
  timeLimit,
  onRestart,
}: {
  questions: any[];
  timeTaken: number;
  timeLimit: number;
  topic: string;
  answers: { questionId: string; answer: number | null }[];
  onRestart: () => void;
}) {
  const [current, setCurrent] = useState(0);

  const calculateScore = () => {
    let correctMarks = 0;
    let incorrectMarks = 0;
    let totalMarks = questions.reduce((sum, q) => sum + q.marksPositive, 0);

    answers.forEach((ans) => {
      const q = questions.find((qq) => qq.id === ans.questionId);
      if (!q) return;

      if (ans.answer !== null) {
        if (ans.answer === q.correctOption - 1) {
          correctMarks += q.marksPositive;
        } else {
          incorrectMarks += Math.abs(q.marksNegative);
        }
      }
    });

    return { totalMarks, correctMarks, incorrectMarks };
  };

  const { totalMarks, correctMarks, incorrectMarks } = calculateScore();
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
    const userAnswer = answers.find(
      (a) => a.questionId === question.id
    )?.answer;

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
  const handleOnClick = (index: number) => {
    setCurrent(index);
  };

  const handleSelect = (optionIndex: number) => {};

  const calculatePerformanceByLevel = () => {
    const levels = ["easy", "medium", "hard"]; // adjust if you use lowercase
    const stats: Record<
      string,
      { total: number; attempted: number; correct: number; incorrect: number }
    > = {};

    levels.forEach((lvl) => {
      stats[lvl] = { total: 0, attempted: 0, correct: 0, incorrect: 0 };
    });

    questions.forEach((q) => {
      const level = q.level; // e.g., "Easy" | "Medium" | "Hard"
      if (!stats[level]) return;

      stats[level].total++;

      const userAnswer = answers.find((a) => a.questionId === q.id)?.answer;
      const correctIndex = q.correctOption - 1;

      if (userAnswer != null) {
        stats[level].attempted++;
        if (userAnswer === correctIndex) {
          stats[level].correct++;
        } else {
          stats[level].incorrect++;
        }
      }
    });

    return stats;
  };

  const performanceByLevel = calculatePerformanceByLevel();

  return (
    <div className="max-w-[1400px] mx-auto dark:bg-black border-2 py-14">
      {/* Header card */}
      <div className="w-[90%] bg-[#FAFCFC] border-2 mx-auto flex flex-col items-center dark:bg-[#313131] py-6 border-[#E6F1F1] rounded-2xl ">
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
          <p className="font-bold dark:text-white text-xl">
            Congratulations!!! Your Score Card is Here
          </p>
        </div>

        <div className="flex flex-row gap-4 items-center justify-center ">
          <div className="flex flex-row gap-1">
            <Image
              src="/typing-test/icons/taken.svg"
              alt="typing-test"
              width={24}
              height={24}
            />
            <p className="text-lg">
              Time Taken:{" "}
              {Number(timeTaken) < 60
                ? `${Number(timeTaken).toFixed(2)} seconds`
                : `${Math.floor(Number(timeTaken) / 60)} minutes`}
            </p>
          </div>

          <div className="flex flex-row gap-1">
            <Image
              src="/typing-test/icons/taken.svg"
              alt="typing-test"
              width={24}
              height={24}
            />
            <p className="text-lg"> Time Duration: {timeLimit} m</p>
          </div>

          {/* <div className="p-6">
            <h2 className="text-xl font-bold">Your Result</h2>
            <p>Total Score: {totalMarks}</p>
            <p>Correct Marks: {correctMarks}</p>
            <p>Negative Marks: {incorrectMarks}</p>
          </div> */}
        </div>

        {/* report card */}
        <div className="w-[90%] mx-auto flex flex-row justify-around items-center py-8">
          {/* left div  */}
          <div className="w-[35%] flex flex-col px-2 gap-1 bg-white rounded-2xl py-2 ">
            <div className="flex flex-row justify-between items-center py-1">
              <div className="flex flex-row  gap-1">
                <FaRegCircle className="my-auto   size-5" /> <p>Total Marks</p>
              </div>

              <p>{totalMarks}</p>
            </div>

            <div className="flex flex-row justify-between items-center  py-1">
              <div className="flex flex-row  gap-1">
                <FaRegCircle className="my-auto    size-5 bg-[#2CBB01] rounded-full text-[#2CBB01]" />{" "}
                <p>Marks Obtained</p>
              </div>

              <p>{correctMarks}</p>
            </div>
            <div className="flex flex-row justify-between items-center  py-1">
              <div className="flex flex-row gap-1 ">
                <FaRegCircle className="my-auto   size-5  bg-[#FF0000] rounded-full text-[#FF0000]" />{" "}
                <p>Negative Marks</p>
              </div>

              <p>{incorrectMarks}</p>
            </div>
          </div>
          {/* right div  */}

          <div className="w-[35%] px-2 py-2 flex flex-col gap-1   bg-white rounded-2xl">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row justify-between items-center  py-1">
                <div className="flex flex-row gap-1 ">
                  <IoCheckmarkCircleOutline className="my-auto  size-6  rounded-full text-[#2CBB01]" />{" "}
                  <p>Correct Questions</p>
                </div>
              </div>
              <p>{correctCount}</p>
            </div>{" "}
            <div className="flex flex-row justify-between items-center  py-1">
              <div className="flex flex-row gap-1 ">
                <RxCrossCircled className="my-auto  size-6 rounded-full text-[#FF0000]" />{" "}
                <p>Incorrect Questions</p>
              </div>

              <p>{incorrectCount}</p>
            </div>
            <div className="flex flex-row justify-between items-center  py-1">
              <div className="flex flex-row gap-1 ">
                <FaRegCircle className="my-auto  bg-[#6C6C6C]  size-5 rounded-full text-[#6C6C6C]" />{" "}
                <p>Not Attempted</p>
              </div>

              <p>{notAttemptedCount}</p>
            </div>
          </div>
        </div>

        <div className="py-2">
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-[#FFE332] rounded-full"
          >
            Restart Quiz
          </button>
        </div>
      </div>

      {/* Explanation section */}

      <div className="w-[90%] py-4 dark:bg-[#313131] bg-[#FAFCFC] rounded-2xl mx-auto px-6 mt-14  border-[#E6F1F1]">
        {/* vi qwuestrion asn wer  */}

        <div className="w-full mx-auto flex flex-row justify-between   h-[80vh]">
          {/* Left div  */}

          <div className="flex flex-col justify-start items-center  w-[65%]">
            {/* top heaeding */}
            <div className="  flex flex-row justify-around items-center gap-12 w-full">
              {/* timer and marks */}
              <div className="flex flex-row justify-between items-center  w-[45%] gap-1 ">
                <div className="flex flex-row justify-between items-center -mt-8  ">
                  <div
                    className="  min-w-[60px]  bg-white py-1  "
                    style={{
                      boxShadow:
                        "0 4px 10px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.15)",
                    }}
                  >
                    <p className="font-montserrat font-bold text-3xl max-sm:text-2xl shadow-black/80 text-[#007076] text-center">
                      {current < 10 ? "0" + Number(current + 1) : current}
                    </p>
                  </div>
                </div>

                <div className="">
                  <p className=" text-sm text-green-600 font-semibold">
                    {" "}
                    {q.marksPositive} Marks{" "}
                  </p>
                </div>

                <div className="">
                  <p className="text-sm  text-red-600  font-semibold">
                    {" "}
                    {q.marksNegative} Negative Marks
                  </p>
                </div>
              </div>

              {/* level */}
              <div className="bg-[#E6F1F1] px-4 py-1 rounded-2xl ">
                <p className="text-sm  font-semibold"> Level {q.level}</p>
              </div>
            </div>

            <div className="border-2  flex flex-row justify-between items-stretch h-full">
              {/* question and options  */}

              <div className="flex flex-col justify-between items-start     ">
                {/* question  */}

                <div className="w-full px-4  border-2 min-h-[40vh] pt-2">
                  <p className="font-bold dark:text-white">{q.questionText}</p>
                </div>

                {/* option */}

                <div className="flex flex-row justify-between items-stretch border-2 border-red-300 w-full px-4 ">
                  <div className="max-sm:py-2 max-sm:w-full grid grid-cols-2 gap-6 w-full">
                    {q.options.map((opt: { text: string }, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={`px-3 py-3 border dark:border-white rounded-full flex flex-row justify-between  ${
                          idx === correctAnswerIndex
                            ? "bg-[#2CBB0126] border-[#2CBB0126]" // correct answer
                            : idx === userAnswerIndex
                              ? "bg-[#FF000026] border-[#FF000026]" // user wrong choice
                              : "" // default
                        } `}
                      >
                        <p
                          className={`max-lg:text-sm  ${
                            idx === correctAnswerIndex
                              ? "text-black dark:text-white" // correct answer
                              : idx === userAnswerIndex
                                ? "text-black dark:text-white" // user wrong choice
                                : "text-my-text-color" // default
                          }`}
                        >
                          {opt.text}
                        </p>

                        <div className=" my-auto">
                          <FaRegCircle
                            size="22"
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
                </div>
              </div>
            </div>
          </div>

          {/* right div */}

          <div className="border-2 border-red-500 w-[32%] self-stretch flex flex-col  ">
            {/* Timer and SubTopics */}
            <div className="border-2 flex flex-row  justify-between items-center pb-3 ">
              <div className=" flex items-end ">
                <button className="px-4 py-2 bg-[#95DC7F]  rounded-full text-sm">
                  {topic}
                </button>
              </div>
            </div>

            {/* navigation  */}

            <div className=" h-full overflow-y-auto">
              <div className="flex flex-row flex-wrap justify-between items-center gap-2 ">
                {Array.from({ length: questions.length }, (_, idx) => {
                  const q = questions[idx];
                  const userAnswer = answers.find(
                    (a) => a.questionId === q.id
                  )?.answer;
                  const correctIndex = q.correctOption - 1;

                  let statusClass = "";
                  if (userAnswer === correctIndex) {
                    statusClass = "bg-[#2CBB01] text-white";
                  } else if (userAnswer != null) {
                    statusClass = "bg-[#FF0000] text-white";
                  } else {
                    statusClass = "bg-gray-200";
                  }

                  return (
                    <div key={idx}>
                      <button
                        onClick={() => handleOnClick(idx)}
                        className={`px-4 py-2 border min-w-[50px] border-[#6C6C6C] rounded ${statusClass}`}
                      >
                        {idx + 1}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto flex flex-row justify-end  border-2 ">
          {/* left box  */}

          {/* rightbox  */}

          <div className="border-2 w-[32%] flex flex-row justify-between items-center py-2 px-2">
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
          </div>
        </div>

        {/* question number ---------------------------------------------------- */}

        {/* question + topic */}
        {/* <div className="flex flex-row justify-between items-start min-h-[20vh] mt-6">
          <div className="w-[60%]">
            <p className="font-bold dark:text-white">{q.questionText}</p>
          </div>
          <div className="flex items-end">
            <button className="px-4 py-2 bg-[#FFE332] rounded-full text-sm">
              {topic}
            </button>
          </div>
        </div> */}

        {/* options */}
        {/* <div className="flex flex-row justify-between items-stretch">
         
          <div className="max-sm:py-2 max-sm:w-full grid grid-cols-2 gap-6 w-[60%]">
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
                <p
                  className={`max-lg:text-sm  ${
                    idx === correctAnswerIndex
                      ? "text-black dark:text-white" // correct answer
                      : idx === userAnswerIndex
                        ? "text-black dark:text-white" // user wrong choice
                        : "text-my-text-color" // default
                  }`}
                >
                  {opt.text}
                </p>

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

     
          <div className="w-[30%] flex flex-col justify-end">
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
        </div> */}
      </div>

      {/* detail explanation  */}

      <div className="w-[90%] py-4 dark:bg-[#313131] bg-[#FAFCFC] rounded-2xl mx-auto px-6 mt-14 border-2 border-[#E6F1F1]">
        <div className="flex flex-col items-start ">
          <div className="flex flex-col">
            <span className="font-bold dark:text-white">
              Correct Answer : {q.options[correctAnswerIndex]?.text}
            </span>
            <span className="font-bold dark:text-white">
              Choose Answer :{" "}
              {userAnswerIndex !== null && userAnswerIndex !== undefined
                ? q.options[userAnswerIndex]?.text
                : "Not Attempted"}
            </span>
          </div>

          <p className="py-4">
            {q.solutionText ? (
              <span className=" dark:text-white">
                Explanation : {q.solutionText}
              </span>
            ) : (
              <span className=" dark:text-white">
                No explanation provided for this question.
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Performance by Level */}
      <div className="w-[90%] mx-auto py-8">
        <h2 className="text-lg font-bold dark:text-white mb-4  text-center">
          Level wise Performance Report Card
        </h2>

        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead className="bg-[#E6F1F1] dark:bg-gray-700">
            <tr>
              <th className=" px-4 py-2">Level</th>
              <th className=" px-4 py-2">Total Questions</th>
              <th className="px-4 py-2">Attempted</th>
              <th className=" px-4 py-2 ">Correct</th>
              <th className=" px-4 py-2 ">Incorrect</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(performanceByLevel).map(([level, data]) => (
              <tr
                key={level}
                className="even:bg-gray-50 odd:bg-white dark:even:bg-gray-800 dark:odd:bg-gray-900"
              >
                <td className=" px-4 py-2  text-center">{level === "easy" ? "Easy" : level === "medium" ? "Medium" : "Hard"}
</td>
                <td className=" px-4 py-2 text-center">{data.total}</td>
                <td className=" px-4 py-2 text-center">{data.attempted}</td>
                <td className="px-4 py-2 text-center ">
                  {data.correct}
                </td>
                <td className=" px-4 py-2 text-center ">
                  {data.incorrect}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
