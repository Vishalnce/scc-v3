"use client"
import React, { useState } from 'react'
import BlogQuizForm from './EditorialQuizForm';
import BlogQuizList from './EditorialQuizList';



type QuestionWrapperProps = {
  id: number | null;
};

function QuestionWarpper( {id}:QuestionWrapperProps ) {

  const [quesId,setQuesId] = useState<string | null >(null)

  console.log(`questionwrapper id is ${id}`)


  const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // id is quiz id 
  // On sucess it will refersh Question List 
  // QuesID is for editing question 
  // SetQuestId to set null
  // second SetQuestId to set for id //

  return (
   <>
   <BlogQuizForm id ={id} onSuccess={handleRefresh} quesId={quesId} setQuesId={setQuesId} />
   <BlogQuizList id ={id} key={refreshKey} setQuesId ={setQuesId} />
   </>
  )
}

export default QuestionWarpper