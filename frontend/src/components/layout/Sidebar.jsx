import {
  LayoutDashboard,
  Users,
  UserRound,
  CalendarDays,
  Receipt,
  X,
  Hospital,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Patients",
    icon: Users,
    path: "/patients",
  },
  {
    name: "Doctors",
    icon: UserRound,
    path: "/doctors",
  },
  {
    name: "Appointments",
    icon: CalendarDays,
    path: "/appointments",
  },
  {
    name: "Billing",
    icon: Receipt,
    path: "/billing",
  },
];

function Sidebar({
  mobileOpen,
  setMobileOpen,
}) {
  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:static z-50 top-0 left-0
          h-screen w-64 bg-white
          border-r border-emerald-200/40 p-6
          transform transition-transform duration-300
          overflow-y-auto

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
              <Hospital className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">HMS</h1>
              <p className="text-xs text-emerald-600 font-medium">Hospital</p>
            </div>
          </div>

          <button
            onClick={() =>
              setMobileOpen(false)
            }
            className="md:hidden text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <X size={24} />
          </button>

        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-emerald-200/0 via-emerald-200 to-emerald-200/0 mb-8" />

        {/* MENU */}
        <div className="space-y-2">

          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() =>
                setMobileOpen(false)
              }
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 border-l-4 border-emerald-600 shadow-sm"
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                }`
              }
            >

              <item.icon size={20} />

              <span>{item.name}</span>

            </NavLink>
          ))}

        </div>

        {/* FOOTER INFO */}
        <div className="absolute bottom-6 left-6 right-6 pt-6 border-t border-emerald-200/40">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200/40">
            <p className="text-xs text-gray-600 font-medium mb-1">Need Help?</p>
            <p className="text-xs text-emerald-600 font-semibold">Contact Support</p>
          </div>
        </div>

      </div>
    </>
  );
}

export default Sidebar;
