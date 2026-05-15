import { useEffect, useState } from "react";
import { X, Calendar } from "lucide-react";
import { getPatients } from "../../api/patientApi";
import { getDoctors } from "../../api/doctorApi";

function BookAppointmentModal({
  open,
  onClose,
  onBook,
}) {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const patientData = await getPatients();
    const doctorData = await getDoctors();

    setPatients(patientData.patients);
    setDoctors(doctorData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook(formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border-2 border-emerald-200/40 bg-white p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Book Appointment
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Patient and Doctor Selection */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Patient
              </label>
              <select
                name="patient"
                onChange={handleChange}
                required
                className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              >
                <option value="">Choose a patient...</option>
                {patients.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Doctor
              </label>
              <select
                name="doctor"
                onChange={handleChange}
                required
                className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              >
                <option value="">Choose a doctor...</option>
                {doctors.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name} ({d.specialization})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Appointment Date
              </label>
              <input
                type="date"
                name="appointmentDate"
                onChange={handleChange}
                required
                className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Appointment Time
              </label>
              <input
                type="time"
                name="appointmentTime"
                onChange={handleChange}
                required
                className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Reason for Visit
            </label>
            <textarea
              name="reason"
              placeholder="Describe the reason for appointment..."
              onChange={handleChange}
              rows="4"
              className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-end gap-3 pt-6 border-t border-emerald-200/40">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border-2 border-gray-300 bg-white px-6 py-3 text-gray-700 font-semibold transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary px-6 py-3 rounded-xl"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookAppointmentModal;
