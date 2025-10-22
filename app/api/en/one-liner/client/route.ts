import { NextRequest, NextResponse } from "next/server";
import  db  from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    // ✅ Get date from query params
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date"); // expected format: dd-mm-yyyy
    const limit = searchParams.get("limit");
    let contents;

    if(limit){
        contents = await db.liner.findMany({
        orderBy: { id: "desc" },
        take: parseInt(limit),
      });

      return NextResponse.json({ contents }, { status: 200 });
    }

    if (dateParam) {
      // Parse dateParam ("dd-mm-yyyy") → actual Date range
      const [day, month, year] = dateParam.split("-").map(Number);

      // Convert to ISO range for that date (00:00 to 23:59)
      const startOfDay = new Date(year, month - 1, day, 0, 0, 0);
      const endOfDay = new Date(year, month - 1, day, 23, 59, 59);

      contents = await db.liner.findMany({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        orderBy: { id: "desc" },
      });
    } else {
      // Default: last 10 records
      contents = await db.liner.findMany({
        orderBy: { id: "desc" },
        take: 10,
      });
    }

    return NextResponse.json({ contents }, { status: 200 });
  } catch (error) {
    console.error("Error fetching liner contents:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
