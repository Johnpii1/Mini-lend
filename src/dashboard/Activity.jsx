import {
  FiLock,
  FiArrowDownLeft,
  FiRefreshCw,
  FiArrowUpRight,
} from "react-icons/fi";

export default function Activity() {
  const activities = [
    {
      icon: FiLock,
      title: "ETH Staked",
      amount: "+0.50 ETH",
      time: "Today, 10:42 AM",
      type: "positive",
    },
    {
      icon: FiArrowDownLeft,
      title: "USDC Borrowed",
      amount: "+500 USDC",
      time: "Yesterday, 4:18 PM",
      type: "neutral",
    },
    {
      icon: FiRefreshCw,
      title: "Debt Repaid",
      amount: "-200 USDC",
      time: "Aug 25, 2:31 PM",
      type: "positive",
    },
    {
      icon: FiArrowUpRight,
      title: "ETH Withdrawn",
      amount: "-0.20 ETH",
      time: "Aug 24, 1:15 PM",
      type: "neutral",
    },
  ];

  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#111111]/80
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div className="p-5 sm:p-6 border-b border-white/[0.07]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold">
              Recent Activity
            </h2>

            <p className="text-xs text-white/35 mt-1">
              Your latest MiniLend transactions
            </p>
          </div>

          <button
            type="button"
            className="
              shrink-0
              text-xs
              text-[#6DD054]
              hover:text-white
              transition
            "
          >
            View all
          </button>
        </div>
      </div>

      {/* ACTIVITY LIST */}
      <div>
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="
                flex
                items-center
                justify-between
                gap-4
                p-5
                sm:px-6
                border-b
                border-white/[0.05]
                last:border-b-0
                hover:bg-white/[0.02]
                transition
              "
            >
              {/* LEFT */}
              <div className="flex items-center gap-3 min-w-0">
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
                  <Icon
                    size={17}
                    className="text-[#6DD054]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {activity.title}
                  </p>

                  <p className="text-xs text-white/30 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right shrink-0">
                <p
                  className={`
                    text-sm
                    font-semibold
                    ${
                      activity.type === "positive"
                        ? "text-[#6DD054]"
                        : "text-white/70"
                    }
                  `}
                >
                  {activity.amount}
                </p>

                <p className="text-[10px] text-white/25 mt-1">
                  Confirmed
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}