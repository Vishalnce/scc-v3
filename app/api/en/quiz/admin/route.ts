import { NextResponse } from "next/server";
import  db  from "@/lib/db";

export async function GET() {
  const quizzes = await db.quiz.findMany();
  return NextResponse.json(quizzes);
}

export async function POST(req: Request) {
  try {
    const body = await req.json(); // ✅ await here

    const quiz = await db.quiz.create({
      data: body, // ✅ should be "data", not "body"
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Create quiz error:", error);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  const quiz = await db.quiz.update({
    where: { id: body.id },
    data: body,
  });
  return NextResponse.json(quiz);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await db.quiz.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
