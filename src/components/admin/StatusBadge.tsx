import type { AppointmentStatus } from "@prisma/client"

const STYLES: Record<AppointmentStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  COMPLETED: "bg-gray-200 text-gray-700",
}

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STYLES[status]}`}>
      {status}
    </span>
  )
}
