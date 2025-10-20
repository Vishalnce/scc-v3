"use client";
import Image from "next/image";
import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import LevelWise from "./LevelWise";
import MarksCard from "./MarksCard";
import Explanation from "./Explanation";
import RankCard from "./RankCard";
export default function QuizResult({
  questions,
  quizId,
  answers,
  topic,
  timeTaken,
  timeLimit,
  onRestart,
}: {
  questions: any[];
  quizId:number;
  timeTaken: number;
  timeLimit: number;
  topic: string;
  answers: { questionId: string; answer: number | null }[];
  onRestart: () => void;
}) {
  
  console.log(timeLimit)
  return (
    <div className="max-w-[1400px] mx-auto dark:bg-black  py-14">
      {/* Header card */}
      <MarksCard  questions= {questions} answers = {answers} timeTaken={timeTaken} timeLimit={timeLimit} onRestart= {onRestart} quizId= {quizId} />

      {/* Explanation section */}

      <Explanation questions= {questions} answers = {answers} topic ={topic}/>
     

      {/* Performance by Level */}
      <LevelWise questions= {questions} answers = {answers}/>
        
      <RankCard quizId={quizId} />

    </div>
  );
}
