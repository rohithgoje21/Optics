import {
  Body,
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
          <Text style={{ fontSize: "12px", color: "#777" }}>
            View and manage this booking in the admin dashboard.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
