
import EditorialParentComponent from "@/Components/admin/editorial/EditorialParentComponent";

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
    post = await db.editorial.findUnique({
      where: { slug: params },
    });

    if (!post) return notFound();
      editPostId = post?.id || null;
  }
  

  return <EditorialParentComponent post={post} editPostId={editPostId} />;
}