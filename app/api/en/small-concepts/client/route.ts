import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic");


    const post = await db.smallConcepts.findMany({
      where:{topic : topic || undefined},
      orderBy: {
        
        createdAt: "desc",
      }
    });
    if (!post) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.log(error);
  }
}