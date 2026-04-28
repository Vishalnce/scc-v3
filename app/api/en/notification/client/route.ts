import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const take = Number(searchParams.get("take") || 10);
    const skip = Number(searchParams.get("skip") || 0);

    const notifications = await db.notification.findMany({
      take,
      skip,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        path: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ notifications });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // 2 months ago date
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const result = await db.notification.deleteMany({
      where: {
        createdAt: {
          lt: twoMonthsAgo,
        },
      },
    });

    return NextResponse.json({
      success: true,
      deletedCount: result.count,
    });

  } catch (error) {
    console.error("DELETE notifications error:", error);

    return NextResponse.json(
      { error: "Failed to delete old notifications" },
      { status: 500 }
    );
  }
}