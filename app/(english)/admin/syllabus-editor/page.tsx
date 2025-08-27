import PostFormSyllabus from "@/Components/admin/PostFormSyllabus";
import db from "@/lib/db";
import { notFound } from "next/navigation";

type PostType = {
  title: string;
  slug: string;
  topic: string;
  image: string;
  alt: string;
  summary: string;
  keywords: string;
  description: string;
  editorHtml: string;
  toc: string;
};

export default async function AdminEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  let post: PostType | undefined = undefined;

  const slug = (await searchParams).slug; // ✅ directly accessible
  if (slug) {
    const result = await db.syllabus.findUnique({
      where: { slug },
    });

     post = result ?? undefined; 
  }

  return <PostFormSyllabus post={post} />;
}
