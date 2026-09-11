import { prisma } from "@/lib/prisma"

const FALLBACK_SETTINGS = {
  id: "main",
  shopName: "Jai Durga Eye Care & Opticals",
  tagline: "State-of-the-art computerized eye testing & all types of eyewear",
  taglineTelugu: null as string | null,
  phone: "7731033288",
  address: "1st Floor, above Goje Krishna & Sons Cloth Stores, Near Bus Stand, Ramareddy",
  latitude: 18.41128779757098 as number | null,
  longitude: 78.36919236799234 as number | null,
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236.5996694739228!2d78.36919236799234!3d18.41128779757098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcc4b95efe4ce59%3A0x59000e2b702c03f8!2sGoje%20Krishna%26Sons%20Cloth%20Stores!5e0!3m2!1sen!2sin!4v1789120838496!5m2!1sen!2sin" as string | null,
  hoursText: "Mon–Sat: 10:00 AM – 8:00 PM (Closed Sundays)",
  servicesText:
    "Computerized eye testing, vision check-ups, frame fitting, and all types of spectacles and sunglasses.",
  aboutText: "Jai Durga Eye Care & Opticals serves Ramareddy and the surrounding villages.",
  updatedAt: new Date(),
}

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } })
  return settings ?? FALLBACK_SETTINGS
}
