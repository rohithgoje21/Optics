import { FaqForm } from "@/components/admin/FaqForm";
import { createFaqAction } from "@/app/admin/(dashboard)/faq/actions";

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-primary">Add FAQ</h1>
      <div className="mt-6">
        <FaqForm action={createFaqAction} />
      </div>
    </div>
  );
}
