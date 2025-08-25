import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {



    const post = await db.smallConcepts.findMany({
      where:{id:255},
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