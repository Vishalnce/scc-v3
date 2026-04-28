// lib/adminCheck.ts
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function requireAdmin() {
  const session = await getServerSession(NEXT_AUTH);

  if (!session || session.user?.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  return session;
}
