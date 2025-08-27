import { NextResponse } from "next/server";
import db from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json(); // ✅ await here

    const quiz = await db.smallQuiz.create({
      data: body, //  should be "data", not "body"
    });
    

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Create quiz error:", error);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const quizIdParam = searchParams.get("quizId");
    const quesId = searchParams.get("quesId");

    if (quesId) {
      // Fetch one question by id
      const question = await db.smallQuiz.findUnique({
        where: { id: quesId },
      });

      if (!question) {
        return NextResponse.json({ error: "Question not found" }, { status: 404 });
      }

      return NextResponse.json(question);
    }


      // Fetch questions by all
      const questions = await db.smallQuiz.findMany({
  
        orderBy: { createdAt: "desc" },
      });
  

      return NextResponse.json(questions);
    
  } catch (error) {
    console.error("Fetch questions error:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const quesIdParam = searchParams.get("quesId");

    if (!quesIdParam) {
      return NextResponse.json({ error: "quesId is required" }, { status: 400 });
    }

    // Assuming your question ID is a string (like UUID)
    // If it's number, parseInt can be used here instead
    const quesId = quesIdParam;

    // Delete the question by id
    const res = await db.smallQuiz.delete({
      where: { id: quesId },
    });

    return NextResponse.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Delete question error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}


export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    // Expect quesId and other fields in body
    const { quesId, ...updateData } = body;

    if (!quesId) {
      return NextResponse.json({ error: "quesId is required for update" }, { status: 400 });
    }

    // Update question in DB
    const updatedQuestion = await db.smallQuiz.update({
      where: { id: quesId },
      data: updateData,
    });

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error("Update question error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
