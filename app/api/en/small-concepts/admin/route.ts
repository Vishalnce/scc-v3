import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    
    if (id) {
      const post = await db.smallConcepts.findUnique({
        where: { id: Number(id) },
      });

      if (!post) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, post });
    }
    const post = await db.smallConcepts.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!post) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const post = await db.smallConcepts.create({
      data: {
        id: 255,
        ...body,
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
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
    const id = body.id;

    const updated = await db.smallConcepts.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, post: updated });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing 'id' query param" },
        { status: 400 }
      );
    }

    const deletedContent = await db.smallConcepts.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { success: true, deletedContent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting liner content:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
