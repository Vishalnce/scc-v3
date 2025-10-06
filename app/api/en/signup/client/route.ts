import db from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const existingUser = await db.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 } // Conflict status code
      );
    }

    await db.user.create({
      data: body,
    });

    return NextResponse.json(
      { success: true, message: "Signup successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Create quiz error:", error);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}
