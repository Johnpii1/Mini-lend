
import { useState } from "react";
import {
  FiMenu,
  FiBell,
  FiCircle,
  FiArrowUpRight,
  FiLogOut,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";

export default function DashboardHeader({ onMenuClick }) {
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  const handleDisconnect = () => {
    // Add your actual wallet disconnect logic here
    console.log("Wallet disconnected");

    setShowDisconnectModal(false);
  };

  return (
    <>
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

          {/* LEFT SIDE */}
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


          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* NETWORK */}
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


            {/* MOBILE DISCONNECT */}
            <button
              type="button"
              onClick={() => setShowDisconnectModal(true)}
              aria-label="Disconnect wallet"
              title="Disconnect wallet"
              className="
                md:hidden
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
                hover:text-red-400
                hover:border-red-400/30
                hover:bg-red-400/10
                transition-all
              "
            >
              <FiLogOut size={18} />
            </button>


            {/* DESKTOP WALLET */}
            <div className="hidden md:flex items-center gap-2">

              {/* USER ADDRESS */}
              <button
                type="button"
                className="
                  flex
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

                <FiArrowUpRight className="text-base" />
              </button>


              {/* DESKTOP DISCONNECT */}
              <button
                type="button"
                onClick={() => setShowDisconnectModal(true)}
                aria-label="Disconnect wallet"
                title="Disconnect wallet"
                className="
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
                  hover:text-red-400
                  hover:border-red-400/30
                  hover:bg-red-400/10
                  transition-all
                "
              >
                <FiLogOut size={18} />
              </button>

            </div>

          </div>
        </div>
      </header>


      {/* =====================================================
          DISCONNECT MODAL
      ====================================================== */}
      {showDisconnectModal && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            px-5
            bg-black/70
            backdrop-blur-sm
          "
          onClick={() => setShowDisconnectModal(false)}
        >
          <div
            className="
              w-full
              max-w-sm
              rounded-2xl
              border
              border-white/10
              bg-[#111111]
              p-6
              shadow-[0_20px_80px_rgba(0,0,0,0.55)]
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}
            <div className="flex items-start justify-between">

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-red-400/10
                  border
                  border-red-400/20
                  flex
                  items-center
                  justify-center
                  text-red-400
                "
              >
                <FiAlertCircle size={21} />
              </div>

              <button
                type="button"
                onClick={() => setShowDisconnectModal(false)}
                aria-label="Close"
                className="
                  w-8
                  h-8
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-white/40
                  hover:text-white
                  hover:bg-white/5
                  transition
                "
              >
                <FiX size={18} />
              </button>

            </div>


            {/* CONTENT */}
            <div className="mt-5">

              <h2 className="text-lg font-bold text-white">
                Disconnect Wallet?
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/45">
                Are you sure you want to disconnect your wallet from MiniLend?
              </p>

            </div>


            {/* ACTIONS */}
            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() => setShowDisconnectModal(false)}
                className="
                  flex-1
                  h-11
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  text-sm
                  font-semibold
                  text-white/70
                  hover:bg-white/[0.08]
                  hover:text-white
                  transition
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDisconnect}
                className="
                  flex-1
                  h-11
                  rounded-xl
                  bg-red-500
                  text-white
                  text-sm
                  font-bold
                  hover:bg-red-400
                  transition
                  active:scale-[0.98]
                "
              >
                Disconnect
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

