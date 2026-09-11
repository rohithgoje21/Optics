import { MapPin, Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";
import { getGoogleMapsDirectionsUrl, getGoogleMapsEmbedUrl } from "@/lib/maps";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-brand-primary">Contact Us</h1>
      <div className="mt-6 space-y-4 text-gray-700">
        <p className="flex items-center gap-3 text-lg">
          <Phone className="h-5 w-5 shrink-0 text-brand-primary" />
          <a href={`tel:+91${settings.phone}`} className="hover:underline">
            {settings.phone}
          </a>
        </p>
        <p className="flex items-center gap-3 text-lg">
          <MapPin className="h-5 w-5 shrink-0 text-brand-primary" />
          <a
            href={getGoogleMapsDirectionsUrl(settings)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {settings.address}
          </a>
        </p>
        <p>{settings.hoursText}</p>
      </div>

      <div className="mt-8 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-semibold text-brand-primary">About</h2>
        <p className="mt-2 text-gray-700">{settings.aboutText}</p>
      </div>

      <iframe
        src={settings.mapEmbedUrl || getGoogleMapsEmbedUrl(settings)}
        className="mt-8 h-72 w-full rounded-lg border"
        loading="lazy"
        title="Shop location map"
      />
    </div>
  );
}
