import { cookies } from "next/headers"
import { getIronSession, type SessionOptions } from "iron-session"

export interface AdminSessionData {
  isAdmin: boolean
  username: string
}

export const SESSION_COOKIE_NAME = "optics_admin_session"

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: SESSION_COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  },
}

export async function getAdminSession() {
  return getIronSession<AdminSessionData>(await cookies(), sessionOptions)
}
