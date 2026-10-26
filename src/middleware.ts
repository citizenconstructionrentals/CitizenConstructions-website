import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    request.nextUrl.hostname ||
    "";
  const proto = request.headers.get("x-forwarded-proto");
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  // Single-hop redirect if accessing via www or http
  const isWww = host.startsWith("www.citizenconstructions.com") || host.startsWith("www.");
  const isHttp = proto === "http";

  if (isWww || (isHttp && host.includes("citizenconstructions.com"))) {
    const destination = `https://citizenconstructions.com${pathname}${search}`;
    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
