import BlogParentComponent from "@/Components/admin/blog-quiz/BlogParentComponent";
import PostFormBlog from "@/Components/admin/PostFormBlog";
import  db  from "@/lib/db";
import { notFound } from "next/navigation";

export default async function AdminEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
   let post = undefined
   let editPostId = null;
   const params =  (await searchParams).slug
  if (params) {
    post = await db.blog.findUnique({
      where: { slug: params },
    });

    if (!post) return notFound();
      editPostId = post?.id || null;
  }
  

  return <BlogParentComponent post={post} editPostId={editPostId} />;
}