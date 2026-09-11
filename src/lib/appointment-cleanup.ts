import { prisma } from "./prisma"

const RETENTION_DAYS = 30

/**
 * Deletes appointments whose booked date is more than RETENTION_DAYS in the past.
 * Runs lazily whenever the admin dashboard is opened — there's no separate
 * scheduler/cron, so cleanup happens on the next admin visit rather than
 * exactly at the 30-day mark.
 */
export async function cleanupOldAppointments() {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - RETENTION_DAYS)
  const cutoffDateStr = cutoff.toISOString().slice(0, 10)

  await prisma.appointment.deleteMany({
    where: { preferredDate: { lt: cutoffDateStr } },
  })
}
