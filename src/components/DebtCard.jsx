import {
  FiCreditCard,
  FiArrowUpRight,
} from "react-icons/fi";

export default function DebtCard() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#111111]/80
        p-5
        sm:p-6
      "
    >

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-white/[0.05]
              flex
              items-center
              justify-center
            "
          >
            <FiCreditCard
              className="text-white/60"
              size={18}
            />
          </div>

          <div>
            <p className="text-sm font-semibold">
              Debt
            </p>

            <p className="text-xs text-white/35">
              Borrowed Assets
            </p>
          </div>

        </div>

        <FiArrowUpRight
          className="text-white/25"
          size={17}
        />

      </div>


      <div className="mt-6">

        <p className="text-2xl font-bold">
          840 USDC
        </p>

        <p className="mt-1 text-sm text-white/40">
          ≈ $840.00
        </p>

      </div>


      <div className="mt-5 flex items-center justify-between">

        <span className="text-xs text-white/35">
          Borrow limit
        </span>

        <span className="text-xs text-white/60">
          42%
        </span>

      </div>

      <div className="mt-2 h-1.5 rounded-full bg-white/10">

        <div
          className="
            h-full
            w-[42%]
            rounded-full
            bg-white/50
          "
        />

      </div>

    </div>
  );
}