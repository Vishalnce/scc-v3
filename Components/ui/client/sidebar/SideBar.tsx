import React from "react";

type QuizPostItem = {
  id: number;
  quizId: number;
  postId: number;
  // Include other fields from PostQuiz if you have any
};
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
  timeLimit: number;
  createdAt: string;
  quizposts: QuizPostItem[];
};

type FetchResponse = {
  posts: Post[];
  page: number;
};

export default async function SideBar() {
  async function fetchOneLiner() {
    try {
      const res = await fetch(`/api/en/one-liner/client/?limit=5`, {
        cache: "no-store",
      });

      if (!res.ok) return [];

      const raw = await res.json();

      // return only the array inside "contents"
      return raw.contents;
    } catch (error) {
      console.log(`error while fetching ${error}`);
      return [];
    }
  }

  async function fetchCurrentAffairs(): Promise<FetchResponse> {
    try {
      const res = await fetch(`/api/en/current-affairs/client/?limit=5`, {
        cache: "no-store",
      });

      if (!res.ok) {
        return { posts: [], page: 1 }; // fallback
      }

      const raw = await res.json();

      return {
        posts: raw.posts ?? [],
        page: raw.page ?? null, // fallback to 1 if API doesn’t send page
      };
    } catch (error) {
      console.log(`error while fetching ${error}`);
      return { posts: [], page: 1 }; // fallback
    }
  }

  const { posts, page } = await fetchCurrentAffairs();

  // console.log("Page:", page);
  // console.log("Posts:", posts);

  const oneLiner = await fetchOneLiner();
  console.log("OneLiner:", oneLiner);

  return (
    <>
      <div className="border-2 bg-[#FAFCFC] rounded-2xl border-[#E6F1F1] px-4 dark:border-[#E6F1F1] dark:bg-[#313131] py-2 pb-4">
        <div className="">
          <p className="py-2 font-bold dark:text-white">
            Latest Current Affairs
          </p>
        </div>
        <ul className=" marker:text-black dark:marker:text-white space-y-1 text-my-text-color text-sm">
          {posts.map((post: any) => (
            <li key={post.id} className="py-1">
              {post.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-2 bg-[#FAFCFC] rounded-2xl border-[#E6F1F1] px-4 dark:border-[#E6F1F1] dark:bg-[#313131] py-2 pb-4">
        <div className="">
          <p className="py-2 font-bold dark:text-white">Latest One Liner</p>
        </div>
        <ul className=" marker:text-black space-y-1 dark:marker:text-white text-my-text-color text-sm">
          {oneLiner.map((post: any) => (
            <li key={post.id} className="py-1">
              {post.content}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
