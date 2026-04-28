import { NextRequest, NextResponse } from "next/server";
import  db  from "@/lib/db";
import { requireAdmin } from "@/lib/adminCheck";

export async function GET() {
  const quizzes = await db.quiz.findMany();
  return NextResponse.json(quizzes);
}

export async function POST(req: Request) {
  try {
    await requireAdmin(); // consistent security

    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const result = await db.$transaction(async (tx) => {
      // 1. check existing
      const existingQuiz = await tx.quiz.findUnique({
        where: { title },
      });

      if (existingQuiz) {
        return { existing: true, quiz: existingQuiz };
      }

      // 2. create quiz
      const newQuiz = await tx.quiz.create({
        data: body,
      });

      // 3. create notification
      await tx.notification.create({
        data: {
          title: `New Quiz: ${newQuiz.title}`,
          path: `/quiz/${newQuiz.id}`,
          type: "QUIZ",
          entityId: newQuiz.id,
        },
      });

      return { existing: false, quiz: newQuiz };
    });

    if (result.existing) {
      return NextResponse.json(
        { message: "Quiz already exists", quiz: result.quiz },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Quiz created successfully", quiz: result.quiz },
      { status: 201 }
    );

  } catch (error) {
    console.error("Create quiz error:", error);
    return NextResponse.json(
      { message: "Create failed" },
      { status: 500 }
    );
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
  try {
    await requireAdmin(); // ✅ throw-based auth

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const result = await db.$transaction(async (tx) => {
      const quizId = Number(id);

      // 1. check quiz
      const quiz = await tx.quiz.findUnique({
        where: { id: quizId },
      });

      if (!quiz) {
        throw new Error("NOT_FOUND");
      }

      // 2. delete notifications
      await tx.notification.deleteMany({
        where: {
          type: "QUIZ",
          entityId: quizId,
        },
      });

      // 3. delete quiz
      return tx.quiz.delete({
        where: { id: quizId },
      });
    });

    return NextResponse.json({ success: true, quiz: result });

  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    console.error("Delete failed:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}