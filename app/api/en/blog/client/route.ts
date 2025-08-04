import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db"; // Your Prisma instance

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "3");
  const topic = searchParams.get("topic");
  const date = searchParams.get("date");

  const where: any = {};

  if (topic) where.topic = topic;
  if (date) {
    const targetDate = new Date(date);
    const nextDate = new Date(targetDate);
    nextDate.setDate(nextDate.getDate() + 1);

    where.createdAt = {
      gte: targetDate,
      lt: nextDate,
    };
  }

  const [posts, totalCount] = await Promise.all([
    db.blog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.post.count({ where }),
  ]);

  return NextResponse.json({ posts, totalCount });
}
