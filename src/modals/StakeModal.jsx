import { useState } from "react";
import {
  FiX,
  FiLock,
  FiArrowUpRight,
  FiAlertCircle,
} from "react-icons/fi";

export default function StakeModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const balance = 2.45;

  const handleMax = () => {
    setAmount(balance.toString());
  };

  const handleStake = () => {
    if (!amount || Number(amount) <= 0) return;

    // Wallet / smart contract logic will be added here later
    console.log("Staking:", amount, "ETH");
  };

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
        backdrop-blur-sm
        px-4
        py-6
      "
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-md
          rounded-2xl
          border
          border-white/10
          bg-[#111111]
          shadow-[0_25px_80px_rgba(0,0,0,0.55)]
          overflow-hidden
        "
      >

        {/* TOP ACCENT */}
        <div
          className="
            absolute
            top-0
            left-0
            right-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#6DD054]
            to-transparent
          "
        />

        {/* HEADER */}
        <div
          className="
            flex
            items-center
            justify-between
            px-5
            py-5
            border-b
            border-white/[0.07]
          "
        >
          <div className="flex items-center gap-3">

            {/* ICON */}
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-[#6DD054]/10
                border
                border-[#6DD054]/20
                flex
                items-center
                justify-center
              "
            >
              <FiLock
                size={18}
                className="text-[#6DD054]"
              />
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                Stake ETH
              </h2>

              <p className="text-xs text-white/35 mt-0.5">
                Add ETH as collateral
              </p>
            </div>

          </div>

          {/* CLOSE */}
          <button
            type="button"
            onClick={onClose}
            className="
              w-9
              h-9
              rounded-lg
              flex
              items-center
              justify-center
              text-white/40
              hover:text-white
              hover:bg-white/[0.05]
              transition
            "
          >
            <FiX size={19} />
          </button>

        </div>

        {/* BODY */}
        <div className="p-5">

          {/* BALANCE */}
          <div className="flex items-center justify-between mb-2">

            <span className="text-xs text-white/40">
              Amount
            </span>

            <span className="text-xs text-white/40">
              Balance:{" "}
              <span className="text-white/70">
                {balance} ETH
              </span>
            </span>

          </div>

          {/* INPUT */}
          <div
            className="
              rounded-xl
              border
              border-white/10
              bg-white/[0.025]
              focus-within:border-[#6DD054]/40
              transition
            "
          >
            <div className="flex items-center px-4 h-16">

              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-xl
                  font-semibold
                  text-white
                  placeholder:text-white/15
                "
              />

              {/* ETH */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  shrink-0
                  px-3
                  py-2
                  rounded-lg
                  bg-white/[0.05]
                  border
                  border-white/[0.06]
                "
              >
                <div
                  className="
                    w-5
                    h-5
                    rounded-full
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    text-[9px]
                    font-bold
                  "
                >
                  Ξ
                </div>

                <span className="text-xs font-medium">
                  ETH
                </span>
              </div>

            </div>

            {/* MAX */}
            <div className="px-4 pb-3 flex justify-end">

              <button
                type="button"
                onClick={handleMax}
                className="
                  text-[10px]
                  font-semibold
                  text-[#6DD054]
                  hover:text-white
                  transition
                "
              >
                MAX
              </button>

            </div>
          </div>

          {/* INFO */}
          <div
            className="
              mt-4
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.02]
              p-4
              space-y-3
            "
          >

            <div className="flex items-center justify-between">
              <span className="text-xs text-white/35">
                Current collateral
              </span>

              <span className="text-xs font-medium text-white/70">
                0.00 ETH
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-white/35">
                After staking
              </span>

              <span className="text-xs font-medium text-white">
                {amount || "0.00"} ETH
              </span>
            </div>

            <div className="h-px bg-white/[0.06]" />

            <div className="flex items-center justify-between">
              <span className="text-xs text-white/35">
                Health factor
              </span>

              <span className="text-xs font-semibold text-[#6DD054]">
                Safe
              </span>
            </div>

          </div>

          {/* WARNING / INFO */}
          <div
            className="
              mt-4
              flex
              gap-3
              rounded-xl
              border
              border-[#6DD054]/10
              bg-[#6DD054]/[0.04]
              p-3
            "
          >
            <FiAlertCircle
              className="shrink-0 mt-0.5 text-[#6DD054]"
              size={15}
            />

            <p className="text-[11px] leading-5 text-white/40">
              Your ETH will be locked as collateral and can
              be withdrawn later as long as your position
              remains healthy.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-3 mt-5">

            {/* CANCEL */}
            <button
              type="button"
              onClick={onClose}
              className="
                h-12
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                text-sm
                font-medium
                text-white/60
                hover:text-white
                hover:bg-white/[0.06]
                transition
              "
            >
              Cancel
            </button>

            {/* STAKE */}
            <button
              type="button"
              onClick={handleStake}
              disabled={!amount || Number(amount) <= 0}
              className="
                group
                h-12
                rounded-xl
                bg-[#6DD054]
                text-[#0b1609]
                text-sm
                font-bold
                flex
                items-center
                justify-center
                gap-2
                transition-all
                hover:bg-[#7be663]
                disabled:opacity-40
                disabled:cursor-not-allowed
              "
            >
              Stake ETH

              <FiArrowUpRight
                size={16}
                className="
                  transition-transform
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}