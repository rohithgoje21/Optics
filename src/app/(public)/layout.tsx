import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/site-settings";

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar shopName={settings.shopName} phone={settings.phone} />
      <main className="flex-1">{children}</main>
      <Footer
        shopName={settings.shopName}
        phone={settings.phone}
        address={settings.address}
        hoursText={settings.hoursText}
      />
    </>
  );
}
