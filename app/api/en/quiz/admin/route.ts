import { NextRequest, NextResponse } from "next/server";
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

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const body = await req.json();

    const updatedQuiz = await db.quiz.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        summary: body.summary,
        keywords: body.keywords,
        description: body.description,
        category: body.category,
        subject: body.subject,
        topic: body.topic,
        timeLimit: body.timeLimit,
      },
    });

    return NextResponse.json(updatedQuiz);
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const deleted = await db.quiz.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}