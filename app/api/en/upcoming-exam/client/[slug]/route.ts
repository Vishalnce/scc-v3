import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import db from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  console.log("Slug:", slug);

  try {
    const post = await db.exam.findUnique({
      where: { slug },
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
