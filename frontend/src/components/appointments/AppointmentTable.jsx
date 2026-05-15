import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";

function AppointmentTable({
  appointments,
  onStatusChange,
  onGenerateBill,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-200 text-emerald-800 border border-emerald-300";
      case "Cancelled":
        return "bg-red-100 text-red-700 border border-red-300";
      case "Scheduled":
        return "bg-emerald-100 text-emerald-700 border border-emerald-300";
      default:
        return "bg-amber-100 text-amber-700 border border-amber-300";
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-emerald-200/40 bg-white shadow-lg">
      <table className="min-w-full border-separate border-spacing-0">
        <thead className="bg-gradient-to-r from-emerald-50 to-emerald-100/50">
          <tr>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Patient
            </th>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Doctor
            </th>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Date
            </th>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Time
            </th>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Status
            </th>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-emerald-100/50">
          {appointments.length === 0 ? (
            <tr className="bg-white">
              <td className="p-8 text-center text-gray-500" colSpan={6}>
                <div className="flex flex-col items-center justify-center gap-2">
                  <Calendar className="w-8 h-8 text-gray-300" />
                  <p>No appointments found.</p>
                </div>
              </td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr
                key={appointment._id}
                className="bg-white hover:bg-emerald-50/50 transition-colors duration-200"
              >
                <td className="p-5 whitespace-nowrap text-gray-900 font-medium">
                  {appointment.patient?.name || "Patient Deleted"}
                </td>
                <td className="p-5 whitespace-nowrap text-gray-700">
                  {appointment.doctor?.name}
                </td>
                <td className="p-5 whitespace-nowrap text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </td>
                <td className="p-5 whitespace-nowrap text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  {appointment.appointmentTime}
                </td>
                <td className="p-5 whitespace-nowrap">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={appointment.status}
                      onChange={(e) =>
                        onStatusChange(
                          appointment._id,
                          e.target.value
                        )
                      }
                      className="bg-white border-2 border-emerald-200/40 px-3 py-2 rounded-lg text-gray-900 outline-none focus:border-emerald-500 transition text-sm"
                    >
                      <option>Scheduled</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                    <button
                      onClick={() =>
                        onGenerateBill(appointment)
                      }
                      className="btn-primary px-4 py-2 rounded-lg text-sm whitespace-nowrap"
                    >
                      Bill
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentTable;
