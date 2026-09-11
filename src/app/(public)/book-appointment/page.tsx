import { Phone } from "lucide-react";
import { BookingForm } from "@/components/booking/BookingForm";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata = {
  title: "Book an Eye Checkup — Jai Durga Eye Care & Opticals",
};

export default async function BookAppointmentPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-bold text-brand-primary">Book an Eye Checkup</h1>
      <p className="mt-2 text-gray-600">
        Pick a date and time that works for you. We&apos;ll confirm your appointment when you
        arrive.
      </p>

      <a
        href={`tel:+91${settings.phone}`}
        className="mt-6 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 hover:bg-gray-100"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-accent text-brand-primary">
          <Phone className="h-4 w-4" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-brand-primary">
            Prefer to call instead?
          </span>
          <span className="block text-sm text-gray-600">
            Tap here to call us at {settings.phone}
          </span>
        </span>
      </a>

      <div className="mt-8">
        <BookingForm shopPhone={settings.phone} shopName={settings.shopName} />
      </div>
    </div>
  );
}
