import Link from "next/link";
import { CalendarCheck, Eye, MapPin, Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <section className="bg-brand-primary text-white">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:py-16">
          <h1 className="text-2xl font-extrabold sm:text-4xl">{settings.shopName}</h1>
          <p className="mt-4 text-base sm:text-lg">{settings.tagline}</p>
          {settings.taglineTelugu ? (
            <p className="mt-2 text-sm text-white/90 sm:text-base">{settings.taglineTelugu}</p>
          ) : null}
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/book-appointment"
              className="flex items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3 font-semibold text-brand-primary shadow hover:brightness-95"
            >
              <CalendarCheck className="h-5 w-5" /> Book an Eye Checkup
            </Link>
            <Link
              href="/gallery"
              className="flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 font-semibold hover:bg-white hover:text-brand-primary"
            >
              <Eye className="h-5 w-5" /> Browse Eyewear
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold text-brand-primary">Our Services</h2>
        <p className="mt-3 max-w-3xl text-gray-700">{settings.servicesText}</p>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-brand-primary">Visit Us</h3>
            <div className="mt-3 space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <MapPin className="h-5 w-5 shrink-0 text-brand-primary" /> {settings.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0 text-brand-primary" />
                <a href={`tel:+91${settings.phone}`} className="hover:underline">
                  {settings.phone}
                </a>
              </p>
              <p>{settings.hoursText}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-brand-primary">About</h3>
            <p className="mt-3 text-gray-700">{settings.aboutText}</p>
          </div>
        </div>
      </section>

      {settings.mapEmbedUrl ? (
        <section className="mx-auto max-w-5xl px-4 py-12">
          <iframe
            src={settings.mapEmbedUrl}
            className="h-72 w-full rounded-lg border"
            loading="lazy"
            title="Shop location map"
          />
        </section>
      ) : null}
    </div>
  );
}
