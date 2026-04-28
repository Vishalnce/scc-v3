import { NextResponse } from "next/server";
import db from "@/lib/db";

/**
 * CREATE QUESTION
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      blogId,
      questionText,
      options,
      solutionText,
      correctOption,
    } = body;

    if (!blogId) {
      return NextResponse.json({ error: "blogId is required" }, { status: 400 });
    }

    const quiz = await db.blogQuiz.create({
      data: {
        questionText,
        options,
        solutionText,
        correctOption,

        // ✅ FIX: relation handling
        blog: {
          connect: { id: blogId },
        },
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Create quiz error:", error);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

/**
 * GET QUESTIONS
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const blogIdParam = searchParams.get("blogId");
    const quesId = searchParams.get("quesId");

    // 👉 Get single question
    if (quesId) {
      const question = await db.blogQuiz.findUnique({
        where: { id: quesId },
      });

      if (!question) {
        return NextResponse.json({ error: "Question not found" }, { status: 404 });
      }

      return NextResponse.json(question);
    }

    // 👉 Get all questions for a blog
    if (blogIdParam) {
      const blogId = parseInt(blogIdParam, 10);

      if (isNaN(blogId)) {
        return NextResponse.json({ error: "Invalid blogId" }, { status: 400 });
      }

      const questions = await db.blogQuiz.findMany({
        where: { blogId },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(questions);
    }

    return NextResponse.json(
      { error: "Provide blogId or quesId" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Fetch questions error:", error);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

/**
 * DELETE QUESTION
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const quesId = searchParams.get("quesId");

    if (!quesId) {
      return NextResponse.json({ error: "quesId is required" }, { status: 400 });
    }

    await db.blogQuiz.delete({
      where: { id: quesId },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

/**
 * UPDATE QUESTION
 */
export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const {
      quesId,
      blogId,
      questionText,
      options,
      solutionText,
      correctOption,
    } = body;

    if (!quesId) {
      return NextResponse.json({ error: "quesId is required" }, { status: 400 });
    }

    const updatedQuestion = await db.blogQuiz.update({
      where: { id: quesId },
      data: {
        questionText,
        options,
        solutionText,
        correctOption,

        //FIX: relation update
        ...(blogId && {
          blog: {
            connect: { id: blogId },
          },
        }),
      },
    });

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error("Update question error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}