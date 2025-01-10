import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/webLogin" || path === "/signup" || path === "/verifyemail";
  const token = request.cookies.get("token")?.value || "";
  const userStatus = request.cookies.get("UserStatus")?.value;

  // Redirect to profile if the user is already logged in and accessing a public path
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  // Redirect to login if trying to access protected paths without a token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/webLogin", request.nextUrl));
  }

  // Handle the specific case for the profile route
  if (path === "/profile" || path === "/news" || path ==="/blog"||path=="/events"||path=="/achievements") {
    if (userStatus !="true") {
      // Clear cookies if the userStatus is not verified and attempt to access profile
      const response = NextResponse.redirect(new URL("/errorpage", request.nextUrl));
      
      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });

      response.cookies.set("UserStatus", "", {
        httpOnly: true,
        expires: new Date(0),
      });

      return response;
    }
  }

  // Proceed to the next middleware or the page if all checks pass
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/signup", "/webLogin", "/verifyemail","/news","/blog","/events","/achievements"],
};
