import { useState } from "react";
import {
  FiPlus,
  FiArrowDownLeft,
  FiRefreshCw,
  FiLock,
  FiArrowUpRight,
} from "react-icons/fi";

import StakeModal from "../modals/StakeModal";
import AddCollateralModal from "../modals/AddCollateralModal";
import BorrowModal from "../modals/BorrowModal";
import RepayModal from "../modals/RepayModal";
import WithdrawModal from "../modals/WithdrawModal";

export default function ActionButtons() {
  const [stakeModalOpen, setStakeModalOpen] = useState(false);
  const [addCollateralModalOpen, setAddCollateralModalOpen] =
    useState(false);
  const [borrowModalOpen, setBorrowModalOpen] = useState(false);
  const [repayModalOpen, setRepayModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] =
    useState(false);

  return (
    <>
      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-[#111111]/80
          p-5
        "
      >
        {/* HEADER */}

        <div className="mb-4">
          <h2 className="text-sm font-semibold">
            Quick Actions
          </h2>

          <p className="text-xs text-white/35 mt-1">
            Manage your lending position
          </p>
        </div>

        {/* ACTIONS */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-5
            gap-3
          "
        >

          {/* STAKE */}

          <ActionButton
            icon={FiLock}
            title="Stake"
            text="Stake ETH as collateral"
            primary
            onClick={() => setStakeModalOpen(true)}
          />

          {/* ADD COLLATERAL */}

          <ActionButton
            icon={FiPlus}
            title="Add Collateral"
            text="Add more ETH"
            onClick={() =>
              setAddCollateralModalOpen(true)
            }
          />

          {/* BORROW */}

          <ActionButton
            icon={FiArrowDownLeft}
            title="Borrow"
            text="Borrow assets"
            onClick={() =>
              setBorrowModalOpen(true)
            }
          />

          {/* REPAY */}

          <ActionButton
            icon={FiRefreshCw}
            title="Repay"
            text="Repay your debt"
            onClick={() =>
              setRepayModalOpen(true)
            }
          />

          {/* WITHDRAW */}

          <ActionButton
            icon={FiArrowUpRight}
            title="Withdraw"
            text="Withdraw collateral"
            onClick={() =>
              setWithdrawModalOpen(true)
            }
          />

        </div>
      </div>

      {/* =====================================================
          MODALS
      ====================================================== */}

      <StakeModal
        isOpen={stakeModalOpen}
        onClose={() => setStakeModalOpen(false)}
      />

      <AddCollateralModal
        isOpen={addCollateralModalOpen}
        onClose={() =>
          setAddCollateralModalOpen(false)
        }
      />

      <BorrowModal
        isOpen={borrowModalOpen}
        onClose={() => setBorrowModalOpen(false)}
      />

      <RepayModal
        isOpen={repayModalOpen}
        onClose={() => setRepayModalOpen(false)}
      />

      <WithdrawModal
        isOpen={withdrawModalOpen}
        onClose={() =>
          setWithdrawModalOpen(false)
        }
      />
    </>
  );
}


/* ============================================================
   ACTION BUTTON
============================================================ */

function ActionButton({
  icon: Icon,
  title,
  text,
  primary = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        text-left
        rounded-xl
        border
        p-4
        transition-all
        duration-200

        ${
          primary
            ? `
              border-[#6DD054]/20
              bg-[#6DD054]/[0.06]
              hover:bg-[#6DD054]/10
              hover:border-[#6DD054]/30
            `
            : `
              border-white/[0.07]
              bg-white/[0.025]
              hover:bg-white/[0.05]
              hover:border-white/10
            `
        }
      `}
    >

      {/* ICON + ARROW */}

      <div className="flex items-center justify-between">

        <div
          className={`
            w-9
            h-9
            rounded-lg
            flex
            items-center
            justify-center

            ${
              primary
                ? "bg-[#6DD054]/10 text-[#6DD054]"
                : "bg-white/[0.05] text-white/50 group-hover:text-[#6DD054]"
            }
          `}
        >
          <Icon size={17} />
        </div>

        <span
          className="
            text-white/20
            group-hover:text-[#6DD054]
            group-hover:translate-x-0.5
            transition-all
            duration-200
          "
        >
          →
        </span>

      </div>

      {/* TITLE */}

      <p className="mt-4 text-sm font-semibold">
        {title}
      </p>

      {/* DESCRIPTION */}

      <p className="mt-1 text-xs text-white/35">
        {text}
      </p>

    </button>
  );
}