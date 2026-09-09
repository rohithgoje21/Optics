import type { Appointment } from "@prisma/client"
import { StatusBadge } from "./StatusBadge"
import { updateAppointmentStatusAction } from "@/app/admin/(dashboard)/appointments/actions"

function StatusButton({
  id,
  status,
  label,
  className,
}: {
  id: string
  status: string
  label: string
  className: string
}) {
  return (
    <form action={updateAppointmentStatusAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button type="submit" className={`rounded px-2.5 py-1 text-xs font-semibold ${className}`}>
        {label}
      </button>
    </form>
  )
}

export function AppointmentsTable({ appointments }: { appointments: Appointment[] }) {
  if (appointments.length === 0) {
    return <p className="mt-6 text-gray-500">No appointments yet.</p>
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-lg border bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3">Date / Time</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Reason</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {appointments.map((appt) => (
            <tr key={appt.id}>
              <td className="whitespace-nowrap px-4 py-3">
                {appt.preferredDate} <br /> {appt.slotTime}
              </td>
              <td className="px-4 py-3">{appt.customerName}</td>
              <td className="px-4 py-3">
                <a href={`tel:+91${appt.phone}`} className="hover:underline">
                  {appt.phone}
                </a>
              </td>
              <td className="max-w-xs px-4 py-3 text-gray-600">{appt.reason || "—"}</td>
              <td className="px-4 py-3">
                <StatusBadge status={appt.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {appt.status !== "CONFIRMED" && (
                    <StatusButton
                      id={appt.id}
                      status="CONFIRMED"
                      label="Confirm"
                      className="bg-green-100 text-green-800 hover:bg-green-200"
                    />
                  )}
                  {appt.status !== "COMPLETED" && (
                    <StatusButton
                      id={appt.id}
                      status="COMPLETED"
                      label="Complete"
                      className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                    />
                  )}
                  {appt.status !== "CANCELLED" && (
                    <StatusButton
                      id={appt.id}
                      status="CANCELLED"
                      label="Cancel"
                      className="bg-red-100 text-red-800 hover:bg-red-200"
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
