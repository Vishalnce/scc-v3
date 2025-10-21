// lib/health.ts
import db from "@/lib/db"

export async function isDatabaseUp() {
  try {
    await db.user.findFirst({ select: { id: true }, take: 1 });
    return true;
  } catch {
    return false;
  }
}
