import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const popups = await db.popup.findMany({
    orderBy: { type: "asc" },
  });

  return NextResponse.json(popups);
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    type,
    isActive,
    showAfter1,
    showAfter2,
    showAfter3,
  } = body;

  if (!type) {
    return NextResponse.json(
      { error: "type is required (A or B)" },
      { status: 400 }
    );
  }

 
 
  const updated = await db.popup.upsert({
    where: { type },
    update: {
      isActive,
      showAfter1,
      showAfter2,
      showAfter3,
    },
    create: {
      type,
      isActive: isActive ?? true,
      showAfter1: showAfter1 ?? 120,
      showAfter2: showAfter2 ?? 300,
      showAfter3: showAfter3 ?? 600,
    },
  });

  return NextResponse.json(updated);
}