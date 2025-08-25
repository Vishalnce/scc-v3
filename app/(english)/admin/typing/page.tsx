import PostFormAnnouncement from "@/Components/admin/typing/PostFormTyping";

type Announce = {
  id: number;
  title: string;
  level: string;
};

export default async function Announcement({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  let announce: Announce | null = null;

  const res = (await searchParams).id;
  console.log("Received id:", res);
  if (res) {

    const respond = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/typing/admin?id=${res}`,
      {
        method: "GET",
      }
    );

    const data = await respond.json();

    if (data.success) {
      announce = data.post;
    }
  }

  return <PostFormAnnouncement announce={announce} />;
}
