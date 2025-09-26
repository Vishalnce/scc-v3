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
  

  return (
    <div className="max-w-[1400px] mx-auto dark:bg-black border-2 py-14">
      {/* Header card */}
      <MarksCard  questions= {questions} answers = {answers} timeTaken={timeTaken} timeLimit={timeTaken} onRestart= {onRestart}/>

      {/* Explanation section */}

      <Explanation questions= {questions} answers = {answers} topic ={topic}/>
     

      {/* Performance by Level */}
        <LevelWise questions= {questions} answers = {answers}/>
    </div>
  );
}
