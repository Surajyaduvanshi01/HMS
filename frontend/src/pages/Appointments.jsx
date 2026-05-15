import {
  useEffect,
  useState,
} from "react";

import { createBill } from "../api/billApi";

import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";

import AppointmentTable from "../components/appointments/AppointmentTable";

import BookAppointmentModal from "../components/appointments/BookAppointmentModal";

import {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
} from "../api/appointmentApi";

import { Plus } from "lucide-react";

function Appointments() {
  const [appointments,
    setAppointments] =
    useState([]);

  const [open, setOpen] =
    useState(false);
  const [billModalOpen, setBillModalOpen] =
    useState(false);
  const [selectedAppointment,
    setSelectedAppointment] =
    useState(null);
  const [medicineCharge,
    setMedicineCharge] =
    useState("");
  const [paymentStatus,
    setPaymentStatus] =
    useState("Pending");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments =
    async () => {
      try {
        const data =
          await getAppointments();

        setAppointments(data);
      } catch (error) {
        console.log(error);
      }
    };

  const handleBook =
    async (formData) => {
      try {
        await createAppointment(
          formData
        );

        toast.success("Appointment booked successfully");
        fetchAppointments();
      } catch (error) {
        console.log(error);
      }
    };

  const handleStatusChange =
    async (id, status) => {
      try {
        await updateAppointmentStatus(
          id,
          status
        );

        toast.success("Appointment status updated");
        fetchAppointments();
      } catch (error) {
        console.log(error);
      }
    };

  const handleGenerateBill =
    (appointment) => {
      setSelectedAppointment(appointment);
      setMedicineCharge("");
      setPaymentStatus("Pending");
      setBillModalOpen(true);
    };

  const handleBillSubmit =
    async (e) => {
      e.preventDefault();
      if (!selectedAppointment)
        return;

      try {
        const consultationFee =
          selectedAppointment.doctor?.consultationFee ??
          0;
        const medicineAmount =
          Number(medicineCharge) || 0;

        await createBill({
          appointment:
            selectedAppointment._id,
          consultationFee,
          medicineCharge:
            medicineAmount,
          paymentStatus,
        });

        toast.success(
          `Bill generated for ₹${(
            consultationFee +
            medicineAmount
          ).toLocaleString()}`
        );
        setBillModalOpen(false);
        setSelectedAppointment(null);
        setMedicineCharge("");
      } catch (error) {
        if (
          error.response?.data?.message ===
          "Bill already generated for this appointment"
        ) {
          toast.error(
            "Bill already exists for this appointment"
          );
        } else {
          console.log(error);
          toast.error("Failed to generate bill");
        }
      }
    };

  return (
    <MainLayout>

      <div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

          <h1 className="text-3xl font-bold">
            Appointments
          </h1>

          <button
            onClick={() => setOpen(true)}
            className="btn-primary px-5 py-3 rounded-xl"
          >

            <Plus size={18} />

            Book Appointment

          </button>

        </div>

        <AppointmentTable
          appointments={
            appointments
          }
          onStatusChange={
            handleStatusChange
          }
          onGenerateBill={
            handleGenerateBill
          }
        />

        <BookAppointmentModal
          open={open}
          onClose={() =>
            setOpen(false)
          }
          onBook={handleBook}
        />

        {billModalOpen && selectedAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl border border-emerald-200/40 bg-white p-8 shadow-2xl">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Generate Bill
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Consultation fee is pulled from the selected doctor.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setBillModalOpen(false);
                    setSelectedAppointment(null);
                    setMedicineCharge("");
                  }}
                  className="rounded-full bg-emerald-50 p-3 text-emerald-600 hover:bg-emerald-100 transition"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleBillSubmit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-200/40 bg-emerald-50/40 p-4">
                    <p className="text-xs uppercase font-semibold text-gray-500">Doctor</p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {selectedAppointment.doctor?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedAppointment.doctor?.specialization}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-200/40 bg-emerald-50/40 p-4">
                    <p className="text-xs uppercase font-semibold text-gray-500">Consultation Fee</p>
                    <p className="mt-2 text-2xl font-bold text-emerald-600">
                      ₹{(selectedAppointment.doctor?.consultationFee ?? 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Medicine Charge (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={medicineCharge}
                    onChange={(e) => setMedicineCharge(e.target.value)}
                    className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
                    placeholder="Enter medicine charge"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                <div className="rounded-2xl border border-emerald-200/40 bg-emerald-50/40 p-4">
                  <p className="text-sm text-gray-600">Estimated Total</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-700">
                    ₹{(
                      (selectedAppointment.doctor?.consultationFee ?? 0) +
                      (Number(medicineCharge) || 0)
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-emerald-200/40">
                  <button
                    type="button"
                    onClick={() => {
                      setBillModalOpen(false);
                      setSelectedAppointment(null);
                      setMedicineCharge("");
                    }}
                    className="rounded-xl border-2 border-gray-300 bg-white px-6 py-3 text-gray-700 font-semibold transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-6 py-3 rounded-xl"
                  >
                    Generate Bill
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>

    </MainLayout>
  );
}

export default Appointments;
