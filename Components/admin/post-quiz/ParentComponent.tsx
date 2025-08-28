"use client";
import { useEffect, useState } from 'react'
import React from 'react'
import PostForm from './PostForm'
import QuestionWarpper from './PostQuestionWarpper';

type PostType = {
  title: string;
  slug: string;
  topic: string;
  image: string;
  alt: string;
  summary: string;
  keywords: string;
  description: string;
  editorHtml: string;
  toc: string;
};


function ParentComponent({
  post,
 editPostId
}: {
  post?: PostType;
 editPostId?: number | null;
}) {

  const [postId, setPostId] = useState<number | null>(null);

  useEffect(() => {
  if (postId !== null) {
    console.log("Parent got new postId:", postId);
  }
}, [postId]);

  return (


  <>
  <PostForm  post={post} setPostId={setPostId} />

  <QuestionWarpper id={postId ?? editPostId ?? null} />

  </>
  )
}

// editId ? Number(editId) : postId

export default ParentComponent