"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Phone, X } from "lucide-react"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Eyewear Gallery" },
  { href: "/book-appointment", label: "Book Appointment" },
  { href: "/contact", label: "Contact" },
]

export function Navbar({ shopName, phone }: { shopName: string; phone: string }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-brand-primary text-white shadow-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight" onClick={() => setOpen(false)}>
          {shopName}
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium sm:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-accent">
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:+91${phone}`}
            className="flex items-center gap-1.5 rounded-full bg-brand-accent px-3 py-1.5 font-semibold text-brand-primary hover:brightness-95"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <a
            href={`tel:+91${phone}`}
            aria-label="Call the shop"
            className="flex items-center gap-1.5 rounded-full bg-brand-accent px-3 py-2 font-semibold text-brand-primary"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 hover:bg-white/10"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-4 pb-4 pt-2 text-sm font-medium sm:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded px-2 py-2.5 hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
