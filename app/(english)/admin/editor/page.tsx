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
  // let post ={
  // id: 3,
  // title: 'awdawsd sdssd sdasda',
  // slug: 'awdawsd-sdssd-sdasda',
  // image: '',
  // alt: 'asdas',
  // topic: 'Indian Economy',
  // summary: 'asdasdasd asda',
  // keywords: 'asdas',
  // description: 'asdas zzzzzzzzzzzzzzzzzz',
  // editorHtml: '<p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">asdsadasdasdasdassszzzzzzzzzzz</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">;s s zzzzzzzzzzzz</span></p>',    
  // toc: '[]'
  // }

  return <PostForm post={post} />;
}
