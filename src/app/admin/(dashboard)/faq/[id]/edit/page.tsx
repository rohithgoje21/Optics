import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FaqForm } from "@/components/admin/FaqForm";
import { updateFaqAction } from "@/app/admin/(dashboard)/faq/actions";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faq = await prisma.faqEntry.findUnique({ where: { id } });
  if (!faq) notFound();

  const action = updateFaqAction.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-primary">Edit FAQ</h1>
      <div className="mt-6">
        <FaqForm action={action} faq={faq} />
      </div>
    </div>
  );
}
