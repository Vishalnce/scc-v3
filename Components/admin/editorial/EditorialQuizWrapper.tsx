"use client"
import React, { useState } from 'react'

import EditorialQuizList from './EditorialQuizList';
import EditorialQuizForm from './EditorialQuizForm';



type QuestionWrapperProps = {
  id: number | null;
};

function EditorialQuizWrapper( {id}:QuestionWrapperProps ) {

  const [quesId,setQuesId] = useState<string | null >(null)




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
   <EditorialQuizForm id ={id} onSuccess={handleRefresh} quesId={quesId} setQuesId={setQuesId} />
   <EditorialQuizList id ={id} key={refreshKey} setQuesId ={setQuesId} />
   </>
  )
}

export default EditorialQuizWrapper