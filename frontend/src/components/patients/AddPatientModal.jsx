import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { X, User } from "lucide-react";

const initialFormData = {
  name: "",
  age: "",
  gender: "Male",
  phone: "",
  address: "",
  disease: "",
};

function AddPatientModal({
  open,
  onClose,
  onAdd,
}) {
  const [formData, setFormData] = useState(initialFormData);

  const isValidPhone = (value) =>
    /^[0-9]{10}$/.test(value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const normalizedValue =
      name === "phone"
        ? value.replace(/\D/g, "").slice(0, 10)
        : value;

    setFormData({
      ...formData,
      [name]: normalizedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter the patient name.");
      return;
    }

    const ageValue = Number(formData.age);
    if (!formData.age || ageValue <= 0 || ageValue > 120) {
      toast.error("Please enter a valid age between 1 and 120.");
      return;
    }

    if (!isValidPhone(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!formData.address.trim()) {
      toast.error("Please enter the patient address.");
      return;
    }

    onAdd(formData);
    setFormData(initialFormData);
    onClose();
  };

  useEffect(() => {
    if (!open) {
      setFormData(initialFormData);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border-2 border-emerald-200/40 bg-white p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
              <User className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Add New Patient
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
              Patient Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter patient name"
              onChange={handleChange}
              required
              className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              placeholder="Enter age"
              onChange={handleChange}
              min={1}
              max={120}
              required
              className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
            />
          </div>

          {/* Gender and Phone */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                placeholder="Enter phone number"
                onChange={handleChange}
                inputMode="numeric"
                maxLength={10}
                required
                className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              placeholder="Enter address"
              onChange={handleChange}
              required
              className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
            />
          </div>

          {/* Disease */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Disease/Condition
            </label>
            <input
              type="text"
              name="disease"
              value={formData.disease}
              placeholder="Enter disease or condition"
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-emerald-200/40 bg-emerald-50/30 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
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
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPatientModal;
