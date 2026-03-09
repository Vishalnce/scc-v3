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
      const post = await db.post.findUnique({
        where: { slug },
      });

      if (!post) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, post });
    }

    const posts = await db.post.findMany({
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

    const updated = await db.post.update({
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
    const session = await requireAdmin();

    if (session instanceof NextResponse) return session;
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
    } = body;

    const post = await db.post.create({
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

    // for notification panel

    const path = `current-affaris/${slug}`;

    const notiRes = await db.notification.create({
      data: {
        title,
        path,
        currentAffairId: post.id,
      },
    });

    console.log("✅ Post created:", post);
    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error(" POST error:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// delter a post by slug

export async function DELETE(req: NextRequest) {
  try {
    const session = await requireAdmin();
    if (session instanceof NextResponse) return session;

    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    // const notiRes = await db.notification.delete({
    //   where:{
    //     title:slug
    //   }
    // })

    const post = await db.post.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error("DELETE error:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
