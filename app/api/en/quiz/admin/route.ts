import { NextRequest, NextResponse } from "next/server";
import  db  from "@/lib/db";

export async function GET() {
  const quizzes = await db.quiz.findMany();
  return NextResponse.json(quizzes);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title } = body;

    // Check if quiz with same title exists
    const existingQuiz = await db.quiz.findUnique({
      where: { title },
    });

    if (existingQuiz) {
      return NextResponse.json(
        { message: "Quiz already exists", quiz: existingQuiz },
        { status: 200 }
      );
    }

    // Create a new quiz
    const newQuiz = await db.quiz.create({
      data: body,
    });

    return NextResponse.json(
      { message: "Quiz created successfully", quiz: newQuiz },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create quiz error:", error);
    return NextResponse.json({ message: "Create failed" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json({ message: "Quiz ID is required" }, { status: 400 });
    }

    const id = Number(idParam); // ✅ convert string to number

    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid quiz ID or For edit Go to the dashboard and click edit" }, { status: 400 });
    }

    const body = await req.json();

    const updatedQuiz = await db.quiz.update({
      where: { id }, // ✅ now it's a number
      data: body,
    });

    return NextResponse.json(
      { message: "Quiz updated successfully", quiz: updatedQuiz },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating quiz:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Failed to update quiz" }, { status: 500 });
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