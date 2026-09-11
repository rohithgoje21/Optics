import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface AppointmentNotificationProps {
  customerName: string
  phone: string
  preferredDate: string
  slotTime: string
  reason?: string | null
}

export default function AppointmentNotification({
  customerName,
  phone,
  preferredDate,
  slotTime,
  reason,
}: AppointmentNotificationProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const appointmentsUrl = `${siteUrl}/admin/appointments`

  return (
    <Html>
      <Head />
      <Preview>
        New appointment request from {customerName} — {preferredDate} {slotTime}
      </Preview>
      <Body style={{ fontFamily: "Arial, Helvetica, sans-serif", backgroundColor: "#f9f9f9" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "8px" }}>
          <Heading style={{ fontSize: "18px" }}>New Eye Checkup Appointment Request</Heading>
          <Section>
            <Text><strong>Name:</strong> {customerName}</Text>
            <Text><strong>Phone:</strong> {phone}</Text>
            <Text><strong>Date:</strong> {preferredDate}</Text>
            <Text><strong>Time:</strong> {slotTime}</Text>
            {reason ? <Text><strong>Reason / notes:</strong> {reason}</Text> : null}
          </Section>
          <Section style={{ textAlign: "center", margin: "24px 0" }}>
            <Button
              href={appointmentsUrl}
              style={{
                backgroundColor: "#14213d",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "999px",
                fontWeight: "bold",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              View in Admin Dashboard
            </Button>
          </Section>
          <Text style={{ fontSize: "12px", color: "#777" }}>
            Or open it directly:{" "}
            <a href={appointmentsUrl} style={{ color: "#14213d" }}>
              {appointmentsUrl}
            </a>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
