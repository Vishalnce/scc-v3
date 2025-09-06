import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// Fetch all or get by date one-liner posts

export async function GET(req: NextRequest) {
    try {
    

    const contents = await db.liner.findMany({
      orderBy: { id: "desc" },
      take: 5, 
    });

    return NextResponse.json({ contents }, { status: 200 });
  } catch (error) {
    console.error("Error fetching liner contents:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
 
}