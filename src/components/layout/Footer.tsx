import Link from "next/link"
import { MapPin, Phone, Settings } from "lucide-react"
import { getGoogleMapsDirectionsUrl, type MapLocation } from "@/lib/maps"

export function Footer({
  shopName,
  phone,
  location,
  hoursText,
}: {
  shopName: string
  phone: string
  location: MapLocation
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
          <a
            href={getGoogleMapsDirectionsUrl(location)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-brand-accent"
          >
            <MapPin className="h-4 w-4" /> {location.address}
          </a>
          <span>{hoursText}</span>
        </div>
        <div className="mt-6 flex items-center justify-between text-xs text-white/60">
          <p>
            &copy; {new Date().getFullYear()} {shopName}.
          </p>
          <Link
            href="/admin/login"
            aria-label="Admin login"
            className="p-1 text-white/20 hover:text-white/50"
          >
            <Settings className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
