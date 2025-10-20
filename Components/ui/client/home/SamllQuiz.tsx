"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface QuizOption {
  text: string;
}

interface QuizAPI {
  id: string;
  questionText: string;
  options: QuizOption[];
  correctOption: number; // 1-based index
}

interface QuizItem {
  question: string;
  options: string[];
  answer: string;
}

export default function Quiz() {
  const [quizData, setQuizData] = useState<QuizItem[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Track stats
  const [attempted, setAttempted] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  // Track quiz finished state
  const [isFinished, setIsFinished] = useState(false);

  // When user selects an option
  const handleOptionClick = (option: string) => {
    setSelected(option);
    const correctAnswer = option === quizData[currentQ].answer;
    setIsCorrect(correctAnswer);

    // Update stats
    setAttempted((prev) => prev + 1);
    if (correctAnswer) {
      setCorrect((prev) => prev + 1);
    } else {
      setWrong((prev) => prev + 1);
    }
  };

  // Next question
  const handleNext = () => {
    if (currentQ < quizData.length - 1) {
      setSelected(null);
      setIsCorrect(null);
      setCurrentQ((prev) => prev + 1);
    } else {
      // Last question → finish quiz
      setIsFinished(true);
    }
  };

  // Prev question
  const handlePrev = () => {
    if (currentQ > 0) {
      setSelected(null);
      setIsCorrect(null);
      setCurrentQ((prev) => prev - 1);
    }
  };

  // Fetch quiz data
  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/small-quiz/client`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data: QuizAPI[] = await res.json();

        // Transform backend data → UI shape
        const transformed: QuizItem[] = data.map((q) => ({
          question: q.questionText,
          options: q.options.map((opt) => opt.text),
          answer: q.options[q.correctOption - 1]?.text || "",
        }));

        setQuizData(transformed);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    }
    fetchQuiz();
  }, []);

  if (quizData.length === 0) {
    return <p className="text-white p-4">Loading quiz...</p>;
  }

  return (
    <div className="bg-[#007076]">
      <div className="w-[90%] mx-auto pt-14 max-sm:pt-10 max-sm:py-24 pb-8 flex flex-row max-sm:flex-col justify-between ">
        {/* Heading */}
        <div className="w-[33%] max-sm:w-[95%] flex flex-col items-start max-sm:pb-8  pt-2 max-sm:justify-between">
          <p className="bg-[#2CBB0180] text-white rounded-full p-2 text-sm py-2 my-2">
            <span className="px-2 rounded-full bg-[#FFFFFF] mr-2"></span>
            Don't Miss The Live Quizzes
          </p>
          <p className="text-white text-3xl font-bold  py-2">
            Master SSC CGL with Live Quizzes!
          </p>
          <p className="text-[#FFFFFF] text-sm py-2 max-sm:hidden">
            Engage with Us to Explore Subject-Wise Quizzes and Practice 1000+
            Questions for Comprehensive Preparation!
          </p>
        </div>

        {/* Quiz body */}
        <div className="border-2 border-white bg-[#26858A] rounded-xl w-[60%] py-2 max-sm:w-full">
          {/* Heading numbers + navigation */}

          {/* If quiz is finished → show result */}
          {isFinished ? (
            <div className=" flex flex-col w-full items-center justify-start border-white ">
              <div className="bg-white p-2 rounded-full text-4xl -mt-8">🎉</div>
              <p className="text-2xl py-4 text-white">Conratulations!!!</p>
              <div className="flex flex-row justify-around items-center w-full py-3 ">
                <div className="flex flex-row space-x-2">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full  font-bold bg-[#2CBB01] border-1 border-white "></span>{" "}
                  <span className="text-white max-sm:text-center"> Correct : {correct} </span>
                </div>
                <div className="flex flex-row space-x-2">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full  font-bold bg-[#FF0000] border-1 border-white "></span>{" "}
                  <span className="text-white max-sm:text-center"> Incorrect : {wrong} </span>
                </div>
                <div className="flex flex-row space-x-2 max-sm:space-x-1">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full  font-bold bg-[#6C6C6C] border-1 border-white "></span>{" "}
                  <span className="text-white max-sm:text-center">
                    {" "}
                    Not Attempted : {quizData.length - attempted}{" "}
                  </span>
                </div>
              </div>

              <div className="w-[90%] py-4 border-t-1 border-white">
                <p className="text-white text-center">
                  Explore More Subject-Wise Quiz Sessions in the Section Below!
                </p>
              </div>
            </div>
          ) : (
            // Show current question + options
            <div>
              <div className="flex flex-row relative py-2">
                <div className="bg-white p-3 max-sm:p-2 absolute -top-8 left-6">
                  <p className="font-montserrat font-bold text-4xl max-sm:text-2xl text-[#007076]">
                    {String(currentQ + 1).padStart(2, "0")}
                  </p>
                </div>
                <div className="pl-28 max-sm:pl-18">
                  <p className="text-sm text-white">Quantitative Aptitude</p>
                </div>

                {!isFinished && (
                  <div className="absolute right-16 -top-8 max-sm:right-6 flex flex-row gap-2">
                    <button
                      onClick={handlePrev}
                      className="bg-white p-3 text-2xl max-sm:p-2 max-sm:text-xl rounded-full text-[#007076]"
                    >
                      <IoIosArrowBack />
                    </button>
                    <button
                      onClick={handleNext}
                      className="bg-white p-3 max-sm:p-2 max-sm:text-xl text-2xl rounded-full text-[#007076]"
                    >
                      <IoIosArrowForward />
                    </button>
                  </div>
                )}
              </div>

              <div className=" flex flex-row max-sm:flex-col py-4">
                <div className="w-[40%] max-sm:w-full max-sm:py-2 max-sm:min-h-20 px-2">
                  <p className="text-white max-sm:text-center">{quizData[currentQ].question}</p>
                </div>

                <div className="w-[70%] max-sm:py-2 max-sm:w-full grid grid-cols-2 max-sm:grid-cols-1 gap-6 px-2  ">
                  {quizData[currentQ].options.map((option, index) => {
                    const isSelected = selected === option;
                    const isAnswer = option === quizData[currentQ].answer;

                    const correctOpt = isSelected && isCorrect;
                    const wrongOpt = isSelected && isCorrect === false;
                    const showCorrect = isCorrect === false && isAnswer;

                    return (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        disabled={!!selected}
                        className={`
                          flex items-center justify-between py-2 px-2 rounded-full text-left transition w-full border-2
                          ${
                            correctOpt || showCorrect
                              ? "bg-[#2CBB0126] text-white"
                              : ""
                          }
                          ${wrongOpt ? "bg-[#FF000026] text-white" : ""}
                          ${
                            !correctOpt && !wrongOpt && !showCorrect
                              ? "bg-[#46979B] text-white"
                              : ""
                          }
                        `}
                      >
                        <span className="text-xs">{option}</span>
                        <span
                          className={`
                            w-6 h-6 flex items-center justify-center rounded-full border-2 font-bold
                            ${
                              correctOpt || showCorrect
                                ? "bg-[#2CBB01] border-white"
                                : ""
                            }
                            ${wrongOpt ? "bg-[#FF0000] border-white" : ""}
                            ${
                              !correctOpt && !wrongOpt && !showCorrect
                                ? "border-white text-[#007076]"
                                : ""
                            }
                          `}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
