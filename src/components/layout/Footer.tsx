import Link from "next/link"
import { MapPin, Phone } from "lucide-react"

export function Footer({
  shopName,
  phone,
  address,
  hoursText,
}: {
  shopName: string
  phone: string
  address: string
  hoursText: string
}) {
  return (
    <footer className="mt-auto bg-brand-primary/95 text-white">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm">
        <p className="text-base font-semibold">{shopName}</p>
        <div className="mt-3 flex flex-col gap-2 text-white/90 sm:flex-row sm:gap-8">
          <a href={`tel:+91${phone}`} className="flex items-center gap-2 hover:text-brand-accent">
            <Phone className="h-4 w-4" /> {phone}
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {address}
          </span>
          <span>{hoursText}</span>
        </div>
        <p className="mt-6 text-xs text-white/60">
          &copy; {new Date().getFullYear()} {shopName}.{" "}
          <Link href="/admin/login" className="hover:text-white/90">
            Admin
          </Link>
        </p>
      </div>
    </footer>
  )
}
