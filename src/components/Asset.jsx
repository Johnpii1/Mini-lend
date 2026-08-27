import { useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiLock,
  FiTrendingUp,
  FiLayers,
  FiShield,
} from "react-icons/fi";

import ConnectWalletModal from "./ConnectWalletModal";

export default function Assets() {
  const [modalOpen, setModalOpen] = useState(false);

  const assets = [
    {
      name: "Ethereum",
      symbol: "ETH",
      network: "Ethereum",
      description:
        "Use ETH as collateral to access stablecoin liquidity without selling your position.",
      icon: "Ξ",
      status: "Supported",
    },
    {
      name: "Wrapped Ether",
      symbol: "WETH",
      network: "Ethereum",
      description:
        "Wrapped Ether can be supplied as collateral for decentralized borrowing.",
      icon: "W",
      status: "Supported",
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      network: "Ethereum",
      description:
        "A stable digital asset designed for predictable value and liquidity.",
      icon: "$",
      status: "Supported",
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      network: "Base",
      description:
        "Access stablecoin liquidity across the Base network through MiniLend.",
      icon: "$",
      status: "Supported",
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-[#080908] text-white overflow-hidden pt-32 pb-24">
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* HERO */}
          <section className="text-center max-w-3xl mx-auto">

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#6DD054]/20
                bg-[#6DD054]/[0.05]
                px-4
                py-2
                text-xs
                font-medium
                text-[#6DD054]
              "
            >
              <FiLayers />
              Supported Assets
            </div>

            <h1
              className="
                logo
                mt-6
                text-4xl
                sm:text-5xl
                md:text-6xl
                font-bold
                tracking-tight
                leading-tight
              "
            >
              Assets built for
              <span className="text-[#6DD054]">
                {" "}liquidity.
              </span>
            </h1>

            <p
              className="
                logo
                mt-6
                text-sm
                sm:text-base
                leading-7
                sm:leading-8
                text-white/50
                max-w-2xl
                mx-auto
              "
            >
              MiniLend supports selected digital assets that can be used
              as collateral to access stablecoin liquidity while keeping
              control of your underlying position.
            </p>
          </section>

          {/* QUICK STATS */}
          <section className="mt-16">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-[#6DD054]/10 border border-[#6DD054]/15 flex items-center justify-center">
                    <FiLayers className="text-[#6DD054]" />
                  </div>

                  <div>
                    <p className="text-xs text-white/40">
                      Networks
                    </p>

                    <p className="text-lg font-semibold text-white">
                      Ethereum & Base
                    </p>
                  </div>

                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-[#6DD054]/10 border border-[#6DD054]/15 flex items-center justify-center">
                    <FiTrendingUp className="text-[#6DD054]" />
                  </div>

                  <div>
                    <p className="text-xs text-white/40">
                      Supported Assets
                    </p>

                    <p className="text-lg font-semibold text-white">
                      4 Assets
                    </p>
                  </div>

                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-[#6DD054]/10 border border-[#6DD054]/15 flex items-center justify-center">
                    <FiShield className="text-[#6DD054]" />
                  </div>

                  <div>
                    <p className="text-xs text-white/40">
                      Asset Role
                    </p>

                    <p className="text-lg font-semibold text-white">
                      Collateral
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* ASSETS */}
          <section className="mt-24">

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">

              <div>
                <p className="logo text-[#6DD054] text-xs uppercase tracking-[0.2em]">
                  Available Assets
                </p>

                <h2 className="logo mt-3 text-3xl md:text-4xl font-semibold">
                  Supported digital assets
                </h2>
              </div>

              <p className="logo text-sm text-white/40 max-w-md leading-6">
                These assets are currently configured for the MiniLend
                lending experience.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {assets.map((asset) => (
                <div
                  key={`${asset.symbol}-${asset.network}`}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/[0.08]
                    bg-white/[0.02]
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#6DD054]/25
                    hover:bg-white/[0.035]
                  "
                >

                  <div className="flex items-start justify-between">

                    <div className="flex items-center gap-4">

                      <div
                        className="
                          w-14
                          h-14
                          rounded-2xl
                          border
                          border-white/10
                          bg-white/[0.04]
                          flex
                          items-center
                          justify-center
                          text-xl
                          font-bold
                          text-[#6DD054]
                        "
                      >
                        {asset.icon}
                      </div>

                      <div>
                        <h3 className="logo text-lg font-semibold text-white">
                          {asset.name}
                        </h3>

                        <p className="logo mt-1 text-xs text-white/40">
                          {asset.symbol}
                        </p>
                      </div>

                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-[#6DD054]/15
                        bg-[#6DD054]/[0.05]
                        px-3
                        py-1.5
                      "
                    >
                      <FiCheckCircle className="text-[#6DD054] text-xs" />

                      <span className="text-[10px] font-medium text-[#6DD054]">
                        {asset.status}
                      </span>
                    </div>

                  </div>

                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-white/[0.06]
                      bg-black/10
                      px-4
                      py-3
                    "
                  >
                    <span className="text-xs text-white/40">
                      Network
                    </span>

                    <span className="text-xs font-medium text-white/70">
                      {asset.network}
                    </span>
                  </div>

                  <p className="logo mt-5 text-sm leading-6 text-white/40">
                    {asset.description}
                  </p>

                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      justify-between
                      border-t
                      border-white/[0.06]
                      pt-5
                    "
                  >
                    <div className="flex items-center gap-2">
                      <FiLock className="text-sm text-[#6DD054]" />

                      <span className="text-xs text-white/45">
                        Available as collateral
                      </span>
                    </div>

                    <FiArrowRight
                      className="
                        text-white/25
                        transition-all
                        duration-300
                        group-hover:text-[#6DD054]
                        group-hover:translate-x-1
                      "
                    />
                  </div>

                  <div
                    className="
                      absolute
                      bottom-0
                      left-6
                      right-6
                      h-px
                      origin-left
                      scale-x-0
                      bg-[#6DD054]
                      transition-transform
                      duration-300
                      group-hover:scale-x-100
                    "
                  />

                </div>
              ))}

            </div>
          </section>

          {/* HOW COLLATERAL WORKS */}
          <section className="mt-24">

            <div
              className="
                rounded-3xl
                border
                border-white/[0.08]
                bg-white/[0.02]
                p-7
                sm:p-10
                lg:p-12
              "
            >

              <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">

                <div>
                  <p className="logo text-[#6DD054] text-xs uppercase tracking-[0.2em]">
                    How It Works
                  </p>

                  <h2 className="logo mt-4 text-3xl md:text-4xl font-semibold leading-tight">
                    Turn your assets into
                    <span className="text-[#6DD054]">
                      {" "}liquidity.
                    </span>
                  </h2>

                  <p className="logo mt-5 text-sm leading-7 text-white/40 max-w-md">
                    Deposit a supported asset, use it as collateral,
                    access stablecoin liquidity, and repay your position
                    when you're ready.
                  </p>
                </div>

                <div className="grid sm:grid-cols-4 gap-3">

                  {[
                    ["01", "Deposit"],
                    ["02", "Collateral"],
                    ["03", "Borrow"],
                    ["04", "Repay"],
                  ].map(([number, title]) => (
                    <div
                      key={number}
                      className="
                        rounded-2xl
                        border
                        border-white/[0.07]
                        bg-black/10
                        p-5
                      "
                    >
                      <span className="text-xs font-bold text-[#6DD054]">
                        {number}
                      </span>

                      <h3 className="logo mt-8 text-sm font-semibold text-white">
                        {title}
                      </h3>
                    </div>
                  ))}

                </div>

              </div>

            </div>
          </section>

          {/* RISK NOTICE */}
          <section className="mt-8">

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-4
                items-start
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.015]
                p-5
              "
            >

              <div
                className="
                  w-10
                  h-10
                  shrink-0
                  rounded-xl
                  bg-[#6DD054]/10
                  border
                  border-[#6DD054]/15
                  flex
                  items-center
                  justify-center
                "
              >
                <FiShield className="text-[#6DD054]" />
              </div>

              <div>
                <h3 className="logo text-sm font-semibold text-white">
                  Important
                </h3>

                <p className="logo mt-1 text-xs leading-6 text-white/40">
                  Supported assets, collateral requirements, borrowing
                  limits, and availability may change. Always review
                  the current terms of your position before depositing
                  or borrowing.
                </p>
              </div>

            </div>
          </section>

          {/* CTA */}
          <section className="mt-20 text-center">

            <p className="logo text-[#6DD054] text-xs uppercase tracking-[0.2em]">
              Ready to get started?
            </p>

            <h2 className="logo mt-4 text-3xl md:text-4xl font-semibold">
              Put your assets to work.
            </h2>

            <p className="logo mt-4 text-sm text-white/40">
              Connect your wallet and explore MiniLend.
            </p>

            <div className="flex justify-center">

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="
                  logo
                  mt-8
                  flex
                  items-center
                  gap-3
                  rounded-[14px]
                  border
                  border-[#6DD054]/50
                  px-8
                  h-[44px]
                  text-xs
                  font-medium
                  text-[#6DD054]
                  transition-all
                  duration-300
                  hover:bg-[#6DD054]
                  hover:text-black
                  hover:-translate-y-0.5
                "
              >
                CONNECT WALLET

                <FiArrowRight className="text-sm" />
              </button>

            </div>

          </section>

        </div>
      </main>

      {/* REUSABLE WALLET MODAL */}
      <ConnectWalletModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}