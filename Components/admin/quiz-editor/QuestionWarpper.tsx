"use client"
import React, { useState } from 'react'
import QuestionForm from './QuestionForm'
import QuestionList from './QuestionList'


type QuestionWrapperProps = {
  id: number | null;
};

function QuestionWarpper( {id}:QuestionWrapperProps ) {

  const [quesId,setQuesId] = useState<string | null >(null)

  console.log(quesId)


  const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };


  return (
   <>
   <QuestionForm id ={id} onSuccess={handleRefresh} quesId={quesId} setQuesId={setQuesId} />
   <QuestionList id ={id} key={refreshKey} setQuesId ={setQuesId} />
   </>
  )
}

export default QuestionWarpper