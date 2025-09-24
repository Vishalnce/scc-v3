import { NextRequest,NextResponse } from "next/server";
import db from "@/lib/db"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const quesIdParam = searchParams.get("quizId");


    if (quesIdParam) {

      
      
      const quizId = parseInt(quesIdParam, 10);

      if (isNaN(quizId)) {
        return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
      }

      // Fetch questions filtered by postId
      const questions = await db.question.findMany({
        where: { quizId},
        orderBy: { createdAt: "desc" },
      });
  

      return NextResponse.json(questions);
    }

    return NextResponse.json(
      { error: "Either postId or quesId query param is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Fetch questions error:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
