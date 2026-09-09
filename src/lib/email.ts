import { Resend } from "resend"
import AppointmentNotification from "@/emails/AppointmentNotification"

interface AppointmentAlertInput {
  customerName: string
  phone: string
  preferredDate: string
  slotTime: string
  reason?: string | null
}

export async function sendAppointmentAlert(appt: AppointmentAlertInput) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM
  const to = process.env.NOTIFY_EMAIL_TO

  if (!apiKey || !from || !to) {
    console.warn("Email not configured — skipping appointment notification email")
    return
  }

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from,
      to,
      subject: `New appointment: ${appt.customerName} — ${appt.preferredDate} ${appt.slotTime}`,
      react: AppointmentNotification(appt),
    })
  } catch (err) {
    console.error("Failed to send appointment notification email:", err)
  }
}
