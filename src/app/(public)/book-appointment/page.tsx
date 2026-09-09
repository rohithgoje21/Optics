import { BookingForm } from "@/components/booking/BookingForm";

export const metadata = {
  title: "Book an Eye Checkup — Jai Durga Eye Care & Opticals",
};

export default function BookAppointmentPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-bold text-brand-primary">Book an Eye Checkup</h1>
      <p className="mt-2 text-gray-600">
        Pick a date and time that works for you. We&apos;ll confirm your appointment when you
        arrive.
      </p>
      <div className="mt-8">
        <BookingForm />
      </div>
    </div>
  );
}
