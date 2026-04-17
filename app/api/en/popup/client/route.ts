import db from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET() {
  const popups = await db.popup.findMany({
    orderBy: { type: "asc" },
  });

  return NextResponse.json(popups);
}