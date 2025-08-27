"use client"
import React, { useState } from 'react'
import QuestionForm from './SmallQuestionForm'
import QuestionList from './SmallQuestionList'


type QuestionWrapperProps = {
  id: number | null;
};



//  <QuestionWarpper id={editId ? Number(editId) : postId}   />
// {id}:QuestionWrapperProps

function QuestionWarpper(  ) {

  const [quesId,setQuesId] = useState<string | null >(null)

  console.log(quesId)


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
   <QuestionForm  onSuccess={handleRefresh} quesId={quesId} setQuesId={setQuesId} />
   <QuestionList  key={refreshKey} setQuesId ={setQuesId} />
   </>
  )
}

export default QuestionWarpper