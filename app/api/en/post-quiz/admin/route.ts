import { NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAdmin } from "@/lib/adminCheck";

/**
 * CREATE QUESTION
 */
export async function POST(req: Request) {
  try {

    await requireAdmin();
    const body = await req.json();

    const {
      postId,
      questionText,
      options,
      solutionText,
      correctOption,
      marksPositive,
      marksNegative,
      level,
    } = body;

    if (!postId) {
      return NextResponse.json(
        { error: "postId is required" },
        { status: 400 }
      );
    }

    const quiz = await db.postQuiz.create({
      data: {
        questionText,
        options,
        solutionText,
        correctOption,
        marksPositive,
        marksNegative,
        level,

        post: {
          connect: {
            id: Number(postId),
          },
        },
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Create quiz error:", error);

    return NextResponse.json(
      { error: "Create failed" },
      { status: 500 }
    );
  }
}

/**
 * GET QUESTIONS
 */
export async function GET(req: Request) {

  await requireAdmin();
  try {
    const { searchParams } = new URL(req.url);

    const postIdParam = searchParams.get("postId");
    const quesId = searchParams.get("quesId");

    // GET SINGLE QUESTION
    if (quesId) {
      const question = await db.postQuiz.findUnique({
        where: {
          id: quesId,
        },
      });

      if (!question) {
        return NextResponse.json(
          { error: "Question not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(question);
    }

    // GET ALL QUESTIONS
    if (postIdParam) {
      const postId = Number(postIdParam);

      if (isNaN(postId)) {
        return NextResponse.json(
          { error: "Invalid postId" },
          { status: 400 }
        );
      }

      const questions = await db.postQuiz.findMany({
        where: {
          postId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json(questions);
    }

    return NextResponse.json(
      { error: "Provide postId or quesId" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Fetch questions error:", error);

    return NextResponse.json(
      { error: "Fetch failed" },
      { status: 500 }
    );
  }
}

/**
 * DELETE QUESTION
 */
export async function DELETE(req: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);

    const quesId = searchParams.get("quesId");

    if (!quesId) {
      return NextResponse.json(
        { error: "quesId is required" },
        { status: 400 }
      );
    }

    await db.postQuiz.delete({
      where: {
        id: quesId,
      },
    });

    return NextResponse.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}

/**
 * UPDATE QUESTION
 */
export async function PATCH(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();

    const {
      quesId,
      postId,
      questionText,
      options,
      solutionText,
      correctOption,
      marksPositive,
      marksNegative,
      level,
    } = body;

    if (!quesId) {
      return NextResponse.json(
        { error: "quesId is required" },
        { status: 400 }
      );
    }

    const updatedQuestion = await db.postQuiz.update({
      where: {
        id: quesId,
      },
      data: {
        questionText,
        options,
        solutionText,
        correctOption,
        marksPositive,
        marksNegative,
        level,

        ...(postId && {
          post: {
            connect: {
              id: Number(postId),
            },
          },
        }),
      },
    });

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error("Update question error:", error);

    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}