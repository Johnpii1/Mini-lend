import { useState } from "react";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiShield,
  FiTrendingUp,
  FiLock,
  FiX,
} from "react-icons/fi";

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative min-h-screen overflow-hidden bg-[#080908] text-white">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[25%] h-[320px] w-[320px] rounded-full bg-[#6DD054]/10 blur-[120px]" />
          <div className="absolute right-[5%] top-[18%] h-[400px] w-[400px] rounded-full bg-[#6DD054]/[0.07] blur-[140px]" />
        </div>

        {/* Subtle grid */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.035]
            bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
            bg-[size:55px_55px]
          "
        />

        {/* Main hero */}
        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-screen
            max-w-7xl
            items-center
            px-5
            pb-20
            pt-32
            sm:px-8
            lg:px-10
          "
        >
          <div
            className="
              grid
              w-full
              items-center
              gap-14
              lg:grid-cols-[1fr_0.9fr]
              lg:gap-16
          "
          >
            {/* =================================================
                LEFT CONTENT
            ================================================== */}
            <div className="max-w-2xl">
              {/* Status badge */}
              <div
                className="
                  mb-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#6DD054]/20
                  bg-[#6DD054]/[0.06]
                  px-3.5
                  py-2
                  text-xs
                  font-medium
                  text-white/65
                "
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6DD054] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6DD054]" />
                </span>

                Decentralized Lending Protocol
              </div>

              {/* Heading */}
              <h1
                className="
                  text-4xl
                  font-black
                  leading-[1.05]
                  tracking-[-0.04em]
                  sm:text-5xl
                  md:text-6xl
                  lg:text-[68px]
                "
              >
                Unlock liquidity
                <span className="block text-[#6DD054]">
                  without selling.
                </span>
              </h1>

              {/* Description */}
              <p
                className="
                  mt-7
                  max-w-xl
                  text-sm
                  leading-7
                  text-white/50
                  sm:text-base
                  sm:leading-8
                "
              >
                MiniLend lets you stake your digital assets, borrow stablecoins,
                and keep your staking rewards. No credit checks. No middlemen.
                Just decentralized access to liquidity.
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="
                    group
                    flex
                    h-12
                    items-center
                    justify-center
                    gap-2.5
                    rounded-xl
                    bg-[#6DD054]
                    px-6
                    text-sm
                    font-bold
                    text-[#0b1609]
                    shadow-[0_10px_35px_rgba(109,208,84,0.16)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#7ae360]
                    hover:shadow-[0_14px_40px_rgba(109,208,84,0.25)]
                    active:scale-[0.98]
                  "
                >
                  Get Started

                  <FiArrowRight
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </button>

                <a
                  href="#how-it-works"
                  className="
                    group
                    flex
                    h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    px-6
                    text-sm
                    font-semibold
                    text-white/70
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  Learn More

                  <FiArrowUpRight
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </a>
              </div>

              {/* Trust points */}
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <FiShield className="text-[#6DD054]" />
                  Non-custodial
                </div>

                <div className="flex items-center gap-2 text-xs text-white/40">
                  <FiLock className="text-[#6DD054]" />
                  Secure lending
                </div>

                <div className="flex items-center gap-2 text-xs text-white/40">
                  <FiTrendingUp className="text-[#6DD054]" />
                  Keep staking rewards
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT PRODUCT VISUAL
            ================================================== */}
            <div className="relative mx-auto w-full max-w-[520px]">
              {/* Outer glow */}
              <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6DD054]/10 blur-[100px]" />

              {/* Main card */}
              <div
                className="
                  relative
                  rounded-[28px]
                  border
                  border-white/10
                  bg-[#101210]/90
                  p-4
                  shadow-[0_30px_100px_rgba(0,0,0,0.5)]
                  backdrop-blur-xl
                  sm:p-5
                "
              >
                {/* Card top */}
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                      MiniLend
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      Lending Position
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-[#6DD054]/15 bg-[#6DD054]/[0.06] px-2.5 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6DD054]" />
                    <span className="text-[10px] font-medium text-[#6DD054]">
                      Active
                    </span>
                  </div>
                </div>

                {/* Balance */}
                <div className="py-7">
                  <p className="text-xs text-white/35">
                    Available liquidity
                  </p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                      2,450
                    </span>

                    <span className="mb-1 text-sm font-semibold text-[#6DD054]">
                      USDT
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-white/30">
                    Borrow against your staked assets
                  </p>
                </div>

                {/* Collateral / loan */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Collateral */}
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/35">
                        Collateral
                      </span>

                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#627EEA]/10 text-xs font-bold text-[#627EEA]">
                        Ξ
                      </span>
                    </div>

                    <p className="mt-4 text-lg font-bold text-white">
                      1.25 ETH
                    </p>

                    <p className="mt-1 text-[10px] text-white/30">
                      Staked asset
                    </p>
                  </div>

                  {/* Borrowed */}
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/35">
                        Borrowed
                      </span>

                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#6DD054]/10 text-[10px] font-bold text-[#6DD054]">
                        $
                      </span>
                    </div>

                    <p className="mt-4 text-lg font-bold text-white">
                      2,450 USDT
                    </p>

                    <p className="mt-1 text-[10px] text-white/30">
                      Stablecoin loan
                    </p>
                  </div>
                </div>

                {/* Health bar */}
                <div className="mt-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">
                      Position health
                    </span>

                    <span className="text-xs font-semibold text-[#6DD054]">
                      Healthy
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                    <div className="h-full w-[78%] rounded-full bg-[#6DD054]" />
                  </div>

                  <div className="mt-2 flex justify-between text-[9px] text-white/25">
                    <span>Safe</span>
                    <span>Liquidation</span>
                  </div>
                </div>

                {/* Bottom action */}
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#6DD054]/[0.06] px-4 py-3">
                  <div>
                    <p className="text-[10px] text-white/30">
                      Staking rewards
                    </p>

                    <p className="mt-0.5 text-xs font-semibold text-[#6DD054]">
                      Continuing to accrue
                    </p>
                  </div>

                  <FiTrendingUp className="text-[#6DD054]" />
                </div>
              </div>

              {/* Floating card */}
              <div
                className="
                  absolute
                  -bottom-6
                  -left-4
                  hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#151715]/95
                  px-4
                  py-3
                  shadow-[0_20px_50px_rgba(0,0,0,0.4)]
                  backdrop-blur-xl
                  sm:block
                "
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6DD054]/10">
                    <FiShield className="text-[#6DD054]" />
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-white/25">
                      Protocol
                    </p>

                    <p className="text-xs font-semibold text-white">
                      Non-custodial
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating status */}
              <div
                className="
                  absolute
                  -right-3
                  -top-5
                  hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#151715]/95
                  px-4
                  py-3
                  shadow-[0_20px_50px_rgba(0,0,0,0.4)]
                  backdrop-blur-xl
                  sm:block
                "
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#6DD054]" />

                  <span className="text-xs font-medium text-white/60">
                    Lending live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080908] to-transparent" />
      </section>

      {/* =====================================================
          CONNECT WALLET MODAL
      ====================================================== */}
      {modalOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/70
            px-4
            backdrop-blur-md
          "
          onClick={() => setModalOpen(false)}
        >
          <div
            className="
              relative
              w-full
              max-w-md
              rounded-3xl
              border
              border-white/10
              bg-[#111311]
              p-6
              shadow-[0_30px_100px_rgba(0,0,0,0.6)]
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="
                absolute
                right-4
                top-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                text-white/40
                transition
                hover:border-white/20
                hover:bg-white/[0.04]
                hover:text-white
              "
            >
              <FiX />
            </button>

            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6DD054]/10">
              <FiShield className="text-2xl text-[#6DD054]" />
            </div>

            <h2 className="mt-5 text-center text-xl font-bold text-white">
              Connect Your Wallet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-white/40">
              Connect your wallet to start staking assets and access
              stablecoin loans through MiniLend.
            </p>

            <button
              type="button"
              id="connectWalletBtn"
              className="
                mt-6
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#6DD054]
                text-sm
                font-bold
                text-[#0b1609]
                transition
                hover:bg-[#7ae360]
                active:scale-[0.98]
              "
            >
              Connect Wallet
              <FiArrowUpRight />
            </button>

            <p className="mt-4 text-center text-[10px] leading-5 text-white/25">
              By connecting, you agree to our{" "}
              <a
                href="#"
                className="text-white/50 underline underline-offset-2"
              >
                Terms of Use
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-white/50 underline underline-offset-2"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
}