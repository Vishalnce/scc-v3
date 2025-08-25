"use client"
import { useState } from 'react';
import React from 'react'
import AnnounceForm from './NoticeForm';
import AnnounceList from './NoticeList';

type Announce ={
  id:number;
  title: string;
  link :string;
}

function PostFormNotice({announce}:{ announce?: Announce | null }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    
    <>
    
    <AnnounceForm announce = {announce} onSuccess={handleRefresh}/>
    <AnnounceList key={refreshKey}/>

    </>
  )
}

export default PostFormNotice;