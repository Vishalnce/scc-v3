import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET!;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //  Check if this is an admin-related path
  const isAdminPath =
    pathname.startsWith("/admin") || pathname.includes("/admin/");

  if (isAdminPath) {
    
    const token = await getToken({ req: request, secret });

    //  If not logged in or not an admin, redirect to home
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  //  Allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    
  ]
}
