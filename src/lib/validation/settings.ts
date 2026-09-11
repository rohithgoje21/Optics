import { z } from "zod"

export const siteSettingsSchema = z.object({
  shopName: z.string().trim().min(2).max(120),
  tagline: z.string().trim().min(2).max(200),
  taglineTelugu: z.string().trim().max(200).optional().or(z.literal("")),
  phone: z.string().trim().min(6).max(20),
  address: z.string().trim().min(2).max(300),
  latitude: z.preprocess(
    (v) => (v === "" || v == null ? undefined : v),
    z.coerce.number().min(-90).max(90).optional()
  ),
  longitude: z.preprocess(
    (v) => (v === "" || v == null ? undefined : v),
    z.coerce.number().min(-180).max(180).optional()
  ),
  mapEmbedUrl: z.string().trim().url().optional().or(z.literal("")),
  hoursText: z.string().trim().min(2).max(300),
  servicesText: z.string().trim().min(2).max(2000),
  aboutText: z.string().trim().min(2).max(2000),
})

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>
