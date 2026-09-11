import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteFaqButton } from "@/components/admin/DeleteFaqButton";

export default async function AdminFaqPage() {
  const faqs = await prisma.faqEntry.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-primary">FAQs</h1>
        <Link
          href="/admin/faq/new"
          className="rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-brand-primary hover:brightness-95"
        >
          Add FAQ
        </Link>
      </div>

      {faqs.length === 0 ? (
        <p className="mt-6 text-gray-500">No FAQs yet — add your first one.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-lg border bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-brand-primary">{faq.questionEn}</p>
                  <p lang="te" className="text-sm text-gray-500">
                    {faq.questionTe}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Link
                    href={`/admin/faq/${faq.id}/edit`}
                    className="text-sm font-medium text-brand-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteFaqButton id={faq.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
