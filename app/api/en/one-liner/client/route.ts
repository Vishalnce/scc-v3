import { NextRequest, NextResponse } from "next/server";
import  db  from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const dateParam = searchParams.get("date");
    const limitParam = searchParams.get("limit") || "10";
    const pageParam = searchParams.get("page") || "1";

    const limit = parseInt(limitParam);
    const page = parseInt(pageParam);

    const skip = (page - 1) * limit;

    let where: any = {};

    // ✅ Date filter
    if (dateParam) {
      const [day, month, year] = dateParam.split("-").map(Number);

      const startOfDay = new Date(year, month - 1, day, 0, 0, 0);
      const endOfDay = new Date(year, month - 1, day, 23, 59, 59);

      where.createdAt = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    // ✅ Fetch data
    const contents = await db.liner.findMany({
      where,
      orderBy: { id: "desc" },
      skip,
      take: limit,
    });

    // ✅ Total count (important for pagination UI)
    const total = await db.liner.count({ where });

    return NextResponse.json(
      {
        contents,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching liner contents:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}