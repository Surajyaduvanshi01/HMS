import { motion } from "framer-motion";

function StatCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.15)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-emerald-50/50 border-2 border-emerald-200/40 p-8 shadow-lg hover:border-emerald-300 transition-all duration-300"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-emerald-100/0 group-hover:from-emerald-50/50 group-hover:to-emerald-100/30 transition-all duration-300 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="text-emerald-600 uppercase tracking-widest text-xs font-bold mb-2">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300">
            {value}
          </h2>

          {/* Animated underline */}
          <div className="mt-4 h-1 w-0 group-hover:w-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-300" />
        </div>

        {/* Icon container */}
        <div className="shrink-0">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200/50 p-5 text-emerald-600 shadow-lg group-hover:shadow-emerald-300/50 transition-all duration-300"
          >
            <div className="text-3xl">
              {icon}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-200/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default StatCard;
