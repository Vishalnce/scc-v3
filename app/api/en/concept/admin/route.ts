import { requireAdmin } from "@/lib/adminCheck";
import  db  from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


// get all or single concept
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  // GET single or all
  if (slug) {
    const concept = await db.concept.findUnique({ where: { slug } });
    if (!concept) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(concept);
  }

  const concepts = await db.concept.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(concepts);
}

// create concept

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(); // ✅ secure

    const data = await req.json();

    if (!data?.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const result = await db.$transaction(async (tx) => {
      // 1. create concept
      const concept = await tx.concept.create({
        data,
      });

      // 2. create notification
      await tx.notification.create({
        data: {
          title: `New Concept: ${concept.title}`,
          path: `/concept/${concept.id}`, // adjust if using slug
          type: "CONCEPT",
          entityId: concept.id,
        },
      });

      return concept;
    });

    return NextResponse.json(
      { success: true, concept: result },
      { status: 201 }
    );

  } catch (error) {
    console.error("Create concept error:", error);

    return NextResponse.json(
      { error: "Create failed" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const updated = await db.concept.update({
      where: { slug: body.slug },
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
    await requireAdmin(); // secure

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const result = await db.$transaction(async (tx) => {
      // 1. find concept
      const concept = await tx.concept.findUnique({
        where: { slug },
      });

      if (!concept) {
        throw new Error("NOT_FOUND");
      }

      // 2. delete notifications
      await tx.notification.deleteMany({
        where: {
          type: "CONCEPT",
          entityId: concept.id,
        },
      });

      // 3. delete concept
      return tx.concept.delete({
        where: { slug },
      });
    });

    return NextResponse.json({ success: true, concept: result });

  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return NextResponse.json({ error: "Concept not found" }, { status: 404 });
    }

    console.error("Delete failed:", error);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}