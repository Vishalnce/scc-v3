

import Hero from "@/Components/ui/client/home/Hero";
import Reason from "@/Components/ui/client/home/Reason";
import Current from "@/Components/ui/client/home/Current";
import SmallQuiz from "@/Components/ui/client/home/SamllQuiz"
import React from "react";
import QuizCard from "@/Components/ui/client/home/QuizCard";

function Page() {
  return (
    <>
    <Hero />
    <Reason />
    <Current/>
    <SmallQuiz/>
    <QuizCard/>
    
    </>
  );
}

export default Page;
