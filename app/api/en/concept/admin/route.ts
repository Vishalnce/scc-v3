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
  const data = await req.json();
  console.log("Creating concept with data:", data);
  try {
    const concept = await db.concept.create({ data });
    return NextResponse.json(concept);
  } catch (error) {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  const { slug } = await req.json();

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    const deleted = await db.concept.delete({ where: { slug } });
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}