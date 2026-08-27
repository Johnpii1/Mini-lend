import {
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

export default function HealthCard() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#6DD054]/20
        bg-[#6DD054]/[0.04]
        p-5
        sm:p-6
      "
    >

      <div className="flex items-center gap-3">

        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-[#6DD054]/10
            flex
            items-center
            justify-center
          "
        >
          <FiShield
            className="text-[#6DD054]"
            size={19}
          />
        </div>

        <div>

          <p className="text-sm font-semibold">
            Position Health
          </p>

          <p className="text-xs text-white/35">
            Liquidation protection
          </p>

        </div>

      </div>


      <div className="mt-6 flex items-center justify-between">

        <div>

          <p className="text-3xl font-bold text-[#6DD054]">
            1.82
          </p>

          <p className="mt-1 text-xs text-white/40">
            Health Factor
          </p>

        </div>

        <FiCheckCircle
          className="text-[#6DD054]"
          size={30}
        />

      </div>


      <div className="mt-5">

        <div className="h-2 rounded-full bg-white/10 overflow-hidden">

          <div
            className="
              h-full
              w-[78%]
              rounded-full
              bg-[#6DD054]
            "
          />

        </div>

        <div className="flex justify-between mt-2">

          <span className="text-[10px] text-white/30">
            Liquidation
          </span>

          <span className="text-[10px] text-[#6DD054]">
            Healthy
          </span>

        </div>

      </div>

    </div>
  );
}