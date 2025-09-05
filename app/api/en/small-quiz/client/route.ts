import { NextResponse } from "next/server";
import db from "@/lib/db"


export async function GET(req: Request) {
  try {
 

  
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