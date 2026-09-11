"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { CalendarCheck, HelpCircle, Image as ImageIcon, LogOut, Menu, Settings, X } from "lucide-react"
import { logoutAction } from "@/app/admin/(dashboard)/actions"

const LINKS = [
  { href: "/admin/appointments", label: "Appointments", icon: CalendarCheck },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/faq", label: "FAQs", icon: HelpCircle },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile: same top-bar + inline dropdown pattern as the public site's Navbar */}
      <header className="bg-brand-primary text-white sm:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-bold">Admin — Jai Durga Eye Care</span>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-1.5 hover:bg-white/10"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open ? (
          <nav className="flex flex-col gap-1 border-t border-white/10 px-4 pb-4 pt-2 text-sm font-medium">
            {LINKS.map((link) => {
              const Icon = link.icon
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded px-2 py-2.5 ${
                    active ? "bg-white/15" : "hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" /> {link.label}
                </Link>
              )
            })}
            <form action={logoutAction}>
              <button
                type="submit"
                className="mt-1 flex w-full items-center gap-3 rounded px-2 py-2.5 hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 shrink-0" /> Log out
              </button>
            </form>
          </nav>
        ) : null}
      </header>

      {/* Desktop: persistent sidebar column */}
      <aside className="hidden w-64 shrink-0 flex-col bg-brand-primary text-white sm:flex">
        <div className="px-5 py-5 text-lg font-bold">Jai Durga Admin</div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {LINKS.map((link) => {
            const Icon = link.icon
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${
                  active ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" /> {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-white/10 px-3 py-4">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-white/30 px-3 py-2 text-sm font-semibold hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}
