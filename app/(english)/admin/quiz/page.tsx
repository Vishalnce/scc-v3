import PostFormQuiz from "@/Components/admin/quiz-editor/QuizForm";
import  db  from "@/lib/db";
import { notFound } from "next/navigation";

export default async function AdminEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
   let post = undefined
   const params =  (await searchParams).slug
  if (params) {
    post = await db.quiz.findUnique({
      where: { id: Number(params) },
    });

    if (!post) return notFound();
  }
  

  return <PostFormQuiz post={post} />;
}