import { Resend } from "resend"
import AppointmentNotification from "@/emails/AppointmentNotification"

// Resend's shared test sender. Works immediately with no domain setup, but Resend
// will only actually deliver mail sent from this address to the email you signed up
// to Resend with — not to arbitrary recipients. Switch to a verified custom domain
// in the Resend dashboard once one is available, and update this constant.
const EMAIL_FROM = "Jai Durga Eye Care & Opticals <onboarding@resend.dev>"

interface AppointmentAlertInput {
  customerName: string
  phone: string
  preferredDate: string
  slotTime: string
  reason?: string | null
}

export async function sendAppointmentAlert(appt: AppointmentAlertInput) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NOTIFY_EMAIL_TO
    ?.split(",")
    .map((email) => email.trim())
    .filter(Boolean)

  if (!apiKey || !to || to.length === 0) {
    console.warn("Email not configured — skipping appointment notification email")
    return
  }

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject: `New appointment: ${appt.customerName} — ${appt.preferredDate} ${appt.slotTime}`,
      react: AppointmentNotification(appt),
    })
  } catch (err) {
    console.error("Failed to send appointment notification email:", err)
  }
}
