import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import PositionOverview from "./PositionOverview";
import CollateralCard from "./CollateralCard";
import DebtCard from "./DebtCard";
import HealthCard from "./HealthCard";
import LiquidityOpportunity from "./LiquidityOpportunity";
import ActionButtons from "./ActionButtons";
import Activity from "./Activity";
import Footer from "../components/Footer"

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* SIDEBAR */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* MAIN */}
      <main className="lg:ml-64 min-h-screen">

        {/* HEADER */}
        <DashboardHeader
          onMenuClick={() => setMobileOpen(true)}
        />

        {/* CONTENT */}
        <div className="p-5 sm:p-6 lg:p-8">

          {/* PAGE INTRO */}
          <section className="mb-8">
            <p className="text-xs sm:text-sm text-[#6DD054] font-medium uppercase tracking-wider">
              Overview
            </p>

            <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
              Your Position
            </h1>

            <p className="mt-2 text-sm text-white/40 max-w-xl">
              Monitor your collateral, borrowing position and
              overall lending health.
            </p>
          </section>

          {/* POSITION OVERVIEW */}
          <section className="mb-6">
            <PositionOverview />
          </section>

          {/* FINANCIAL CARDS */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
            <CollateralCard />
            <DebtCard />
            <HealthCard />
          </section>

          {/* LIQUIDITY OPPORTUNITY */}
          <section className="mb-6">
            <LiquidityOpportunity />
          </section>

          {/* QUICK ACTIONS */}
          <section className="mb-6">
            <ActionButtons />
          </section>

          {/* ACTIVITY */}
          <section>
            <Activity />
          </section>



<Footer />
        </div>

      </main>

    </div>
  );
}