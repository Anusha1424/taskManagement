import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: any) {
    // there are some public paths and there are some protected paths
    // the public path should not be visible when the user has the token
    // the private path should not be visible when the user doesn't have the token
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/" || path === "/login" || path === "/sign-up";
    const token: string = request.cookies.get("token")?.value || ""; // check if the token exists
    if (isPublicPath && token.length > 0) {
        // redirect them to their profile page
        return NextResponse.redirect(new URL("/tasks", request.nextUrl));
    }
    if (!isPublicPath && !(token.length > 0)) {
        // redirect them to the login page
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/tasks", "/login", "/sign-up"],
};
