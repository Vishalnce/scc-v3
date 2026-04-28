import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");

  const topic = searchParams.get("topic");
  const date = searchParams.get("date");


  const category = searchParams.get("category");
  const subject = searchParams.get("subject");

  const where: any = {};

  if (topic) where.topic = topic;


  if (category) where.category = category;
  if (subject) where.subject = subject;

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
    db.concept.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.concept.count({ where }),
  ]);

  return NextResponse.json({ posts, totalCount, page }, { status: 200 });
}