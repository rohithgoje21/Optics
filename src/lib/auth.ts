import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { getAdminSession } from "./session"
import { prisma } from "./prisma"

export async function getCurrentPasswordHash(): Promise<string | undefined> {
  const record = await prisma.adminCredentials.findUnique({ where: { id: "main" } })
  return record?.passwordHash ?? process.env.ADMIN_PASSWORD_HASH
}

export async function verifyAdminCredentials(username: string, password: string) {
  if (username !== process.env.ADMIN_USERNAME) return false
  const hash = await getCurrentPasswordHash()
  if (!hash) return false
  return bcrypt.compare(password, hash)
}

export async function setAdminPassword(newPassword: string) {
  const passwordHash = await bcrypt.hash(newPassword, 10)
  await prisma.adminCredentials.upsert({
    where: { id: "main" },
    update: { passwordHash },
    create: { id: "main", passwordHash },
  })
}

export async function requireAdminSession() {
  const session = await getAdminSession()
  if (!session.isAdmin) {
    redirect("/admin/login")
  }
  return session
}
