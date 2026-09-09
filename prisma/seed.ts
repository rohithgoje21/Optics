import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg(process.env.DATABASE_URL as string)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      shopName: "Jai Durga Eye Care & Opticals",
      tagline: "State-of-the-art computerized eye testing & all types of eyewear",
      taglineTelugu:
        "అత్యాధునిక కంప్యూటర్‌తో కంటి పరీక్షలు చేసి, అన్ని రకాల కంటి అద్దాలు ఇవ్వబడును",
      phone: "7731033288",
      address: "Near Bus Stand, Ramareddy",
      mapEmbedUrl: null,
      hoursText: "Mon–Sat: 10:00 AM – 8:00 PM (Closed Sundays)",
      servicesText:
        "Computerized eye testing, vision check-ups, frame fitting, and all types of spectacles and sunglasses — consultation by Goje Akshay Kumar, B.Optom (ILVPEI-Hyd), Consultant Senior Optometrist, Regd. 140301012.",
      aboutText:
        "Jai Durga Eye Care & Opticals serves Ramareddy and the surrounding villages with modern computerized eye examinations and a wide range of eyeglasses and sunglasses for men, women, and kids.",
    },
  })

  const galleryItems = [
    { caption: "Classic Black Aviators", category: "SUNGLASSES" as const, sortOrder: 1 },
    { caption: "Gold-Rim Aviators", category: "SUNGLASSES" as const, sortOrder: 2 },
    { caption: "Clubmaster-Style Frames", category: "EYEGLASSES" as const, sortOrder: 3 },
    { caption: "Full-Rim Metal Frames", category: "EYEGLASSES" as const, sortOrder: 4 },
    { caption: "Blue-Light Computer Glasses", category: "COMPUTER_GLASSES" as const, sortOrder: 5 },
    { caption: "Kids' Flexible Frames", category: "KIDS_FRAMES" as const, sortOrder: 6 },
    { caption: "Gradient Sunglasses", category: "SUNGLASSES" as const, sortOrder: 7 },
    { caption: "Cat-Eye Frames", category: "EYEGLASSES" as const, sortOrder: 8 },
  ]

  for (const item of galleryItems) {
    const existing = await prisma.galleryItem.findFirst({ where: { caption: item.caption } })
    if (!existing) {
      await prisma.galleryItem.create({
        data: {
          ...item,
          imageUrl: `https://placehold.co/600x400.png?text=${encodeURIComponent(item.caption)}`,
        },
      })
    }
  }

  console.log("Seed complete.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
