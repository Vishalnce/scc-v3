"use client"
import { useState } from 'react';
import React from 'react'
import SmallConceptForm from './SmallConceptsForm';
import SmallConceptList from './SmallConceptsList';

type Announce ={
  id:number;
  title: string;
  content: string;
  topic :string;
}

function PostFormNotice({announce}:{ announce?: Announce | null }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    
    <>
    
    <SmallConceptForm announce = {announce} onSuccess={handleRefresh}/>
    <SmallConceptList key={refreshKey}/>

    </>
  )
}

export default PostFormNotice;