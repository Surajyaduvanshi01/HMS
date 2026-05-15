import {
  Bell,
  Search,
  Menu,
  LogOut,
} from "lucide-react";

function Navbar({
  setMobileOpen,
}) {
  return (
    <div className="sticky top-0 z-30 h-20 backdrop-blur-md bg-white/80 border-b border-emerald-200/40 flex items-center justify-between px-4 md:px-8 shadow-sm">

      <div className="flex items-center gap-4 w-full max-w-xl">

        <button
          onClick={() =>
            setMobileOpen(true)
          }
          className="md:hidden text-gray-700 hover:text-emerald-600 transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-3 bg-gray-50 border-2 border-emerald-200/40 px-4 py-3 rounded-xl w-full shadow-sm hover:border-emerald-300 transition-all duration-300">

          <Search
            size={18}
            className="text-emerald-600"
          />

          <input
            type="text"
            placeholder="Search here..."
            className="bg-transparent outline-none w-full text-sm text-gray-900 placeholder-gray-500"
          />

        </div>

      </div>

      <div className="flex items-center gap-4 ml-5">

        <button className="w-11 h-11 rounded-xl bg-emerald-50 border-2 border-emerald-200/50 flex items-center justify-center hover:bg-emerald-100 hover:border-emerald-300 transition-all text-emerald-600">
          <Bell size={20} />
        </button>

        <button
          onClick={() => {
            localStorage.removeItem(
              "token"
            );

            window.location.href =
              "/login";
          }}
          className="btn-primary hover:scale-105 transition-all px-5 py-3 min-w-[110px] justify-center"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

      </div>
    </div>
  );
}

export default Navbar;
