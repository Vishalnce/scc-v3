// app/api/en/current-affaris/client/route.ts

import { NextResponse  ,NextRequest} from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest,res:NextResponse) {

  const { searchParams } = new URL(req.url);

  const date = searchParams.get("date");
  const topic = searchParams.get("topic");

  console.log("🔍 Filters received:", { date, topic });

  try {
    const posts = await db.post.findMany({
      where: {
        ...(date && { date }),
        ...(topic && { topic }),
      },
    });


    return NextResponse.json(posts);
  } catch (error) {
    console.error(" Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
