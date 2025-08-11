import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 3);
  const topic = searchParams.get("topic") || undefined;
  const category = searchParams.get("category") || undefined;
  const subject = searchParams.get("subject") || undefined;
  const date = searchParams.get("date") || undefined;

  // fetch single concept
  if (id) {
    const concept = await db.quiz.findUnique({  where: { id: Number(id) }, });
    if (!concept) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(concept);
  }

  const whereClause: any = {};
  if (topic) whereClause.topic = topic;
  if (category) whereClause.category = category;
  if (subject) whereClause.subject = subject;
  if (date) {
    // optional: filter by date
    const parsedDate = new Date(date);
    const nextDate = new Date(parsedDate);
    nextDate.setDate(parsedDate.getDate() + 1);
    whereClause.createdAt = {
      gte: parsedDate,
      lt: nextDate,
    };
  }

  const [quizs, totalCount] = await Promise.all([
    db.quiz.findMany({
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.quiz.count({ where: whereClause }),
  ]);

  return NextResponse.json({ posts: quizs, totalCount });
}
