import { Trash2, User, Heart } from "lucide-react";

function PatientTable({
  patients,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-emerald-200/40 bg-white shadow-lg">
      <table className="min-w-full border-separate border-spacing-0">
        <thead className="bg-gradient-to-r from-emerald-50 to-emerald-100/50">
          <tr>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Patient ID
            </th>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Name
            </th>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Age
            </th>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Gender
            </th>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Disease
            </th>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-emerald-100/50">
          {patients.length === 0 ? (
            <tr className="bg-white">
              <td className="p-8 text-center text-gray-500" colSpan={6}>
                <div className="flex flex-col items-center justify-center gap-2">
                  <User className="w-8 h-8 text-gray-300" />
                  <p>No patients found.</p>
                </div>
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr
                key={patient._id}
                className="bg-white hover:bg-emerald-50/50 transition-colors duration-200"
              >
                <td className="p-5 whitespace-nowrap font-mono text-sm text-emerald-600 font-semibold">
                  {patient.patientId}
                </td>
                <td className="p-5 whitespace-nowrap text-gray-900 font-medium">
                  {patient.name}
                </td>
                <td className="p-5 whitespace-nowrap text-gray-700">
                  {patient.age} years
                </td>
                <td className="p-5 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">
                    {patient.gender}
                  </span>
                </td>
                <td className="p-5 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Heart className="w-4 h-4 text-red-500" />
                    {patient.disease}
                  </div>
                </td>
                <td className="p-5 whitespace-nowrap">
                  <button
                    onClick={() =>
                      onDelete(patient._id)
                    }
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 font-medium"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PatientTable;
