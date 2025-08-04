import { NextResponse } from "next/server";
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
  createdAt: string;
};

async function fetchPost(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/concept-page/client/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const post: Post = await res.json();
  return post;
}

// genrate metadata for the page

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/concept-page/client/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return {
      description: "The post you are looking for does not exist.",
      keywords: ["not found", "404", "current affairs"],
    };
  }

  const post = await res.json();

  return {
    title: post.title || "Best SCC Website",
    description: post.description || "Best SCC Website",
    keywords: post.keywords || "current affairs,current news, news, updates",
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/concept-page/client/${slug}`,
      siteName: "SSC ExamLife Info",
      images: [
        {
          url: post.image,
          alt: post.alt || post.title,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      publishedTime: post.createdAt,
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/concept-page/client/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CurrentAffarisPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await fetchPost(slug);

  console.log("Post fetched:", post);

  return (
    <>
      <div>{post?.title}</div>;
      
      <div dangerouslySetInnerHTML={{ __html: post?.editorHtml || "" }} />

      <div>
  <h2>Table of Contents</h2>
  <ul>
    {post?.toc && JSON.parse(post.toc).map((item: any, index: number) => (
      <li key={index}>
        <a href={`#${item.id}`}>{item.text}</a>
      </li>
    ))}
  </ul>
</div>



      
    </>
  );
}
