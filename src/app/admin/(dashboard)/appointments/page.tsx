import { prisma } from "@/lib/prisma";
import { AppointmentsTable } from "@/components/admin/AppointmentsTable";

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: [{ preferredDate: "desc" }, { slotTime: "asc" }],
  });

  const pendingCount = appointments.filter((a) => a.status === "PENDING").length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-primary">Appointments</h1>
      <p className="mt-1 text-gray-600">
        {pendingCount} pending request{pendingCount === 1 ? "" : "s"}.
      </p>
      <AppointmentsTable appointments={appointments} />
    </div>
  );
}
