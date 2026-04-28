import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";
import { requireAdmin } from "@/lib/adminCheck";

// GET handler: Fetch all posts or a single post by `slug`
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (slug) {
      const post = await db.exam.findUnique({
        where: { slug },
      });

      if (!post) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, post });
    }

    const posts = await db.exam.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Edit handlere 
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const updated = await db.exam.update({
      where: { slug: body.slug },
      data: body,
    });

    return NextResponse.json({ success: true, post: updated });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}



// POST handler: Create a new post
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    console.log("🔍 Incoming body:", body);

    const {
      title,
      slug,
      summary,
      topic,
      image,
      alt,
      keywords,
      description,
      editorHtml,
      toc,
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const result = await db.$transaction(async (tx) => {
      // 1. create exam
      const post = await tx.exam.create({
        data: {
          title,
          slug,
          summary,
          topic,
          image,
          alt,
          keywords,
          description,
          editorHtml,
          toc,
        },
      });

      // 2. create notification
      await tx.notification.create({
        data: {
          title: `New Exam: ${title}`,
          path: `/exam/${slug}`,
          type: "EXAM",
          entityId: post.id,
        },
      });

      return post;
    });

    return NextResponse.json({ success: true, post: result });

  } catch (error: any) {
    console.error("POST error:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}




// delter a post by slug 

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin(); // ✅ auth

    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const result = await db.$transaction(async (tx) => {
      // 1. find exam
      const exam = await tx.exam.findUnique({
        where: { slug },
      });

      if (!exam) {
        throw new Error("NOT_FOUND");
      }

      // 2. delete notifications
      await tx.notification.deleteMany({
        where: {
          type: "EXAM",
          entityId: exam.id,
        },
      });

      // 3. delete exam
      return tx.exam.delete({
        where: { slug },
      });
    });

    return NextResponse.json({ success: true, post: result });

  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    console.error("DELETE error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}