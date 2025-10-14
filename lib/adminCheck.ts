// lib/adminCheck.ts
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function requireAdmin() {
  const session = await getServerSession(NEXT_AUTH);

  // If not authenticated or not admin, return 403
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Access forbidden: Admin only" }, { status: 403 });
  }

  return session;
}
