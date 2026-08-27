import {
  FiMenu,
  FiBell,
  FiCircle,
  FiArrowUpRight,
} from "react-icons/fi";

export default function DashboardHeader({ onMenuClick }) {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        h-20
        border-b
        border-white/10
        bg-[#0d0d0d]/95
        backdrop-blur-2xl
      "
    >
      <div className="h-full px-5 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <div className="flex items-center gap-4">

          {/* MOBILE MENU */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            className="
              lg:hidden
              w-10
              h-10
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              flex
              items-center
              justify-center
              text-white/70
              hover:text-[#6DD054]
              hover:border-[#6DD054]/30
              hover:bg-[#6DD054]/10
              transition-all
            "
          >
            <FiMenu size={21} />
          </button>

          {/* PAGE TITLE */}
          <div>
            <p className="text-[11px] text-[#6DD054] font-medium uppercase tracking-[0.15em]">
              MiniLend
            </p>

            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
              Dashboard
            </h1>
          </div>

        </div>


        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div className="flex items-center gap-3">

          {/* NETWORK - DESKTOP */}
          <div
            className="
              hidden
              sm:flex
              items-center
              gap-2
              h-10
              px-3
              rounded-xl
              border
              border-[#6DD054]/15
              bg-[#6DD054]/[0.05]
            "
          >
            <FiCircle
              className="
                text-[8px]
                fill-[#6DD054]
                text-[#6DD054]
                animate-pulse
              "
            />

            <span className="text-xs font-medium text-white/55">
              Anvil
            </span>
          </div>


          {/* NOTIFICATION */}
          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              w-10
              h-10
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              flex
              items-center
              justify-center
              text-white/60
              hover:text-white
              hover:border-[#6DD054]/30
              hover:bg-[#6DD054]/10
              transition-all
            "
          >
            <FiBell size={18} />

            {/* Notification indicator */}
            <span
              className="
                absolute
                top-2
                right-2
                w-1.5
                h-1.5
                rounded-full
                bg-[#6DD054]
              "
            />
          </button>


          {/* CONNECT WALLET - DESKTOP */}
          <button
            type="button"
            className="
              hidden
              md:flex
              items-center
              justify-center
              gap-2
              h-10
              px-4
              rounded-xl
              bg-[#6DD054]
              text-[#0b1609]
              text-xs
              lg:text-sm
              font-bold
              transition-all
              duration-200
              hover:bg-[#7be663]
              hover:-translate-y-0.5
              hover:shadow-[0_8px_25px_rgba(109,208,84,0.18)]
              active:translate-y-0
              active:scale-[0.98]
            "
          >
            User address

            <FiArrowUpRight
              className="text-base"
            />
          </button>

        </div>

      </div>
    </header>
  );
}