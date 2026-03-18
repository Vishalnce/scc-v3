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

      // Toggle logic: if clicked again, deselect (set to null)
      copy[current] = {
        questionId: q.id,
        answer: currentAnswer === optionIndex ? null : optionIndex,
      };

      return copy;
    });

    setMark((prevMarks) =>
      prevMarks.map((m, index) => {
        if (index === current) {
          return {
            ...m,
            answered: !m.answered, // toggle answered
            noAnswered: m.answered, // opposite of answered
          };
        }
        return m;
      }),
    );
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
  return (
    <>
      <div className=" dark:bg-black ">
        <div className="w-[90%] py-10 max-sm:py-2 mx-auto flex flex-row max-sm:flex-col-reverse justify-between  ">
          {/* Left div of questiona and option  */}

          <div className="flex flex-col justify-start items-center  w-[65%] max-sm:w-full dark:bg-[#313131] border-2  bg-[#FAFCFC] border-[#E6F1F1] rounded-2xl max-sm:pb-4">
            {/* top heaeding */}
            <div className=" py-3 flex flex-row justify-around items-center gap-12 w-full max-sm:py-4 max-sm:mt-4">
              {/* timer and marks */}
              <div className="flex flex-row justify-between items-center  w-[42%] ">
                <div className="flex flex-row justify-between items-center -mt-14 max-sm:-mt-24 ">
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

                  <div></div>
                </div>

                <div className="">
                  <p className=" text-sm text-green-600 font-semibold">
                    {" "}
                    {q.marksPositive}{" "}
                    <span className="max-sm:hidden">Marks </span>
                  </p>
                </div>

                <div className="">
                  <p className="text-sm  text-red-600  font-semibold">
                    {" "}
                    {q.marksNegative}{" "}
                    <span className="max-sm:hidden"> Negative Marks </span>
                  </p>
                </div>
              </div>

              {/* level */}
              <div className="bg-[#E6F1F1] px-4 py-1 rounded-2xl ">
                <p className="text-sm  font-semibold"> Level {q.level}</p>
              </div>
            </div>

            <div className=" w-full flex flex-row justify-between items-stretch h-full">
              {/* question and options  */}

              <div className="flex flex-col justify-between items-start   flex-1  ">
                {/* question  */}

                <div
                  className={`w-full px-4    py-3 flex flex-row justify-between gap-2  max-sm:flex-col `}
                >
                  <p
                    className={`font-bold dark:text-white  ${q.questionImage ? " w-[55%] max-sm:w-full" : "null"} `}
                  >
                    {q.questionText}
                  </p>

                  {/* image have to fixed size */}
                  {q.questionImage ? (
                    <div className="relative  max-w-[400px] w-[40%] max-sm:w-full aspect-[16/9]  ">
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
                    className={`max-sm:py-2 max-sm:w-full   mx-auto gap-6 w-full  py-4 ${q.options[0]?.image ? "flex flex-wrap justify-between " : "grid grid-cols-2 max-sm:grid-cols-1"}`}
                  >
                    {q.options.map(
                      (opt: { text?: string; image?: string }, idx: number) => {
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
                              className="px-3 py-3 border dark:border-white rounded-full flex flex-row justify-between"
                            >
                              <p className="text-my-text-color max-lg:text-sm">
                                {opt.text}
                              </p>

                              <div className="my-auto">
                                <FaRegCircle
                                  size="22"
                                  className={`text-my-text-color rounded-full ${
                                    selected ? "bg-[#6C6C6C]" : ""
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
                            className="relative max-w-[400px] w-[40%] aspect-[16/9] hover:cursor-pointer"
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

          {/* right div of question and option */}

          <div
            className={`
    dark:border-white dark:bg-[#313131] rounded-2xl w-[32%] self-stretch flex flex-col
    max-sm:w-full px-2 py-2 border-2 bg-[#FAFCFC] border-[#E6F1F1]

    max-sm:fixed max-sm:left-0 max-sm:z-[999]
    max-sm:rounded-none max-sm:border-x-0 max-sm:border-b-0
    transition-all duration-300 ease-in-out

    ${
      isNavOpen
        ? "max-sm:bottom-[64px] max-sm:h-[55vh]"
        : "max-sm:bottom-[64px] max-sm:h-[80px]"
    }
  `}
          >
            {/* HEADER BAR (Always Visible) */}
            <div className="flex flex-row justify-between items-center pb-2 dark:text-white">
              <CountdownTimer
                minutes={timeLimit}
                onFinish={handleTimerFinish}
                setTimeTaken={setTimeTaken}
              />

              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-[#95DC7F] rounded-full text-sm dark:text-black capitalize">
                  {topic}
                </button>

                {/* Toggle Button */}
                <button
                  onClick={() => setIsNavOpen((p) => !p)}
                  className="p-2 rounded-full border border-gray-300 dark:border-white"
                >
                  {isNavOpen ? (
                    <MdKeyboardArrowDown className="size-6" />
                  ) : (
                    <MdKeyboardArrowUp className="size-6" />
                  )}
                </button>
              </div>
            </div>

            {/* BODY (only visible when open) */}
            <div
              className={`
      overflow-hidden transition-all duration-300 ease-in-out
      ${isNavOpen ? "opacity-100 max-sm:flex-1" : "opacity-0 max-sm:h-0"}
    `}
            >
              <div className="h-full overflow-y-auto">
                <div className="flex flex-row sm:flex-wrap overflow-x-auto sm:justify-center items-center gap-3">
                  {Array.from({ length: questions.length }, (_, idx) => {
                    const m = mark[idx];

                    return (
                      <div key={idx}>
                        <button
                          onClick={() => handleOnClick(idx)}
                          className={`px-4 py-2 min-w-[50px] border-1 border-[#C2C2C2] dark:text-white rounded
                ${
                  m.notVisited
                    ? ""
                    : m.answered
                      ? "bg-[#2CBB01] dark:border-[#2CBB01] text-white"
                      : "bg-[#FF0000] dark:border-[#FF0000] text-white"
                }
              `}
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
        </div>

        {/* navigation box  */}
        <div className="w-[90%] mx-auto flex flex-row  justify-between   max-sm:flex-col-reverse bg-[#FAFCFC] border-2 border-[#E6F1F1] rounded-2xl dark:bg-black ">
          {/* left box  */}

          <div className=" w-[65%] max-sm:w-full flex flex-row justify-between items-center px-2 py-2">
            <div className="flex flex-row items-center gap-2">
              <button className="px-4 py-2  min-w-[50px] rounded bg-[#2CBB01] text-white">
                {counts.answered}
              </button>
              <p className="max-sm:hidden dark:text-[#C2C2C2]">Answer</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <button className="px-4 py-2  min-w-[50px]  rounded bg-[#FF0000] text-white">
                {counts.notAnswered}
              </button>
              <p className="max-sm:hidden dark:text-[#C2C2C2]">Not Answer</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <button className="px-4 py-2  min-w-[50px] border-1  rounded bg-white dark:bg-black  dark:text-[#C2C2C2] border-[#C2C2C2]">
                {counts.notVisited}
              </button>
              <p className="max-sm:hidden dark:text-[#C2C2C2]">Not Visted</p>
            </div>
          </div>

          {/* rightbox  */}

          <div className=" w-[32%] max-sm:w-full flex flex-row justify-between items-center py-2 px-2">
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
    </>
  );
}
