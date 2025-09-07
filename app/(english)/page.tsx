

import Hero from "@/Components/ui/client/home/Hero";
import Reason from "@/Components/ui/client/home/Reason";
import Current from "@/Components/ui/client/home/Current";
import SmallQuiz from "@/Components/ui/client/home/SamllQuiz"
import React from "react";
import QuizCard from "@/Components/ui/client/home/DiveQuiz";
import DataEntry from "@/Components/ui/client/home/DataEntry";
import OneLiner from "@/Components/ui/client/home/OneLiner";
import Concept from "@/Components/ui/client/home/Concept";
import MasterConcepts  from "@/Components/ui/client/home/MasterConcepts";
import AnnounceUpcoming from "@/Components/ui/client/home/AnnounceUpcoming";


function Page() {
  return (
    <>
    <Hero />
    <Reason />
    <Current/>
    <SmallQuiz/>
    <QuizCard/>
    <DataEntry/>
    <OneLiner/> 
    <Concept/> 
    <MasterConcepts/> 
    <AnnounceUpcoming/>
    <div className="h-[20vh] w-[20vh]">
      
    </div>
    
    </>
  );
}

export default Page;
