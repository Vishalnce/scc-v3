import ParentComponent from "@/Components/admin/post-quiz/ParentComponent";
import PostForm from "@/Components/admin/post-quiz/PostForm";
import db from "@/lib/db";
import { notFound } from "next/navigation";

export default async function AdminEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  let post = undefined;
  let editPostId = null;
  const params = (await searchParams).slug;
  if (params) {
    post = await db.post.findUnique({
      where: { slug: params },
    });



    if (!post) return notFound();
  }
  editPostId = post?.id || null;
  // trhis is editor for post

  return <ParentComponent post={post} editPostId={editPostId} />;
}
