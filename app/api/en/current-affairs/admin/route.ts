import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

import { requireAdmin } from "@/lib/adminCheck";

// GET handler: Fetch all posts or a single post by `slug`
export async function GET(req: NextRequest) {
  try {
    const session = await requireAdmin();
    if (session instanceof NextResponse) return session;

    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (slug) {
      const post = await db.currentAffairs.findUnique({
        where: { slug },
      });

      if (!post) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, post });
    }

    const posts = await db.currentAffairs.findMany({
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
    const session = await requireAdmin();
    if (session instanceof NextResponse) return session;

    const body = await req.json();

    const { id, ...data } = body;

    const updated = await db.currentAffairs.update({
      where: { id },
      data,
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
    const session = await requireAdmin();

    const body = await req.json();

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
      timeToRead,
    } = body;

    const result = await db.$transaction(async (tx) => {
      // 1. Create current affair
      const post = await tx.currentAffairs.create({
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
          timeToRead,
          toc,
        },
      });

      // 2. Create notification
      const path = `/current-affairs/${slug}`; // ✅ fixed typo

      await tx.notification.create({
        data: {
          title: `New Current Affair: ${title}`, // optional but better UX
          path,
          type: "CURRENT_AFFAIR",
          entityId: post.id,
        },
      });

      return post;
    });

    return NextResponse.json({ success: true, post: result });

  } catch (error: any) {
    console.error("POST error:", error.message || error);

    // Optional: handle unique slug error
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// delter a post by slug

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin(); //

    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const result = await db.$transaction(async (tx) => {
      // 1. find post
      const post = await tx.currentAffairs.findUnique({
        where: { slug },
      });

      if (!post) {
        throw new Error("Not found");
      }

      // 2. delete notifications
      await tx.notification.deleteMany({
        where: {
          type: "CURRENT_AFFAIR",
          entityId: post.id,
        },
      });

      // 3. delete post
      return tx.currentAffairs.delete({
        where: { slug },
      });
    });

    return NextResponse.json({ success: true, post: result });

  } catch (error: any) {
    if (error.message === "Not found") {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    console.error("DELETE error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
