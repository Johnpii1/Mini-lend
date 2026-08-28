
import {
  FiSearch,
  FiList,
  FiLock,
  FiPlus,
  FiArrowDownLeft,
  FiRefreshCw,
  FiArrowUpRight,
} from "react-icons/fi";

export default function ActivityFilters({
  filter,
  setFilter,
  search,
  setSearch,
}) {
  const filters = [
    {
      name: "All",
      icon: FiList,
    },
    {
      name: "Stake",
      icon: FiLock,
    },
    {
      name: "Add Collateral",
      icon: FiPlus,
    },
    {
      name: "Borrow",
      icon: FiArrowDownLeft,
    },
    {
      name: "Repay",
      icon: FiRefreshCw,
    },
    {
      name: "Withdraw",
      icon: FiArrowUpRight,
    },
  ];

  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#111111]/80
        p-4
        sm:p-5
      "
    >

      {/* =====================================================
          FILTERS
      ====================================================== */}

      <div
        className="
          flex
          gap-2
          overflow-x-auto
          pb-1
          scrollbar-hide
        "
      >

        {filters.map((item) => {
          const Icon = item.icon;
          const active = filter === item.name;

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setFilter(item.name)}
              className={`
                shrink-0
                inline-flex
                items-center
                gap-2
                px-3
                py-2
                rounded-xl
                text-xs
                font-medium
                border
                transition-all
                duration-200

                ${
                  active
                    ? `
                      bg-[#6DD054]/10
                      border-[#6DD054]/25
                      text-[#6DD054]
                    `
                    : `
                      bg-white/[0.02]
                      border-white/[0.07]
                      text-white/40
                      hover:text-white
                      hover:bg-white/[0.05]
                      hover:border-white/10
                    `
                }
              `}
            >
              <Icon size={14} />

              <span>
                {item.name}
              </span>
            </button>
          );
        })}

      </div>


      {/* =====================================================
          SEARCH
      ====================================================== */}

      <div className="mt-4">

        <div className="relative">

          <FiSearch
            size={16}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-white/25
            "
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search transactions..."
            className="
              w-full
              h-10
              pl-9
              pr-3
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              text-sm
              text-white
              placeholder:text-white/25
              outline-none
              focus:border-[#6DD054]/40
              focus:bg-white/[0.05]
              transition
            "
          />

        </div>

      </div>

    </div>
  );
}

