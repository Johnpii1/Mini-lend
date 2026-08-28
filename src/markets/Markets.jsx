
import {
  FiTrendingUp,
  FiDollarSign,
  FiActivity,
  FiSearch,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Markets() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="border-b border-white/[0.07] bg-[#0d0d0d]">
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

          <p className="text-xs sm:text-sm text-[#6DD054] font-medium uppercase tracking-wider">
            Markets
          </p>

          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
            Lending Markets
          </h1>

          <p className="mt-2 text-sm text-white/40 max-w-xl">
            Explore available assets, supply liquidity and borrow
            against your collateral.
          </p>

        </div>
      </div>


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <main className="flex-1 px-5 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* =================================================
            MARKET OVERVIEW
        ================================================== */}

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">

          <OverviewCard
            icon={FiTrendingUp}
            label="Total Supplied"
            value="$0.00"
            description="Assets supplied to markets"
          />

          <OverviewCard
            icon={FiDollarSign}
            label="Total Borrowed"
            value="$0.00"
            description="Assets currently borrowed"
          />

          <OverviewCard
            icon={FiActivity}
            label="Total Liquidity"
            value="$0.00"
            description="Available market liquidity"
          />

        </section>


        {/* =================================================
            MARKET LIST
        ================================================== */}

        <section>

          {/* MARKET LIST HEADER */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">

            <div>
              <h2 className="text-lg font-semibold">
                Available Markets
              </h2>

              <p className="text-xs text-white/35 mt-1">
                Supply or borrow supported assets
              </p>
            </div>


            {/* SEARCH */}

            <div className="relative w-full sm:w-64">

              <FiSearch
                size={16}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-white/30
                "
              />

              <input
                type="text"
                placeholder="Search assets..."
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


          {/* =================================================
              MARKET CONTAINER
          ================================================== */}

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-[#111111]/80
              overflow-hidden
            "
          >

            {/* TABLE HEADER */}

            <div
              className="
                hidden
                md:grid
                grid-cols-5
                gap-4
                px-6
                py-4
                border-b
                border-white/[0.07]
                text-[10px]
                uppercase
                tracking-wider
                text-white/30
              "
            >
              <span>Asset</span>
              <span>Supply APY</span>
              <span>Borrow APY</span>
              <span>Liquidity</span>
              <span className="text-right">Actions</span>
            </div>


            {/* EMPTY STATE */}

            <div className="px-5 py-16 sm:px-6 text-center">

              <div
                className="
                  mx-auto
                  w-12
                  h-12
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  flex
                  items-center
                  justify-center
                  text-white/30
                "
              >
                <FiActivity size={20} />
              </div>

              <h3 className="mt-4 text-sm font-semibold">
                No markets available
              </h3>

              <p className="mt-2 text-xs text-white/35 max-w-sm mx-auto">
                Supported lending markets will appear here once
                they are available.
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

    </div>
  );
}


/* =========================================================
   OVERVIEW CARD
========================================================= */

function OverviewCard({
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


        {/* ICON */}

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


      {/* DESCRIPTION */}

      <p className="mt-4 text-xs text-white/25">
        {description}
      </p>

    </div>
  );
}

