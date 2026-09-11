"use client"

import type { Appointment } from "@prisma/client"
import { MessageCircle } from "lucide-react"
import { deleteAppointmentAction } from "@/app/admin/(dashboard)/appointments/actions"
import { buildWhatsAppLink } from "@/lib/whatsapp"

function DeleteButton({ id }: { id: string }) {
  return (
    <form
      action={deleteAppointmentAction}
      onSubmit={(e) => {
        if (!confirm("Delete this appointment permanently?")) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-800 hover:bg-red-200"
      >
        Delete
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
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={buildWhatsAppLink(appt.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Message on WhatsApp"
                    className="flex items-center gap-1 rounded bg-[#25D366]/10 px-2.5 py-1 text-xs font-semibold text-[#128C3E] hover:bg-[#25D366]/20"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                  <DeleteButton id={appt.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
