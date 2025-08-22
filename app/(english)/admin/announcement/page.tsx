
import PostFormAnnouncement from "@/Components/admin/announcement/PostFormAnnouncement";
import db from "@/lib/db";

export default async function Announcement({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {

  let announce = null;

  const res = (await searchParams).id;
  

  if (res) {
    announce = await db.announcement.findUnique({
      where: { id:Number(res) },
    });
  }


  return <PostFormAnnouncement announce={announce} />;
}
