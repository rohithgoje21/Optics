function normalizePhone(phoneRaw: string): string {
  const digits = phoneRaw.replace(/\D/g, "")
  if (digits.length === 10) return `91${digits}`
  return digits
}

export function buildWhatsAppLink(phoneRaw: string, message?: string): string {
  const phone = normalizePhone(phoneRaw)
  return message ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : `https://wa.me/${phone}`
}
