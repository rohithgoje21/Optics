import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/site-settings";

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();
  const location = {
    address: settings.address,
    latitude: settings.latitude,
    longitude: settings.longitude,
  };

  return (
    <>
      <Navbar shopName={settings.shopName} phone={settings.phone} location={location} />
      <main className="flex-1">{children}</main>
      <Footer
        shopName={settings.shopName}
        phone={settings.phone}
        location={location}
        hoursText={settings.hoursText}
      />
    </>
  );
}
