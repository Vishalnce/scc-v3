"use client"

import React, { useState } from 'react'
import CommentForm from "./CommentForm"
import CommentList from "./CommentList"

type Props = {
  parentId:number | undefined
  parentType:"postId" | "conceptId" | "quizId" | "blogId" | "linerId";
}


export default function CommentWrapper({parentType,parentId}:Props) {


  
    const [refreshKey, setRefreshKey] = useState(0);
  
      const handleRefresh = () => {
      setRefreshKey((prev) => prev + 1);
    };


  return (

    <>
 
  <CommentForm parentType={parentType} parentId={parentId}  onSuccess={handleRefresh}/>
  <CommentList parentType={parentType} parentId={parentId} key={refreshKey} />
    


  
    </>

  )
}
