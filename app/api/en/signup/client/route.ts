import db from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"


export  async function POST(req:NextRequest) {

   try {
    const body = await req.json(); // ✅ await here

   await db.user.create({
      data: body, // ✅ should be "data", not "body"
    });

   return NextResponse.json({ success: true, message: "Signup successful" },{status:200});

  } catch (error) {
    console.error("Create quiz error:", error);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
  
}