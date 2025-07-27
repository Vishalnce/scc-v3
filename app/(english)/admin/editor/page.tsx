import PostForm from "@/Components/admin/PostForm";
import  db  from "@/lib/db";
import { notFound } from "next/navigation";

export default async function AdminEditorPage({
  searchParams,
}: {
  searchParams: { slug?: string };
}) {
   let post = undefined

  if (searchParams.slug) {
    post = await db.post.findUnique({
      where: { slug: searchParams.slug },
    });

    if (!post) return notFound();
  }
  

  return <PostForm post={post} />;
}