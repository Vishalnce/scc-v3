import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// Fetch all or get by date one-liner posts

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const dateStr = url.searchParams.get("date");

    if (dateStr) {
      const start = new Date(dateStr);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const contents = await db.liner.findMany({
        where: {
          createdAt: {
            gte: start,
            lt: end,
          },
        },
        orderBy: { id: "desc" },
      });

      return NextResponse.json({ contents }, { status: 200 });
    }

    const contents = await db.liner.findMany({
      orderBy: { id: "desc" },
    });

      return NextResponse.json({ contents }, { status: 200 });

  } catch (error) {
    console.error("Error fetching one-liner contents:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
