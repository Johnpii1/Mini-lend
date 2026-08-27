import { useState } from "react";
import {
  FiX,
  FiArrowUpRight,
  FiAlertCircle,
} from "react-icons/fi";

export default function WithdrawModal({
  isOpen,
  onClose,
}) {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const collateral = 1.2;
  const available = 0.8;

  const handleMax = () => {
    setAmount(available.toString());
  };

  const handleWithdraw = () => {
    if (!amount || Number(amount) <= 0) return;

    console.log("Withdraw:", amount, "ETH");
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
              <FiArrowUpRight
                size={18}
                className="text-[#6DD054]"
              />
            </div>

            <div>
              <h2 className="text-base font-semibold">
                Withdraw ETH
              </h2>

              <p className="text-xs text-white/35 mt-0.5">
                Withdraw available collateral
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
              Withdraw amount
            </span>

            <span className="text-xs text-white/40">
              Available:{" "}
              <span className="text-white/70">
                {available} ETH
              </span>
            </span>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.025]">
            <div className="flex items-center px-4 h-16">
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-transparent outline-none text-xl font-semibold placeholder:text-white/15"
              />

              <span className="px-3 py-2 rounded-lg bg-white/[0.05] text-xs">
                ETH
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

          {/* SUMMARY */}
          <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-xs text-white/35">
                Current collateral
              </span>

              <span className="text-xs text-white/70">
                {collateral} ETH
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-xs text-white/35">
                Remaining collateral
              </span>

              <span className="text-xs text-white">
                {Math.max(
                  0,
                  collateral - (Number(amount) || 0)
                ).toFixed(2)}{" "}
                ETH
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

          {/* WARNING */}
          <div className="mt-4 flex gap-3 rounded-xl border border-yellow-500/10 bg-yellow-500/[0.04] p-3">
            <FiAlertCircle
              size={15}
              className="shrink-0 mt-0.5 text-yellow-400"
            />

            <p className="text-[11px] leading-5 text-white/40">
              You can only withdraw collateral that does
              not put your lending position at risk.
            </p>
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
              onClick={handleWithdraw}
              disabled={
                !amount ||
                Number(amount) <= 0 ||
                Number(amount) > available
              }
              className="h-12 rounded-xl bg-[#6DD054] text-[#0b1609] text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Withdraw
              <FiArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}