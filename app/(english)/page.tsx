

import Hero from "@/Components/ui/client/home/Hero";

import Current from "@/Components/ui/client/home/Current";
import SmallQuiz from "@/Components/ui/client/home/SamllQuiz"
import React from "react";
import QuizCard from "@/Components/ui/client/home/DiveQuiz";
import DataEntry from "@/Components/ui/client/home/DataEntry";
import OneLiner from "@/Components/ui/client/home/OneLiner";
import Concept from "@/Components/ui/client/home/Concept";
import MasterConcepts  from "@/Components/ui/client/home/MasterConcepts";
import AnnounceUpcoming from "@/Components/ui/client/home/AnnounceUpcoming";
import Banner from "@/Components/ui/client/home/Banner";
import ProCard from "@/Components/ui/client/ProCard/ProCard";
import TestSeriesCard from "@/Components/ui/client/TestSeriesCard/TestSeriesCard";


function Page() {
  return (
    <>
    <Hero />
     <MasterConcepts/> 
   
    <Current/>
    <SmallQuiz/>
    <QuizCard/>
    <ProCard/>
    <TestSeriesCard/>
     <Concept/> 
    <DataEntry/>
    <OneLiner/> 

   
    <AnnounceUpcoming/>
    <Banner/>
    
    
    </>
  );
}

export default Page;
