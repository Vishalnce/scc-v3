import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const post = await db.syllabus.findFirst({
      orderBy: { createdAt: "desc" }, // deterministic
    });

    // Handle empty state
    if (!post) {
      return NextResponse.json(
        { message: "No syllabus found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { post },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("GET /syllabus error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}