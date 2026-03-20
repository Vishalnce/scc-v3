import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const post = await db.smallConcepts.findUnique({
      where: { id: 255 },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const post = await db.smallConcepts.upsert({
      where: { id: 255 }, // ✅ fixed
      update: {
        content: body.content,
      },
      create: {
        id: 255, // ✅ MUST MATCH
        content: body.content,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
// edit handler

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const updated = await db.smallConcepts.update({
      where: { id: 255 },
      data: {
        title: body.title,
        content: body.content,
        topic: body.topic,
        toc: body.toc,
      },
    });

    return NextResponse.json({ success: true, post: updated });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
export async function DELETE() {
  try {
    const deletedContent = await db.smallConcepts.delete({
      where: { id: 255 },
    });

    return NextResponse.json(
      { success: true, deletedContent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}