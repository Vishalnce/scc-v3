import PostFormBlog from "@/Components/admin/PostFormBlog";
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
    post = await db.blog.findUnique({
      where: { slug: params },
    });

    if (!post) return notFound();
  }
  

  return <PostFormBlog post={post} />;
}