import {
  FiDollarSign,
  FiLock,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";

export default function PositionOverview() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#111111]/80
        backdrop-blur-xl
        p-5
        sm:p-6
      "
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <p className="text-xs text-white/40">
            Total Position
          </p>

          <h2 className="mt-1 text-2xl sm:text-3xl font-bold">
            $2,840.50
          </h2>
        </div>

        <div
          className="
            w-11
            h-11
            rounded-xl
            bg-[#6DD054]/10
            border
            border-[#6DD054]/20
            flex
            items-center
            justify-center
          "
        >
          <FiDollarSign
            className="text-[#6DD054]"
            size={20}
          />
        </div>

      </div>


      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

        <Stat
          icon={FiLock}
          label="Collateral"
          value="1.25 ETH"
        />

        <Stat
          icon={FiTrendingUp}
          label="Collateral Value"
          value="$3,120"
        />

        <Stat
          icon={FiDollarSign}
          label="Debt"
          value="$840"
        />

        <Stat
          icon={FiActivity}
          label="Health"
          value="Healthy"
          green
        />

      </div>

    </div>
  );
}


function Stat({
  icon: Icon,
  label,
  value,
  green = false,
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-white/[0.07]
        bg-white/[0.025]
        p-4
      "
    >
      <div className="flex items-center gap-2">

        <Icon
          size={15}
          className={
            green
              ? "text-[#6DD054]"
              : "text-white/35"
          }
        />

        <span className="text-[11px] text-white/35">
          {label}
        </span>

      </div>

      <p
        className={`mt-2 text-sm font-semibold ${
          green
            ? "text-[#6DD054]"
            : "text-white"
        }`}
      >
        {value}
      </p>

    </div>
  );
}