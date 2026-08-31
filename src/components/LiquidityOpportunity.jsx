import {
  FiAlertTriangle,
  FiArrowRight,
  FiShield,
  FiTrendingDown,
} from "react-icons/fi";

export default function LiquidityOpportunity() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#111111]/80
        backdrop-blur-xl
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
          p-5
          sm:p-6
          border-b
          border-white/[0.07]
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <div
              className="
                w-9
                h-9
                rounded-xl
                bg-[#6DD054]/10
                border
                border-[#6DD054]/20
                flex
                items-center
                justify-center
              "
            >
              <FiTrendingDown
                size={17}
                className="text-[#6DD054]"
              />
            </div>

            <div>
              <h2 className="text-sm font-semibold">
                Liquidity Opportunity
              </h2>

              <p className="text-xs text-white/35 mt-1">
                Monitor positions that may require attention
              </p>
            </div>
          </div>
        </div>

        {/* STATUS */}
        <span
          className="
            shrink-0
            inline-flex
            items-center
            gap-1.5
            px-2.5
            py-1.5
            rounded-lg
            bg-[#6DD054]/10
            border
            border-[#6DD054]/15
            text-[10px]
            font-medium
            text-[#6DD054]
          "
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6DD054]" />
          Healthy
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 sm:p-6">

        {/* OPPORTUNITY CARD */}
        <div
          className="
            rounded-xl
            border
            border-white/[0.07]
            bg-white/[0.025]
            p-4
            sm:p-5
          "
        >
          <div className="flex items-start gap-4">

            {/* ICON */}
            <div
              className="
                w-10
                h-10
                shrink-0
                rounded-xl
                bg-white/[0.04]
                border
                border-white/[0.06]
                flex
                items-center
                justify-center
              "
            >
              <FiShield
                size={18}
                className="text-[#6DD054]"
              />
            </div>

            {/* TEXT */}
            <div className="min-w-0 flex-1">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                <div>
                  <p className="text-sm font-semibold">
                    Your position is currently safe
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    Your collateral health is above the
                    liquidation threshold.
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="text-sm font-semibold text-[#6DD054]">
                    85.4%
                  </span>

                  <p className="text-[10px] text-white/25 mt-0.5">
                    Safety level
                  </p>
                </div>

              </div>

              {/* PROGRESS */}
              <div className="mt-4">

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-white/30">
                    Current health
                  </span>

                  <span className="text-[10px] text-white/30">
                    85.4%
                  </span>
                </div>

                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="
                      h-full
                      w-[85.4%]
                      rounded-full
                      bg-[#6DD054]
                    "
                  />
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* INFO ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">

          <InfoItem
            label="Collateral"
            value="0.50 ETH"
          />

          <InfoItem
            label="Borrowed"
            value="500 USDC"
          />

          <InfoItem
            label="Liquidation Threshold"
            value="75%"
          />

        </div>

        {/* WARNING / OPPORTUNITY */}
        <div
          className="
            mt-4
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            rounded-xl
            border
            border-[#6DD054]/10
            bg-[#6DD054]/[0.04]
            p-4
          "
        >
          <div className="flex items-start gap-3">

            <FiAlertTriangle
              size={17}
              className="mt-0.5 shrink-0 text-[#6DD054]"
            />

            <div>
              <p className="text-xs font-medium text-white">
                Keep your position healthy
              </p>

              <p className="mt-1 text-[11px] leading-relaxed text-white/35">
                Adding collateral can improve your safety
                level and reduce liquidation risk.
              </p>
            </div>

          </div>

          <button
            type="button"
            className="
              group
              shrink-0
              flex
              items-center
              justify-center
              gap-2
              px-3.5
              py-2.5
              rounded-lg
              bg-[#6DD054]
              text-[#0b1609]
              text-xs
              font-semibold
              transition-all
              duration-200
              hover:bg-[#7be663]
              hover:-translate-y-0.5
              active:translate-y-0
            "
          >
            Improve Position

            <FiArrowRight
              size={14}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            />
          </button>

        </div>

      </div>
    </div>
  );
}


/* ============================================================
   INFO ITEM
============================================================ */

function InfoItem({ label, value }) {
  return (
    <div
      className="
        rounded-xl
        border
        border-white/[0.07]
        bg-white/[0.025]
        px-4
        py-3
      "
    >
      <p className="text-[10px] uppercase tracking-wider text-white/25">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-semibold text-white/80">
        {value}
      </p>
    </div>
  );
}