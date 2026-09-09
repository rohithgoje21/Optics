import { NextResponse, type NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAllSlotsForDate, isDateBookable } from "@/lib/business-hours"

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date")

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid or missing date" }, { status: 400 })
  }

  if (!isDateBookable(date)) {
    return NextResponse.json({ slots: [] })
  }

  const allSlots = getAllSlotsForDate(date)
  const booked = await prisma.appointment.findMany({
    where: { preferredDate: date, status: { not: "CANCELLED" } },
    select: { slotTime: true },
  })
  const bookedSet = new Set(booked.map((b) => b.slotTime))
  const available = allSlots.filter((slot) => !bookedSet.has(slot))

  return NextResponse.json({ slots: available })
}
