
import {
  FiX,
  FiExternalLink,
  FiCheckCircle,
  FiCopy,
} from "react-icons/fi";
import { useState } from "react";

export default function TransactionModal({
  transaction,
  isOpen,
  onClose,
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !transaction) return null;

  const handleCopy = async () => {
    if (!transaction.hash) return;

    try {
      await navigator.clipboard.writeText(transaction.hash);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy transaction hash:", error);
    }
  };

  return (
    <div
      className="
        fixed inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-sm
        px-4
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
          shadow-2xl
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div
          className="
            flex
            items-center
            justify-between
            px-5
            py-4
            border-b
            border-white/[0.07]
          "
        >
          <div>
            <h2 className="text-sm font-semibold text-white">
              Transaction Details
            </h2>

            <p className="mt-1 text-xs text-white/35">
              View transaction information
            </p>
          </div>

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
            <FiX size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-5">

          {/* STATUS */}
          <div
            className="
              flex
              items-center
              gap-3
              p-4
              rounded-xl
              border
              border-[#6DD054]/15
              bg-[#6DD054]/[0.05]
            "
          >
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-[#6DD054]/10
                flex
                items-center
                justify-center
                text-[#6DD054]
              "
            >
              <FiCheckCircle size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Transaction Confirmed
              </p>

              <p className="text-xs text-white/35 mt-1">
                This transaction was successfully processed.
              </p>
            </div>
          </div>

          {/* TRANSACTION INFO */}
          <div className="mt-5 space-y-4">

            <DetailRow
              label="Type"
              value={transaction.title || "Transaction"}
            />

            <DetailRow
              label="Amount"
              value={transaction.amount || "--"}
              highlight
            />

            <DetailRow
              label="Status"
              value={transaction.status || "Confirmed"}
            />

            <DetailRow
              label="Date"
              value={transaction.time || "--"}
            />

            {/* HASH */}
            <div>
              <p className="text-xs text-white/30 mb-2">
                Transaction Hash
              </p>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  p-3
                "
              >
                <p className="flex-1 text-xs text-white/50 truncate">
                  {transaction.hash || "Not available"}
                </p>

                {transaction.hash && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="
                      shrink-0
                      text-white/40
                      hover:text-[#6DD054]
                      transition
                    "
                    title="Copy transaction hash"
                  >
                    <FiCopy size={15} />
                  </button>
                )}
              </div>

              {copied && (
                <p className="mt-1 text-[10px] text-[#6DD054]">
                  Transaction hash copied
                </p>
              )}
            </div>

          </div>

          {/* ACTIONS */}
          <div className="mt-6 flex gap-3">

            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                h-11
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                text-sm
                font-medium
                text-white/70
                hover:bg-white/[0.06]
                hover:text-white
                transition
              "
            >
              Close
            </button>

            {transaction.hash && (
              <button
                type="button"
                className="
                  flex-1
                  h-11
                  rounded-xl
                  bg-[#6DD054]
                  text-black
                  text-sm
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-[#7be663]
                  transition
                "
              >
                <FiExternalLink size={15} />
                View on Explorer
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}


/* =========================================================
   DETAIL ROW
========================================================= */

function DetailRow({
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-xs text-white/30">
        {label}
      </p>

      <p
        className={`
          text-xs
          font-medium
          text-right
          ${
            highlight
              ? "text-[#6DD054]"
              : "text-white/70"
          }
        `}
      >
        {value}
      </p>
    </div>
  );
}

