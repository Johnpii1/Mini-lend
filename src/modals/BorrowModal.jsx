import { useState } from "react";
import {
  FiX,
  FiArrowDownLeft,
  FiArrowUpRight,
} from "react-icons/fi";

export default function BorrowModal({
  isOpen,
  onClose,
}) {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const available = 850;

  const handleMax = () => {
    setAmount(available.toString());
  };

  const handleBorrow = () => {
    if (!amount || Number(amount) <= 0) return;

    console.log("Borrow:", amount, "USDC");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111111] shadow-[0_25px_80px_rgba(0,0,0,0.55)] overflow-hidden"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
              <FiArrowDownLeft
                size={18}
                className="text-[#6DD054]"
              />
            </div>

            <div>
              <h2 className="text-base font-semibold">
                Borrow USDC
              </h2>

              <p className="text-xs text-white/35 mt-0.5">
                Borrow against your collateral
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.05]"
          >
            <FiX size={19} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-5">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-white/40">
              Borrow amount
            </span>

            <span className="text-xs text-white/40">
              Available:{" "}
              <span className="text-white/70">
                {available} USDC
              </span>
            </span>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.025]">
            <div className="flex items-center px-4 h-16">
              <input
                type="number"
                min="0"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-transparent outline-none text-xl font-semibold placeholder:text-white/15"
              />

              <span className="px-3 py-2 rounded-lg bg-white/[0.05] text-xs">
                USDC
              </span>
            </div>

            <div className="px-4 pb-3 flex justify-end">
              <button
                onClick={handleMax}
                className="text-[10px] font-semibold text-[#6DD054]"
              >
                MAX
              </button>
            </div>
          </div>

          {/* POSITION */}
          <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-xs text-white/35">
                Current debt
              </span>

              <span className="text-xs text-white/70">
                0 USDC
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-xs text-white/35">
                New debt
              </span>

              <span className="text-xs text-white">
                {amount || "0"} USDC
              </span>
            </div>

            <div className="h-px bg-white/[0.06]" />

            <div className="flex justify-between">
              <span className="text-xs text-white/35">
                Health factor
              </span>

              <span className="text-xs font-semibold text-[#6DD054]">
                Safe
              </span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              onClick={onClose}
              className="h-12 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-white/60 hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={handleBorrow}
              disabled={!amount || Number(amount) <= 0}
              className="h-12 rounded-xl bg-[#6DD054] text-[#0b1609] text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-40"
            >
              Borrow
              <FiArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}