"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import { FaRegCircle } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Quiz from "@/Components/ui/client/home/smallQuiz/SamllQuizMain";
import { CiClock1 } from "react-icons/ci";
import { set } from "date-fns";
import Image from "next/image";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { RiCheckboxCircleFill, RiCheckboxCircleLine } from "react-icons/ri";
import { IoCheckmarkCircle, IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
type quiz = {
  id: string;
  quizId: number;

  questionText: string;
  questionImage: String;

  options: { text: string; image: string }[];

  solutionText: string;
  solutionImage: string;

  correctOption: number;
  marksPositive: number;
  marksNegative: number;
  level: string;
  createdAt: string;
  updatedAt: string;
};

type mark = {
  questionsId: string;
  answered: boolean;
  noAnswered: boolean;
  notVisited: boolean;
};

export default function QuizTest({
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

  const [mark, setMark] = useState<mark[]>(
    questions.map((q) => ({
      questionsId: q.id,
      answered: false, // Changed from null to false
      noAnswered: false, // Changed from null to false
      notVisited: true, // Set to true as they haven't been visited yet
    })),
  );
  const [counts, setCounts] = useState<{
    answered: number;
    notAnswered: number;
    notVisited: number;
  }>({
    answered: 0,
    notAnswered: 0,
    notVisited: 0,
  });

  // Update counts whenever `mark` changes
  useEffect(() => {
    const answered = mark.filter((m) => m.answered).length;
    const notAnswered = mark.filter((m) => m.noAnswered).length;
    const notVisited = mark.filter((m) => m.notVisited).length;

    setCounts({ answered, notAnswered, notVisited });
  }, [mark]);

  // answer notAnswer

  useEffect(() => {
    setMark((prevMarks) =>
      prevMarks.map((m, index) => {
        if (index === current) {
          if (m.notVisited) {
            // <--- check the field from the mark object
            return {
              ...m,
              notVisited: false,
              noAnswered: true,
              answered: false,
            };
          }
        }

        return m;
      }),
    );
  }, [current]);

  const answersRef = useRef(answers);
  answersRef.current = answers; // always have latest answers
  const startTimeRef = useRef<number>(Date.now());
  const q: quiz = questions[current];

const handleSelect = (optionIndex: number) => {
  setAnswers((prev) => {
    const copy = [...prev];
    const currentAnswer = copy[current].answer;

    const newAnswer =
      currentAnswer === optionIndex ? null : optionIndex;

    copy[current] = {
      questionId: q.id,
      answer: newAnswer,
    };

    // ✅ Update mark based on REAL state
    setMark((prevMarks) =>
      prevMarks.map((m, index) => {
        if (index === current) {
          return {
            ...m,
            answered: newAnswer !== null,
            noAnswered: newAnswer === null,
            notVisited: false,
          };
        }
        return m;
      }),
    );

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

  const handleOnClick = (index: number) => {
    setCurrent(index);
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
  const [isNavOpen, setIsNavOpen] = useState(false);

  const levelStyles: Record<string, string> = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  };
  return (
    <>
      <div className=" dark:bg-black  ">
        <div className="w-[90%]  flex flex-row  mx-auto items-start justify-between ">
          {/* ---------------------------left navigation box------------------------------------- */}

          {/*  Desktop sidevar */}
          <div className="hidden md:block shadow-[0_0_9px_rgba(0,0,0,0.2)] my-2 w-[25%] rounded-2xl bg-white dark:bg-[#1e1e1e]">
            <div className="h-full overflow-y-auto">
              <p className="text-center text-lg font-bold py-4 dark:text-white">
                Question: {questions.length}
              </p>

              <div className="flex flex-wrap justify-center gap-3 px-2 pb-4">
                {questions.map((_, idx) => {
                  const m = mark[idx];

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOnClick(idx)}
                      className={`px-4 py-2 min-w-[50px] border border-[#C2C2C2] rounded dark:text-white
              ${
                m.notVisited
                  ? ""
                  : m.answered
                    ? "bg-[#6F6F6F] text-white border-[#6F6F6F]"
                    : ""
              }
            `}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-center gap-4 py-4 flex-wrap">
                <p className="font-bold text-sm flex items-center gap-1 dark:text-white">
                  <IoCheckmarkCircle className="size-6" />
                  Answered
                </p>

                <p className="font-bold text-sm flex items-center gap-1 dark:text-white">
                  <IoCheckmarkCircleOutline className="size-6" />
                  Not Answered
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Butooon  */}
          <div className="md:hidden fixed bottom-12 left-0 w-full bg-white dark:bg-[#1e1e1e] rounded-t-2xl z-40">
            <button
              onClick={() => setIsNavOpen(true)}
              className="w-full py-5 text-center font-semibold dark:text-white flex flex-row items-center justify-center gap-2 "
            >
               Questions ({questions.length})  <IoIosArrowUp className="size-6" />
            </button>
          </div>

          {/*  Overlay  */}
          {isNavOpen && (
            <div
              onClick={() => setIsNavOpen(false)}
              className="md:hidden fixed inset-0 bg-black/40 z-40"
            />
          )}

          {/* Mobile Drawer */}
          <div
            className={`md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-[#1e1e1e] rounded-t-2xl shadow-lg z-40 transform transition-transform duration-300 ${
              isNavOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto my-2" />

            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <p className="font-bold dark:text-white">
                Questions ({questions.length})
              </p>
              <button
                onClick={() => setIsNavOpen(false)}
                className="dark:text-white"
              >
                Close
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              <div className="flex flex-wrap gap-3 justify-center">
                {questions.map((_, idx) => {
                  const m = mark[idx];

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        handleOnClick(idx);
                        setIsNavOpen(false);
                      }}
                      className={`px-4 py-2 min-w-[50px] border border-[#C2C2C2] rounded dark:text-white
              ${
                m.notVisited
                  ? ""
                  : m.answered
                    ? "bg-[#6F6F6F] text-white border-[#6F6F6F]"
                    : ""
              }
            `}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-center gap-4 py-4 flex-wrap">
                <p className="font-bold text-sm flex items-center gap-1 dark:text-white">
                  <IoCheckmarkCircle className="size-6" />
                  Answered
                </p>

                <p className="font-bold text-sm flex items-center gap-1 dark:text-white">
                  <IoCheckmarkCircleOutline className="size-6" />
                  Not Answered
                </p>
              </div>
            </div>
          </div>

          {/*--------------- right question and submit box ----------------  */}

          <div className=" shadow-[0_0_9px_rgba(0,0,0,0.2)] top-2 rounded-2xl my-2 w-[70%] py-2 max-md:w-full">
            {/* topic name and  and timer */}

            <div className="flex flex-row justify-between py-2 my-2 px-4 ">
              <p className="capitalize bg-[#FFE5F4] px-2  "> {topic}</p>
              <CountdownTimer
                minutes={timeLimit}
                onFinish={handleTimerFinish}
                setTimeTaken={setTimeTaken}
              />
            </div>

            {/* question div and nav */}

            <div className="flex flex-col justify-start items-center  max-sm:w-full dark:bg-[#313131]     rounded-2xl max-sm:pb-4">
              {/* top heaeding */}
              <div className="  flex flex-row   justify-between items-center  w-full   px-4">
                {/* level */}
                <div
                  className={`px-4 py-1 rounded-2xl ${
                    levelStyles[q.level?.toLowerCase()] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  <p className="text-sm font-semibold capitalize">
                    Level {q.level}
                  </p>
                </div>

                {/*  level and marks  */}
                <div className="flex flex-row justify-between items-center  ">
                  <div className=" flex flex-row  gap-2">
                    <p className="w-[50px] text-center text-sm font-semibold bg-[#EBFFE4] text-[#11C352] border-2 p-2 ">
                      + {q.marksPositive}
                    </p>

                    <p className="w-[50px] text-center text-sm font-semibold bg-[#FDE9E9] text-[#F14343] border-2 p-2  ">
                      - {q.marksNegative}
                    </p>
                  </div>
                </div>
              </div>

              <div className=" w-full flex flex-row justify-between items-stretch h-full">
                {/* question and options  */}

                <div className="flex flex-col justify-between items-start   flex-1  ">
                  {/* question  */}

                  <div
                    className={`w-full px-4    py-3 flex flex-col justify-between gap-2  max-sm:flex-col  `}
                  >
                    <p
                      className={`font-bold dark:text-white  w-full `}
                    >
                      {q.questionText}
                    </p>

                    {/* image have to fixed size */}
                    {q.questionImage ? (
                      <div className="relative   max-sm:w-full aspect-[16/9]  ">
                        <Image
                          src={q.questionImage.toString()}
                          alt="question image"
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : null}
                  </div>

                  {/* option */}

                  <div className="flex flex-row justify-between items-stretch  w-full px-4 ">
                    <div
                      className={`max-sm:py-2 max-sm:w-full   mx-auto gap-6 w-full  py-4 ${q.options[0]?.image ? "flex flex-wrap max-md:flex-col  justify-between " : "grid grid-cols-1  max-sm:grid-cols-1"}`}
                    >
                      {q.options.map(
                        (
                          opt: { text?: string; image?: string },
                          idx: number,
                        ) => {
                          const selected = answers[current].answer === idx;
                          const hasText = !!opt.text;
                          const hasImage = !!opt.image;
                          const hasBoth = hasText && hasImage;

                          // CASE 1: BOTH TEXT + IMAGE
                          if (hasBoth) {
                            return (
                              <div
                                key={idx}
                                onClick={() => handleSelect(idx)}
                                className="relative max-w-[400px] w-[40%] hover:cursor-pointer flex flex-col gap-2"
                              >
                                {/* TEXT ABOVE */}
                                <p className="text-my-text-color max-lg:text-sm font-medium ">
                                  {opt.text}
                                </p>

                                {/* IMAGE BELOW */}
                                <div className="relative w-full aspect-[16/9]">
                                  <Image
                                    src={(opt.image ?? "").toString()}
                                    alt="option"
                                    fill
                                    className={`object-contain ${
                                      selected
                                        ? "border-4 border-[#6C6C6C] dark:border-white "
                                        : ""
                                    }`}
                                  />
                                </div>
                              </div>
                            );
                          }

                          // CASE 2: TEXT ONLY
                          if (hasText) {
                            return (
                              <button
                                key={idx}
                                onClick={() => handleSelect(idx)}
                                className={`px-3 py-3 shadow-[0_0_9px_rgba(0,0,0,0.2)] rounded-xl flex flex-row justify-between ${selected ? " border-[#24B3CB] border-2" : ""} `}
                              >
                                <p
                                  className={` max-lg:text-sm ${selected ? "text-[#24B3CB]" : " text-my-text-color"}`}
                                >
                                  {opt.text}
                                </p>

                                <div className="my-auto">
                                  <FaRegCircle
                                    size="22"
                                    className={` rounded-full  ${
                                      selected
                                        ? "bg-[#24B3CB] text-[#24B3CB]"
                                        : "text-my-text-color"
                                    }`}
                                  />
                                </div>
                              </button>
                            );
                          }

                          // CASE 3: IMAGE ONLY
                          return (
                            <div
                              key={idx}
                              onClick={() => handleSelect(idx)}
                              className="relative max-w-[400px] w-[40%] max-md:w-full  aspect-[16/9] hover:cursor-pointer"
                            >
                              <Image
                                src={(opt.image ?? "").toString()}
                                alt="question image"
                                fill
                                className={`object-contain ${
                                  selected
                                    ? "border-4 border-[#6C6C6C] dark:border-white"
                                    : ""
                                }`}
                              />
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* next and previous button */}

            <div className="  flex flex-row px-4 justify-between ">
              <button
                onClick={handlePrev}
                disabled={current === 0}
                className="bg-[#047077] w-[45%] py-2 px-4 rounded-xl text-white flex justify-center items-center disabled:opacity-50"
              >
                <p className="text-center"> Prev </p>
              </button>

              <button
                onClick={handleNext}
                disabled={current === questions.length - 1}
                className="bg-[#047077] w-[45%] py-2 px-4 rounded-xl text-white flex justify-center items-center disabled:opacity-50"
              >
                <p className="text-center"> Next</p>
              </button>
            </div>

            {/* submmit button */}
            <div className=" py-4 px-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2  rounded-full bg-[#F89716] w-full text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
