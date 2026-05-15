import { useState } from "react";
import { X, Stethoscope } from "lucide-react";

function AddDoctorModal({
  open,
  onClose,
  onAdd,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    department: "",
    experience: "",
    consultationFee: "",
    availability: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      ...formData,
      experience: Number(formData.experience),
      consultationFee: Number(formData.consultationFee),
      availability: formData.availability
        .split(",")
        .map((item) => item.trim()),
    });

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border-2 border-emerald-200/40 bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-white pb-4 border-b border-emerald-200/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Add Doctor
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
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Doctor Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter doctor name"
              onChange={handleChange}
              required
              className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
            />
          </div>

          {/* Email and Password */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                required
                className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
                className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Specialization and Department */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                placeholder="e.g., Cardiology"
                onChange={handleChange}
                required
                className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                placeholder="Enter department"
                onChange={handleChange}
                required
                className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Experience and Consultation Fee */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                name="experience"
                placeholder="Enter experience"
                onChange={handleChange}
                required
                className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Consultation Fee (₹)
              </label>
              <input
                type="number"
                name="consultationFee"
                placeholder="Enter fee"
                onChange={handleChange}
                required
                className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Availability (comma separated)
            </label>
            <input
              type="text"
              name="availability"
              placeholder="e.g., Monday,Tuesday,Wednesday"
              onChange={handleChange}
              required
              className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
            />
            <p className="text-xs text-gray-600 mt-2">
              Enter days separated by commas
            </p>
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
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDoctorModal;
