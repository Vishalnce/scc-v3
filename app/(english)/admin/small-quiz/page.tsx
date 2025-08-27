import SmallQuestionWarpper from "@/Components/admin/small-quiz/SmallQuestionWarpper";
import  db  from "@/lib/db";
import { notFound } from "next/navigation";

export default async function AdminEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: number}>;
}) {
  //  let post = undefined
  //  const params =  (await searchParams).id
  // if (params) {
  //   post = await db.smallQuiz.findUnique({
  //     where: { id: params },
  //   });

  //   if (!post) return notFound();
  // }
  

  return <SmallQuestionWarpper   />;
}
