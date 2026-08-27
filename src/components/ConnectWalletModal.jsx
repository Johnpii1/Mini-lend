import {
  FiArrowUpRight,
  FiShield,
  FiX,
} from "react-icons/fi";

export default function ConnectWalletModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/70
        px-4
        backdrop-blur-md
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/10
          bg-[#111311]
          p-6
          shadow-[0_30px_100px_rgba(0,0,0,0.6)]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            text-white/40
            transition
            hover:border-white/20
            hover:bg-white/[0.04]
            hover:text-white
          "
        >
          <FiX />
        </button>

        {/* ICON */}
        <div
          className="
            mx-auto
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-[#6DD054]/10
          "
        >
          <FiShield className="text-2xl text-[#6DD054]" />
        </div>

        {/* TITLE */}
        <h2 className="mt-5 text-center text-xl font-bold text-white">
          Connect Your Wallet
        </h2>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-white/40">
          Connect your wallet to start staking assets and access
          stablecoin loans through MiniLend.
        </p>

        {/* CONNECT */}
        <button
          type="button"
          id="connectWalletBtn"
          className="
            mt-6
            flex
            h-12
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#6DD054]
            text-sm
            font-bold
            text-[#0b1609]
            transition
            hover:bg-[#7ae360]
            active:scale-[0.98]
          "
        >
          Connect Wallet

          <FiArrowUpRight />
        </button>

        {/* TERMS */}
        <p className="mt-4 text-center text-[10px] leading-5 text-white/25">
          By connecting, you agree to our{" "}
          <a
            href="#"
            className="text-white/50 underline underline-offset-2"
          >
            Terms of Use
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-white/50 underline underline-offset-2"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}