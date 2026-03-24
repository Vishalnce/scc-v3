import React from "react";
import Image from "next/image";
import QuizWrapper from "@/Components/client/quiz-test/QuizWrapper";
import CommentWrapper from "@/Components/client/comment/CommentWrapper";
import { GoDotFill } from "react-icons/go";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // only fetch by id
  async function fetchPost(id: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/quiz/client/${id}`,
        { cache: "no-store" },
      );

      if (!res.ok) return null;

      const post: any = await res.json();
      return post;
    } catch (error) {
      console.log(`erronwhile fetching ${error}`);
    }
  }

  const res = await fetchPost(id);

  return (
    <>
     

      <QuizWrapper
        quizId={Number(id)}
        timeLimit={res.timeLimit}
        topic={res.topic}
        subject={res.subject}
      />

      <CommentWrapper parentId={Number(id)} parentType="quizId" />
    </>
  );
}
