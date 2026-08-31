
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import DashboardHeader from "./DashboardHeader";
import PositionOverview from "../components/PositionOverview";
import CollateralCard from "../components/CollateralCard";
import DebtCard from "../components/DebtCard";
import HealthCard from "../components/HealthCard";
import LiquidityOpportunity from "../components/LiquidityOpportunity";
import ActionButtons from "../components/ActionButtons";
import Activity from "../components/Activity";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* =====================================================
          MAIN
      ====================================================== */}
      <main className="min-h-screen lg:ml-64">

        {/* ===================================================
            HEADER
        ==================================================== */}
        <DashboardHeader
          onMenuClick={() => setMobileOpen(true)}
        />

        {/* ===================================================
            CONTENT
        ==================================================== */}
        <div className="p-5 sm:p-6 lg:p-8">

          {/* =================================================
              PAGE INTRO
          ================================================== */}
          <section className="mb-8">
            <p className="text-xs font-medium uppercase tracking-wider text-[#6DD054] sm:text-sm">
              Overview
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Your Position
            </h1>

            <p className="mt-2 max-w-xl text-sm text-white/40">
              Monitor your collateral, borrowing position and
              overall lending health.
            </p>
          </section>

          {/* =================================================
              POSITION OVERVIEW
          ================================================== */}
          <section className="mb-6">
            <PositionOverview />
          </section>

          {/* =================================================
              FINANCIAL CARDS
          ================================================== */}
          <section className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <CollateralCard />
            <DebtCard />
            <HealthCard />
          </section>

          {/* =================================================
              LIQUIDITY OPPORTUNITY
          ================================================== */}
          <section className="mb-6">
            <LiquidityOpportunity />
          </section>

          {/* =================================================
              QUICK ACTIONS
          ================================================== */}
          <section className="mb-6">
            <ActionButtons />
          </section>

          {/* =================================================
              ACTIVITY
          ================================================== */}
          <section className="mb-6">
            <Activity />
          </section>

          {/* =================================================
              FOOTER
          ================================================== */}
          <Footer />

        </div>

      </main>

    </div>
  );
}

