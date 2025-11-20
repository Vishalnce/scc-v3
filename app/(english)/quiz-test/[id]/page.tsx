import React from "react";
import Image from "next/image";
import QuizWrapper from "@/Components/client/quiz-test/QuizWrapper";
import CommentWrapper from "@/Components/client/comment/CommentWrapper";

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
        { cache: "no-store" }
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
      <header className="bg-[image:var(--color-my-gradient)] ">
        <div className=" flex-col justify-center items-center  min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <p className="text-sm text-gray-600">
            <span className="hover:underline cursor-pointer text-[#007076]">
              Home
            </span>
            <span className="mx-1 text-[#007076]"> &gt; </span>
            <span className="hover:underline cursor-pointer text-[#007076]">
              Quiz
            </span>{" "}
          </p>

          <h1 className="text-3xl font-bold max-sm:text-2xl">
            <p className="text-center dark:text-white py-2"> {res?.title} </p>
          </h1>
        </div>
      </header>
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
