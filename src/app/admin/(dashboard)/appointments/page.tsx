import { prisma } from "@/lib/prisma";
import { cleanupOldAppointments } from "@/lib/appointment-cleanup";
import { AppointmentsTable } from "@/components/admin/AppointmentsTable";

export default async function AdminAppointmentsPage() {
  await cleanupOldAppointments();

  const appointments = await prisma.appointment.findMany({
    orderBy: [{ preferredDate: "desc" }, { slotTime: "asc" }],
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-primary">Appointments</h1>
      <p className="mt-1 text-gray-600">
        {appointments.length} appointment{appointments.length === 1 ? "" : "s"} on file
        (older than 30 days are removed automatically).
      </p>
      <AppointmentsTable appointments={appointments} />
    </div>
  );
}
