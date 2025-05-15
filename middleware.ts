import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/" || path === "/signup"

  // Check if user is authenticated by looking for the auth cookie
  const isAuthenticated = request.cookies.has("whatsapp_auth")

  // If the path is public but user is authenticated, redirect to chats
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/chats", request.url))
  }

  // If the path is not public and user is not authenticated, redirect to login
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Otherwise, continue with the request
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
