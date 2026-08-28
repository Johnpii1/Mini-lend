
import { useState } from "react";
import {
  FiArrowLeft,
  FiActivity,
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";

export default function ActivityPage() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="border-b border-white/[0.07]">

        <div className="px-5 py-6 sm:px-6 lg:px-8 lg:py-8">

          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="
              inline-flex
              items-center
              gap-2
              mb-6
              px-3.5
              py-2
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              text-sm
              text-white/60
              hover:text-white
              hover:border-[#6DD054]/30
              hover:bg-[#6DD054]/[0.06]
              transition-all
              duration-200
            "
          >
            <FiArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>

          {/* TITLE */}
          <div className="flex items-start gap-3">

            <div
              className="
                hidden
                sm:flex
                w-11
                h-11
                rounded-xl
                bg-[#6DD054]/10
                border
                border-[#6DD054]/15
                items-center
                justify-center
                text-[#6DD054]
              "
            >
              <FiActivity size={20} />
            </div>

            <div>

              <p className="
                text-xs
                sm:text-sm
                text-[#6DD054]
                font-medium
                uppercase
                tracking-wider
              ">
                Activity
              </p>

              <h1 className="
                mt-1
                text-2xl
                sm:text-3xl
                font-bold
                tracking-tight
              ">
                Transaction History
              </h1>

              <p className="
                mt-2
                text-sm
                text-white/40
                max-w-xl
              ">
                View and track your MiniLend lending activity,
                transactions and position changes.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <main className="px-5 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* =================================================
            SUMMARY
        ================================================== */}

        <section className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-4
          mb-8
        ">

          <SummaryCard
            icon={FiActivity}
            label="Total Transactions"
            value="0"
            description="All recorded transactions"
          />

          <SummaryCard
            icon={FiTrendingUp}
            label="Total Supplied"
            value="0.00 ETH"
            description="Total collateral supplied"
          />

          <SummaryCard
            icon={FiDollarSign}
            label="Total Borrowed"
            value="0.00 USDC"
            description="Total assets borrowed"
          />

        </section>


        {/* =================================================
            FILTERS
        ================================================== */}

        <section className="mb-5">

          <ActivityFilters
            filter={filter}
            setFilter={setFilter}
            search={search}
            setSearch={setSearch}
          />

        </section>


        {/* =================================================
            ACTIVITY LIST
        ================================================== */}

        <section>

          <div className="mb-4">

            <h2 className="text-lg font-semibold">
              Transactions
            </h2>

            <p className="mt-1 text-xs text-white/35">
              Your latest lending transactions
            </p>

          </div>

          <ActivityList
            filter={filter}
            search={search}
          />

        </section>

      </main>

    </div>
  );
}


/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#111111]/80
        p-5
      "
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs text-white/35">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight">
            {value}
          </p>

        </div>

        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-[#6DD054]/10
            border
            border-[#6DD054]/15
            flex
            items-center
            justify-center
            text-[#6DD054]
          "
        >
          <Icon size={18} />
        </div>

      </div>

      <p className="mt-4 text-xs text-white/25">
        {description}
      </p>

    </div>
  );
}

