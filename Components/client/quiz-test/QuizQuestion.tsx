"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import { FaRegCircle } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Quiz from "@/Components/ui/client/home/SamllQuiz";
import { CiClock1 } from "react-icons/ci";
import { set } from "date-fns";
import Image from "next/image";

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
    }))
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
      })
    );
  }, [current]);

  const answersRef = useRef(answers);
  answersRef.current = answers; // always have latest answers
  const startTimeRef = useRef<number>(Date.now());
  const q: quiz = questions[current];
  console.log("saiufdhidsu", q);
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
      })
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

  return (
    <>
      <div className=" dark:bg-black ">
        <div className="w-[95%] mx-auto flex flex-row max-sm:flex-col-reverse justify-between border-2  ">
          {/* Left div of questiona and option  */}

          <div className="flex flex-col justify-start items-center  w-[65%] max-sm:w-full  ">
            {/* top heaeding */}
            <div className=" border-2 flex flex-row justify-around items-center gap-12 w-full max-sm:py-4 max-sm:mt-4">
              {/* timer and marks */}
              <div className="flex flex-row justify-between items-center  w-[42%] ">
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

                  <div></div>
                </div>

                <div className="">
                  <p className=" text-sm text-green-600 font-semibold">
                    {" "}
                    {q.marksPositive} <span className="max-sm:hidden">Marks </span>
                  </p>
                </div>

                <div className="">
                  <p className="text-sm  text-red-600  font-semibold">
                    {" "}
                    {q.marksNegative} <span className="max-sm:hidden"> Negative Marks </span>
                  </p>
                </div>
              </div>

              {/* level */}
              <div className="bg-[#E6F1F1] px-4 py-1 rounded-2xl ">
                <p className="text-sm  font-semibold"> Level {q.level}</p>
              </div>
            </div>

            <div className="border-2 w-full flex flex-row justify-between items-stretch h-full">
              {/* question and options  */}

              <div className="flex flex-col justify-between items-start   flex-1  ">
                {/* question  */}

                <div className="w-full px-4  min-h-[40vh] py-3 flex flex-row justify-between gap-2 border-2 max-sm:flex-col ">
                  <p className={`font-bold dark:text-white border-2 ${q.questionImage? " w-[55%] max-sm:w-full" : "null" } `}>{q.questionText}</p>

                  {/* image have to fixed size */}
                  {q.questionImage ? (
                    <div className="relative  max-w-[400px] w-[40%] max-sm:w-full aspect-[16/9]  border-2 border-pink-500">
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

                <div className="flex flex-row justify-between items-stretch border-2 border-red-300 w-full px-4 ">
                  <div className={`max-sm:py-2 max-sm:w-full   mx-auto gap-6 w-full  py-4 ${q.options[0]?.image ? "flex flex-wrap justify-between " : "grid grid-cols-2"}`}>
                    {q.options.map(
                      (opt: { text: string; image: string }, idx: number) =>
                        opt.text ? (
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
                        ) : (
                          <div
                            className="relative  max-w-[400px] w-[40%] aspect-[16/9]  hover:cursor-pointer border-2 border-[#6C6C6C] "
                            key={idx}
                            onClick={() => handleSelect(idx)}
                          >
                            <Image
                              src={opt.image.toString()}
                              alt="question image"
                              fill
                              className={`object-contain ${
                                answers[current].answer === idx
                                  ? "border-4 border-[#6C6C6C] "
                                  : ""
                              }`}
                            />
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right div of question and option */}

          <div className="border-2 border-red-500 w-[32%] self-stretch flex flex-col  max-sm:w-full  ">
            {/* Timer and SubTopics */}
            <div className="border-2 flex flex-row  justify-between items-center pb-3 ">
              <CountdownTimer
                minutes={timeLimit}
                onFinish={handleTimerFinish}
                setTimeTaken={setTimeTaken}
              />

              <div className=" flex items-end ">
                <button className="px-4 py-2 bg-[#95DC7F]  rounded-full text-sm">
                  {topic}
                </button>
              </div>
            </div>

            {/* navigation  */}

            <div className=" h-full  overflow-y-auto  ">
              <div className="flex flex-row sm:flex-wrap overflow-x-auto sm:justify-center items-center gap-3 border-2 ">
                {Array.from({ length: questions.length }, (_, idx) => {
                  const m = mark[idx]; // status of this question

                  return (
                    <div key={idx}>
                      <button
                        onClick={() => handleOnClick(idx)}
                        className={`px-4 py-2 min-w-[50px] border border-[#6C6C6C] rounded
                          ${m.notVisited ? "" : m.answered ? "bg-[#2CBB01] text-white" : "bg-[#FF0000] text-white"}
                             // highlight current question
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

        {/* navigation box  */}
        <div className="w-[95%] mx-auto flex flex-row  justify-between  mt-4 border-2 max-sm:flex-col-reverse">
          {/* left box  */}

          <div className="border-2 w-[65%] max-sm:w-full flex flex-row justify-between items-center px-2 py-2">
            <div className="flex flex-row items-center gap-2">
              <button className="px-4 py-2  min-w-[50px] rounded bg-[#2CBB01] text-white">
                {counts.answered}
              </button>
              <p className="max-sm:hidden">Answer</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <button className="px-4 py-2  min-w-[50px]  rounded bg-[#FF0000] text-white">
                {counts.notAnswered}
              </button>
              <p className="max-sm:hidden">Not Answer</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <button className="px-4 py-2  min-w-[50px] border-1  rounded bg-white text-black">
                {counts.notVisited}
              </button>
              <p  className="max-sm:hidden">Not Visted</p>
            </div>
          </div>

          {/* rightbox  */}

          <div className="border-2 w-[32%] max-sm:w-full flex flex-row justify-between items-center py-2 px-2">
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

      {/*  <div className=" dark:bg-black pb-14 pt-20 ">
        <div className=" w-[90%] py-4 dark:bg-[#313131] bg-[#FAFCFC] rounded-2xl mx-auto px-6 ">
           question number and timer 
          <div className="flex flex-row justify-between items-center  w-[90%] mx-auto -mt-10">
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

          {/* question  and topics 

          <div className="flex flex-row justify-between items-start min-h-[20vh]   mt-6 ">
            <div className="w-[60%] ">
              <p className="font-bold dark:text-white">{q.questionText}</p>
            </div>

            <div className=" flex items-end ">
              <button className="px-4 py-2 bg-[#FFE332]  rounded-full text-sm">
                {topic}
              </button>
            </div>
          </div>

          {/* question and buttons 
          <div className="flex flex-row justify-between items-stretch  border-red-300">
         

            <div className="max-sm:py-2 max-sm:w-full grid grid-cols-2 gap-6 w-[60%] ">
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

            {/* right box  
            <div className=" w-[30%] flex flex-col justify-end">
              <div className="flex flex-row justify-between gap-2">
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
      </div>  */}
    </>
  );
}
