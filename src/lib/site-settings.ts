import { prisma } from "@/lib/prisma"

const FALLBACK_SETTINGS = {
  id: "main",
  shopName: "Jai Durga Eye Care & Opticals",
  tagline: "State-of-the-art computerized eye testing & all types of eyewear",
  taglineTelugu: null as string | null,
  phone: "7731033288",
  address: "Near Bus Stand, Ramareddy",
  mapEmbedUrl: null as string | null,
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
