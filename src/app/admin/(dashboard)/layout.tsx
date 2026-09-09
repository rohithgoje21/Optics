import { requireAdminSession } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminDashboardLayout({ children }: LayoutProps<"/">) {
  await requireAdminSession();

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </>
  );
}
