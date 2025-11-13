import PostFormConcepts from "@/Components/admin/PostFormConcepts";
import db from "@/lib/db";
import { notFound } from "next/navigation";

export default async function AdminEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  let post = undefined;
  const params = (await searchParams).slug;
  if (params) {
    post = await db.concept.findUnique({
      where: { slug: params },
    });

    if (!post) return notFound();
  }



  return <PostFormConcepts post={post} />;
}
