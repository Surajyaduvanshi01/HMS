import { IndianRupee, CheckCircle, Clock } from "lucide-react";

function BillTable({ bills }) {
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
              Consultation
            </th>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Medicine
            </th>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Total
            </th>
            <th className="text-left p-5 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Status
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-emerald-100/50">
          {bills.length === 0 ? (
            <tr className="bg-white">
              <td className="p-8 text-center text-gray-500" colSpan={6}>
                <div className="flex flex-col items-center justify-center gap-2">
                  <IndianRupee className="w-8 h-8 text-gray-300" />
                  <p>No bills available.</p>
                </div>
              </td>
            </tr>
          ) : (
            bills.map((bill) => (
              <tr
                key={bill._id}
                className="bg-white hover:bg-emerald-50/50 transition-colors duration-200"
              >
                <td className="p-5 whitespace-nowrap text-gray-900 font-medium">
                  {bill.appointment?.patient?.name || "Patient Deleted"}
                </td>
                <td className="p-5 whitespace-nowrap text-gray-700">
                  {bill.appointment?.doctor?.name}
                </td>
                <td className="p-5 whitespace-nowrap text-gray-700 font-medium">
                  ₹{bill.consultationFee?.toLocaleString()}
                </td>
                <td className="p-5 whitespace-nowrap text-gray-700 font-medium">
                  ₹{bill.medicineCharge?.toLocaleString()}
                </td>
                <td className="p-5 whitespace-nowrap">
                  <span className="text-lg font-bold text-emerald-600">
                    ₹{bill.totalAmount?.toLocaleString()}
                  </span>
                </td>
                <td className="p-5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {bill.paymentStatus === "Paid" ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700 border border-emerald-300">
                          {bill.paymentStatus}
                        </span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-amber-100 text-amber-700 border border-amber-300">
                          {bill.paymentStatus}
                        </span>
                      </>
                    )}
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

export default BillTable;
