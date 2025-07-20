// app/current-affairs/client/page.tsx

import Filter from "@/Components/client/Filter";
import React from "react";


type Post = {
  id: number;
  title: string;
  slug: string;
  image: string;
  alt: string;
  topic: string;
  summary: string;
  keywords: string;
  description: string;
  editorHtml: string;
  toc: string;
};



async function fetchPosts(): Promise<Post[]> {
const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/en/current-affaris/client`, {
   cache: "no-store",
});


  if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json();
}

export default async function Page() {
  const posts = await fetchPosts();
  console.log("Fetched posts:", posts);
  return (
    <>
      {/* heading */}
      <header className="bg-[image:var(--color-my-gradient)]">
        <div className="flex flex-col justify-center items-center min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <h1 className="text-3xl font-bold max-sm:text-2xl">
            Current Affairs for <span className="text-my-green">SSC CGL</span> Success
          </h1>
          <p className="mt-1 text-sm text-my-text-color">
            Stay Ahead with Daily Updates Tailored for SSC CGL General Awareness!
          </p>
        </div>
      </header>

      {/* Body */}
      <div>
        <div className="flex flex-row justify-between items-center mx-auto w-[90%] mt-2">
          {/* left side filter */}
          <Filter />

          {/* right side */}
          <div className="max-md:hidden">
            <p className="bg-[image:var(--color-my-yellow-alert)] dark:text-black max-lg:text-sm px-4 py-2 rounded-4xl text-center">
              New Current Affairs Just Dropped!
            </p>
          </div>
        </div>

        {/* Posts section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[90%] mx-auto mt-4">
          {posts.map((post) => (
  <div
    key={post.id}
    className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2"
  >
    {/* Image */}
    {post.image && (
      <img
        src={post.image}
        alt={post.alt || post.title}
        className="w-full h-40 object-cover rounded mb-2"
      />
    )}

    {/* Title */}
    <h2 className="text-lg font-bold">{post.title}</h2>

    {/* Slug */}
    <p className="text-sm text-gray-500 italic">Slug: {post.slug}</p>

    {/* Topic */}
    <p className="text-sm text-my-green">Topic: {post.topic}</p>

    {/* Summary */}
    <p className="text-sm">Summary: {post.summary}</p>

    {/* Keywords */}
    <p className="text-sm">Keywords: {post.keywords}</p>

    {/* Description */}
    <p className="text-sm text-gray-600 dark:text-gray-300">
      {post.description}
    </p>

    {/* Editor HTML (rendered as HTML) */}
    <div
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: post.editorHtml }}
    />

    {/* TOC - if not empty */}
    {post.toc && post.toc !== "[]" && (
      <p className="text-sm text-blue-500">TOC: {post.toc}</p>
    )}
  </div>
))}

        </div>
      </div>
    </>
  );
}
