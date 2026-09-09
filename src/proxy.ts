import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getIronSession, nextProxyCookies } from "iron-session"
import { sessionOptions, type AdminSessionData } from "@/lib/session"

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()
  const session = await getIronSession<AdminSessionData>(
    nextProxyCookies(request, response),
    sessionOptions
  )

  if (!session.isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return response
}

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
}
