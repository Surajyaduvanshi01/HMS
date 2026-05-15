import { BriefcaseMedical, Clock, Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";

function DoctorCard({ doctor }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative overflow-hidden rounded-2xl border-2 border-emerald-200/40 bg-white p-8 shadow-lg hover:shadow-xl hover:border-emerald-300 transition-all duration-300"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-emerald-100/0 group-hover:from-emerald-50/50 group-hover:to-emerald-100/30 transition-all duration-300 pointer-events-none" />

      <div className="relative z-10">
        {/* Header with avatar */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
              {doctor.name}
            </h2>
            <p className="text-emerald-600 text-sm font-medium mt-1">
              {doctor.email}
            </p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-xl font-bold text-white shadow-lg shrink-0">
            {doctor.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-emerald-200/50 my-6" />

        {/* Info section */}
        <div className="space-y-4 text-gray-700 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <BriefcaseMedical size={18} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600 uppercase">Specialization</p>
              <p className="font-semibold text-gray-900">{doctor.specialization}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Clock size={18} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600 uppercase">Experience</p>
              <p className="font-semibold text-gray-900">{doctor.experience} Years</p>
            </div>
          </div>
        </div>

        {/* Availability badges */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-600 uppercase mb-3">Available Days</p>
          <div className="flex flex-wrap gap-2">
            {doctor.availability?.map((day, index) => (
              <span
                key={index}
                className="rounded-lg bg-gradient-to-r from-emerald-100 to-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-200"
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        {/* Footer with consultation fee */}
        <div className="pt-6 border-t border-emerald-200/50 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600 uppercase font-bold">Consultation Fee</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              ₹{doctor.consultationFee?.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <Star size={20} className="text-emerald-600" fill="currentColor" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DoctorCard;
