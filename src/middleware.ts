import { NextRequest, NextResponse } from "next/server";
import { auth } from "../firbase.config";



// Middleware configuration
export const config = {
  matcher: [
    // '/dashboard/:path*',  // Matches /dashboard and any subpath
    '/signIn',  // Matches only /signin
    '/signup',  // Matches only /signup
    '/link',  // Matches only /signup
  ],
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  const isProtectedRoute = path.startsWith("/link");
  const isPublicRoute = ["/signIn", "/signup", "/"].includes(path);

  // Get the user from Firebase Auth (you can use cookies to check the user's auth state)
  const user = auth.currentUser;  // Check if the user is logged in
    // const {user } = useContext(AuthContext);
  

  // Redirect unauthenticated users on protected routes
  if (isProtectedRoute && !user) {
    console.log("Unauthenticated. Redirecting to /signIn");
    return NextResponse.redirect(new URL("/signIn", req.url));
  }

  // Redirect authenticated users accessing public routes
  if (isPublicRoute && user && path !== "/link") {
    console.log("Authenticated user accessing public route. Redirecting to /dashboard");
    return NextResponse.redirect(new URL("/link", req.url));
  }

  return NextResponse.next();
}
