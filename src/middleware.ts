import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/link", "/dashboard", "/Welcome", "/profile"];
const publicRoutes    = ["/signIn", "/signup", "/"];

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const path        = nextUrl.pathname;

  const sessionCookie =
    req.cookies.get("authjs.session-token") ??
    req.cookies.get("__Secure-authjs.session-token"); 

  const isLoggedIn  = !!sessionCookie;
  const isProtected = protectedRoutes.some((r) => path.startsWith(r));
  const isPublic    = publicRoutes.includes(path);

  if (isProtected && !isLoggedIn) {
    const url = new URL("/signIn", nextUrl);
    url.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(url);
  }

  if (isPublic && isLoggedIn && path !== "/") {
    return NextResponse.redirect(new URL("/welcome", nextUrl));
  }

  return NextResponse.next();
}