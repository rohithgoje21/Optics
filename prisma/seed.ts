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
      address: "1st Floor, above Goje Krishna & Sons Cloth Stores, Near Bus Stand, Ramareddy",
      latitude: 18.41128779757098,
      longitude: 78.36919236799234,
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236.5996694739228!2d78.36919236799234!3d18.41128779757098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcc4b95efe4ce59%3A0x59000e2b702c03f8!2sGoje%20Krishna%26Sons%20Cloth%20Stores!5e0!3m2!1sen!2sin!4v1789120838496!5m2!1sen!2sin",
      hoursText: "Open all days: 10:00 AM – 8:00 PM",
      servicesText:
        "Computerized eye testing, vision check-ups, frame fitting, and all types of spectacles and sunglasses — consultation by Goje Akshay Kumar, B.Optom (ILVPEI-Hyd), Consultant Senior Optometrist, Regd. 140301012.",
      aboutText:
        "Jai Durga Eye Care & Opticals serves Ramareddy and the surrounding villages with modern computerized eye examinations and a wide range of eyeglasses and sunglasses for men, women, and kids.",
    },
  })

  const unsplash = (photoId: string) =>
    `https://images.unsplash.com/photo-${photoId}?fm=jpg&q=75&w=1200&auto=format&fit=crop`

  const galleryItems = [
    {
      caption: "Classic Black Aviators",
      category: "SUNGLASSES" as const,
      sortOrder: 1,
      imageUrl: unsplash("1572635196237-14b3f281503f"),
      showInCarousel: true,
    },
    {
      caption: "Gold-Rim Aviators",
      category: "SUNGLASSES" as const,
      sortOrder: 2,
      imageUrl: unsplash("1511499767150-a48a237f0083"),
      showInCarousel: true,
    },
    {
      caption: "Clubmaster-Style Frames",
      category: "EYEGLASSES" as const,
      sortOrder: 3,
      imageUrl: unsplash("1556306510-31ca015374b0"),
      showInCarousel: true,
    },
    {
      caption: "Full-Rim Metal Frames",
      category: "EYEGLASSES" as const,
      sortOrder: 4,
      imageUrl: unsplash("1614715838608-dd527c46231d"),
      showInCarousel: true,
    },
    {
      caption: "Blue-Light Computer Glasses",
      category: "COMPUTER_GLASSES" as const,
      sortOrder: 5,
      imageUrl: unsplash("1574258495973-f010dfbb5371"),
      showInCarousel: true,
    },
    {
      caption: "Kids' Flexible Frames",
      category: "KIDS_FRAMES" as const,
      sortOrder: 6,
      imageUrl: unsplash("1591076482161-42ce6da69f67"),
      showInCarousel: true,
    },
    {
      caption: "Gradient Sunglasses",
      category: "SUNGLASSES" as const,
      sortOrder: 7,
      imageUrl: unsplash("1577803645773-f96470509666"),
      showInCarousel: true,
    },
    {
      caption: "Cat-Eye Frames",
      category: "EYEGLASSES" as const,
      sortOrder: 8,
      imageUrl: unsplash("1534078477103-9f6a18b3a5e2"),
      showInCarousel: true,
    },
    {
      caption: "Wide Frame Selection In-Store",
      category: "EYEGLASSES" as const,
      sortOrder: 9,
      imageUrl: unsplash("1486250944723-86bca2b15b06"),
      showInCarousel: true,
    },
    {
      caption: "Digital Eye Testing in Progress",
      category: "EYE_CHECKUP" as const,
      sortOrder: 10,
      imageUrl: unsplash("1539036776273-021ec1d78bec"),
      showInCarousel: true,
    },
    {
      caption: "Precision Phoropter Equipment",
      category: "EYE_CHECKUP" as const,
      sortOrder: 11,
      imageUrl: unsplash("1677773382668-8a84321836e9"),
      showInCarousel: true,
    },
    {
      caption: "Comprehensive Eye Examination",
      category: "EYE_CHECKUP" as const,
      sortOrder: 12,
      imageUrl: unsplash("1770221797840-8f5a095ad7ae"),
      showInCarousel: true,
    },
  ]

  for (const item of galleryItems) {
    const existing = await prisma.galleryItem.findFirst({ where: { caption: item.caption } })
    if (!existing) {
      await prisma.galleryItem.create({ data: item })
    }
  }

  const faqEntries = [
    {
      sortOrder: 1,
      questionEn: "What happens during a computerized eye test?",
      questionTe: "కంప్యూటరైజ్డ్ కంటి పరీక్షలో ఏమి జరుగుతుంది?",
      answerEn:
        "We use a modern digital machine to check your eye power, followed by a detailed check-up by our optometrist. It is quick and painless.",
      answerTe:
        "మేము ఆధునిక డిజిటల్ యంత్రంతో మీ కంటి పవర్‌ను పరీక్షిస్తాము, తర్వాత మా ఆప్టోమెట్రిస్ట్ వివరంగా పరిశీలిస్తారు. ఇది వేగంగా మరియు నొప్పి లేకుండా జరుగుతుంది.",
    },
    {
      sortOrder: 2,
      questionEn: "Do I need to book an appointment, or can I walk in?",
      questionTe: "అపాయింట్‌మెంట్ బుక్ చేసుకోవాలా, లేదా నేరుగా రావచ్చా?",
      answerEn:
        "Walk-ins are always welcome. Booking online just helps us know you're coming and can reduce your waiting time, especially on busy days.",
      answerTe:
        "నేరుగా వచ్చినా పరవాలేదు, స్వాగతం. ఆన్‌లైన్‌లో బుక్ చేసుకుంటే మీరు వస్తున్నారని మాకు ముందుగా తెలుస్తుంది మరియు రద్దీగా ఉన్న రోజుల్లో మీ వేచి ఉండే సమయం తగ్గవచ్చు.",
    },
    {
      sortOrder: 3,
      questionEn: "How long does the eye test take?",
      questionTe: "కంటి పరీక్షకు ఎంత సమయం పడుతుంది?",
      answerEn:
        "The eye test usually takes about 15–20 minutes. Choosing frames and lenses may take a little longer.",
      answerTe:
        "సాధారణంగా కంటి పరీక్షకు 15–20 నిమిషాలు పడుతుంది. ఫ్రేమ్‌లు మరియు లెన్స్‌లు ఎంచుకోవడానికి కొంచెం ఎక్కువ సమయం పట్టవచ్చు.",
    },
    {
      sortOrder: 4,
      questionEn: "Do you check eyes for children too?",
      questionTe: "పిల్లలకు కూడా కంటి పరీక్షలు చేస్తారా?",
      answerEn: "Yes, we conduct eye tests for children of all ages, including school-going kids.",
      answerTe:
        "అవును, స్కూలుకు వెళ్ళే పిల్లలతో సహా అన్ని వయసుల పిల్లలకు మేము కంటి పరీక్షలు చేస్తాము.",
    },
    {
      sortOrder: 5,
      questionEn: "What if I need to cancel or reschedule my appointment?",
      questionTe: "నా అపాయింట్‌మెంట్ రద్దు చేసుకోవాలంటే లేదా మార్చుకోవాలంటే ఏం చేయాలి?",
      answerEn: "No problem — just call or WhatsApp us and we'll help you pick a new time.",
      answerTe:
        "పర్వాలేదు — మాకు కాల్ చేయండి లేదా వాట్సాప్ చేయండి, మేము మీకు కొత్త సమయం ఇవ్వడంలో సహాయం చేస్తాము.",
    },
    {
      sortOrder: 6,
      questionEn: "What payment methods do you accept?",
      questionTe: "మీరు ఏ చెల్లింపు విధానాలు అంగీకరిస్తారు?",
      answerEn: "We accept both cash and UPI (Google Pay, PhonePe, Paytm).",
      answerTe: "మేము నగదు మరియు UPI (గూగుల్ పే, ఫోన్‌పే, పేటీఎం) రెండింటినీ అంగీకరిస్తాము.",
    },
    {
      sortOrder: 7,
      questionEn: "What types of glasses do you have?",
      questionTe: "మీ వద్ద ఏ రకాల కళ్ళజోళ్ళు ఉన్నాయి?",
      answerEn:
        "We stock all types of eyewear — eyeglasses, sunglasses, computer glasses, and kids' frames — in many styles.",
      answerTe:
        "మా వద్ద అన్ని రకాల కళ్ళజోళ్ళు ఉన్నాయి — కళ్ళజోళ్ళు, సన్‌గ్లాసెస్, కంప్యూటర్ గ్లాసెస్, మరియు పిల్లల ఫ్రేమ్‌లు — అనేక డిజైన్లలో.",
    },
  ]

  for (const faq of faqEntries) {
    const existing = await prisma.faqEntry.findFirst({ where: { questionEn: faq.questionEn } })
    if (!existing) {
      await prisma.faqEntry.create({ data: faq })
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
