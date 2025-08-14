import PostFormQuiz from "@/Components/admin/quiz-editor/QuizForm";
import  db  from "@/lib/db";
import { notFound } from "next/navigation";

export default async function AdminEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: number}>;
}) {
   let post = undefined
   const params =  (await searchParams).id
  if (params) {
    post = await db.quiz.findUnique({
      where: { id: Number(params) },
    });

    if (!post) return notFound();
  }
  

  return <PostFormQuiz post={post} editId = {params} />;
}