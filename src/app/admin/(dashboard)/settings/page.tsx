import { getSiteSettings } from "@/lib/site-settings";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-primary">Site Settings</h1>
      <p className="mt-1 text-gray-600">
        This text appears on the public website — home, contact, and footer.
      </p>
      <div className="mt-6">
        <SiteSettingsForm settings={settings} />
      </div>

      <hr className="my-10 border-gray-200" />

      <h2 className="text-xl font-bold text-brand-primary">Change Admin Password</h2>
      <p className="mt-1 text-gray-600">
        Update the password used to log into this admin dashboard.
      </p>
      <div className="mt-6">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
