import { NextResponse } from "next/server";
import db from "@/lib/db";
type BodyType = {
  name: string;
  email: string;
  content: string;
};
// Post by quizId blogId conceptId postId

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, quizId, score, maxMarks, timeTaken } = body;

    if (!quizId || !name) {
      return NextResponse.json(
        { error: "quizId and name are required" },
        { status: 400 }
      );
    }

    // ✅ Check if the rank already exists for this user & quiz
    const existingRank = await db.rank.findFirst({
      where: {
        quizId: Number(quizId),
        name: name,
      },
    });

    if (existingRank) {
      return NextResponse.json(
        { message: "Rank already exists for this user in this quiz" },
        { status: 409 } // Conflict
      );
    }

    // ✅ Create a new rank entry if not exists
    const newRank = await db.rank.create({
      data: {
        name,
        quizId: Number(quizId),
        score: Number(score),
        maxMarks: Number(maxMarks),
        timeTaken: Number(timeTaken),
      },
    });

    return NextResponse.json(newRank, { status: 201 });
  } catch (error) {
    console.error("Error creating rank:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const quizId = searchParams.get("quizId");

    if (!quizId) {
      return NextResponse.json({ error: "quizId is required" }, { status: 400 });
    }

    const allRank = await db.rank.findMany({
      where: { quizId: Number(quizId) },
      orderBy: { createdAt:"asc" }, // make sure Rank model has createdAt
    });

    return NextResponse.json(allRank, { status: 200 });
  } catch (error) {
    console.error("Error while fetching ranks:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}