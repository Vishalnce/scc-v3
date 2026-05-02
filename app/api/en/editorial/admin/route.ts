import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";
import { requireAdmin } from "@/lib/adminCheck";

// GET handler: Fetch all posts or a single post by `slug`
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (slug) {
      const post = await db.editorial.findUnique({
        where: { slug },
      });

      if (!post) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, post });
    }

    const posts = await db.editorial.findMany({
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

    const updated = await db.editorial.update({
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
      timetoread,
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const result = await db.$transaction(async (tx) => {
      // 1. create editorial
      const post = await tx.editorial.create({
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
          timetoread, 
          toc,
        },
      });

      // 2. create notification
      await tx.notification.create({
        data: {
          title: `New Editorial: ${title}`,
          path: `/editorial/${slug}`,
          type: "EDITORIAL",
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
    await requireAdmin();

    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const result = await db.$transaction(async (tx) => {
      // 1. find editorial
      const post = await tx.editorial.findUnique({
        where: { slug },
      });

      if (!post) {
        throw new Error("NOT_FOUND");
      }

      // 2. delete notifications
      await tx.notification.deleteMany({
        where: {
          type: "EDITORIAL",
          entityId: post.id,
        },
      });

      // 3. delete editorial
      return tx.editorial.delete({
        where: { slug },
      });
    });

    return NextResponse.json({ success: true, post: result });

  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return NextResponse.json({ error: "Editorial not found" }, { status: 404 });
    }

    console.error("DELETE error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}