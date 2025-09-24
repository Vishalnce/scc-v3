import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import db from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise< { id: string }> }
) {
  const { id} = await params;

  console.log("id for post", id);
   
  const parseId = Number(id);

  if (isNaN(parseId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const post = await db.quiz.findUnique({
      where: {id: parseId  },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("❌ Error fetching post by slug:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
