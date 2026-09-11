export const WORKING_DAYS = [0, 1, 2, 3, 4, 5, 6] as const // open every day
export const OPEN_HOUR = 10 // 10 AM
export const CLOSE_HOUR = 20 // 8 PM
export const SLOT_MINUTES = 30

function isWorkingDay(dateStr: string): boolean {
  const day = new Date(`${dateStr}T00:00:00`).getDay()
  return (WORKING_DAYS as readonly number[]).includes(day)
}

function formatSlot(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  const displayMinute = minute.toString().padStart(2, "0")
  return `${displayHour}:${displayMinute} ${period}`
}

export function getAllSlotsForDate(dateStr: string): string[] {
  if (!isWorkingDay(dateStr)) return []

  const slots: string[] = []
  for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour++) {
    for (let minute = 0; minute < 60; minute += SLOT_MINUTES) {
      slots.push(formatSlot(hour, minute))
    }
  }
  return slots
}

export function isDateBookable(dateStr: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(`${dateStr}T00:00:00`)
  if (target < today) return false
  return isWorkingDay(dateStr)
}
