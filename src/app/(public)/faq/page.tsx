import { prisma } from "@/lib/prisma";
import { FAQSection } from "@/components/FAQSection";

export const metadata = {
  title: "FAQs — Jai Durga Eye Care & Opticals",
};

export default async function FAQPage() {
  const entries = await prisma.faqEntry.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-brand-primary">Frequently Asked Questions</h1>
      <p className="mt-2 text-gray-600">Common questions, in English or Telugu.</p>
      <div className="mt-8">
        <FAQSection entries={entries} />
      </div>
    </div>
  );
}
