import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiTrendingUp,
  FiActivity,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiChevronLeft,
  FiX,
} from "react-icons/fi";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiGrid,
    },
    {
      name: "Markets",
      path: "/markets",
      icon: FiTrendingUp,
    },
    {
      name: "Activity",
      path: "/activity",
      icon: FiActivity,
    },
  ];

  const bottomItems = [
    {
      name: "Settings",
      path: "/settings",
      icon: FiSettings,
    },
    {
      name: "Help Center",
      path: "/help",
      icon: FiHelpCircle,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-[#0d0d0d]
          border-r border-white/10
          flex flex-col
          transition-transform duration-300
          
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
          <div>
            <h1 className="text-white text-xl font-bold tracking-tight">
              MINI<span className="text-[#6DD054]">LEND</span>
            </h1>

            <p className="text-[10px] text-gray-500 tracking-widest mt-1">
              DECENTRALIZED LENDING
            </p>
          </div>

          {/* Mobile Close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden w-9 h-9 rounded-lg
                       flex items-center justify-center
                       text-gray-400 hover:text-white
                       hover:bg-white/5 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-6">
          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500">
            Main Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `
                    group flex items-center gap-3
                    px-3 py-3 rounded-xl
                    text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#6DD054]/10 text-[#6DD054] border border-[#6DD054]/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }
                    `
                  }
                >
                  <Icon size={18} />

                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Bottom Navigation */}
          <div className="mt-8">
            <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500">
              Support
            </p>

            <div className="space-y-1">
              {bottomItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `
                      flex items-center gap-3
                      px-3 py-3 rounded-xl
                      text-sm font-medium
                      transition-all
                      ${
                        isActive
                          ? "bg-[#6DD054]/10 text-[#6DD054]"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }
                      `
                    }
                  >
                    <Icon size={18} />

                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Wallet Status */}
        <div className="px-4 pb-4">
          <div
            className="
              rounded-2xl
              border border-[#6DD054]/20
              bg-[#111111]/80
              backdrop-blur-xl
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#6DD054]/10 border border-[#6DD054]/20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6DD054]" />
                </div>

                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#6DD054] border-2 border-[#111111]" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500">
                  Wallet Status
                </p>

                <p className="text-sm text-white font-medium">
                  Not Connected
                </p>
              </div>
            </div>

            <button
              className="
                mt-4 w-full
                flex items-center justify-center gap-2
                py-2.5 rounded-xl
                bg-[#6DD054]
                text-black
                text-xs font-bold
                hover:bg-[#7be663]
                transition
              "
            >
           user address
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-gray-600">
              MiniLend.eth
            </p>

            <button className="text-gray-500 hover:text-red-400 transition">
              <FiLogOut size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}