import Link from "next/link"
import { logoutAction } from "@/app/admin/(dashboard)/actions"

const LINKS = [
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/settings", label: "Site Settings" },
]

export function AdminNav() {
  return (
    <header className="bg-brand-primary text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <span className="font-bold">Admin — Jai Durga Eye Care</span>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-accent">
              {link.label}
            </Link>
          ))}
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-white/40 px-3 py-1.5 font-semibold hover:bg-white/10"
            >
              Log out
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}
