
import { isDatabaseUp } from "@/lib/health/dbhealth";

export async function GET() {
  const ok = await isDatabaseUp();
  return Response.json({ db: ok });
}
