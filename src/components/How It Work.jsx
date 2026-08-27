import {
  FiArrowRight,
  FiCheckCircle,
  FiLock,
  FiTrendingUp,
  FiCreditCard,
  FiRotateCcw,
  FiDownload,
} from "react-icons/fi";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Stake Digital Assets",
      description:
        "Deposit your supported digital assets into MiniLend and use them as collateral while keeping your position secured.",
      icon: FiLock,
    },
    {
      number: "02",
      title: "Borrow Stablecoins",
      description:
        "Borrow stablecoins based on the value of your staked assets without selling your underlying position.",
      icon: FiCreditCard,
    },
    {
      number: "03",
      title: "Repay Your Loan",
      description:
        "Repay your borrowed stablecoins according to your loan position to unlock access to your collateral.",
      icon: FiRotateCcw,
    },
    {
      number: "04",
      title: "Withdraw Your Assets",
      description:
        "Once your loan is repaid, withdraw your staked assets and retain the rewards generated during the process.",
      icon: FiDownload,
    },
  ];

  return (
    <main
      id="how-it-works"
      className="
        min-h-screen
        bg-[#080908]
        text-white
        overflow-hidden
        pt-32
        pb-24
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-[#6DD054]/[0.07] blur-[120px]" />

        <div className="absolute right-[5%] top-[45%] h-[350px] w-[350px] rounded-full bg-[#6DD054]/[0.05] blur-[140px]" />
      </div>

      {/* =====================================================
          PAGE CONTAINER
      ====================================================== */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================== */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Small label */}
          <div
            className="
              mx-auto
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#6DD054]/20
              bg-[#6DD054]/[0.05]
              px-3.5
              py-2
              text-xs
              font-medium
              text-[#6DD054]
            "
          >
            <FiTrendingUp />

            Simple. Secure. Decentralized.
          </div>

          {/* Heading */}
          <h1
            className="
              text-4xl
              font-black
              tracking-[-0.04em]
              sm:text-5xl
              md:text-6xl
            "
          >
            How{" "}
            <span className="text-[#6DD054]">
              MiniLend
            </span>{" "}
            Works
          </h1>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-white/45
              sm:text-base
              sm:leading-8
            "
          >
            MiniLend makes decentralized borrowing simple. Stake your
            digital assets, access stablecoin liquidity, repay your loan,
            and withdraw your assets when you're ready.
          </p>
        </div>

        {/* =================================================
            PROCESS FLOW
        ================================================== */}
        <div className="relative mt-20">
          {/* Connecting line - desktop */}
          <div
            className="
              pointer-events-none
              absolute
              left-[12%]
              right-[12%]
              top-[58px]
              hidden
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#6DD054]/25
              to-transparent
              lg:block
            "
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="
                    group
                    relative
                    rounded-3xl
                    border
                    border-white/[0.08]
                    bg-[#111311]/90
                    p-6
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-[#6DD054]/25
                    hover:bg-[#141714]
                    hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                  "
                >
                  {/* Number */}
                  <div className="flex items-center justify-between">
                    <span
                      className="
                        text-xs
                        font-bold
                        tracking-[0.15em]
                        text-[#6DD054]/60
                      "
                    >
                      STEP {step.number}
                    </span>

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[#6DD054]/15
                        bg-[#6DD054]/[0.06]
                        transition-all
                        duration-300
                        group-hover:bg-[#6DD054]/10
                        group-hover:scale-105
                      "
                    >
                      <Icon className="text-lg text-[#6DD054]" />
                    </div>
                  </div>

                  {/* Step indicator */}
                  <div className="mt-7 flex h-12 w-12 items-center justify-center rounded-full border border-[#6DD054]/20 bg-[#6DD054]/[0.06]">
                    <span className="text-sm font-bold text-[#6DD054]">
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-lg font-bold text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-6 text-white/40">
                    {step.description}
                  </p>

                  {/* Hover accent */}
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
              );
            })}
          </div>
        </div>

        {/* =================================================
            SIMPLE FLOW
        ================================================== */}
        <section className="mt-24">
          <div
            className="
              rounded-3xl
              border
              border-white/[0.08]
              bg-[#101210]
              p-7
              sm:p-10
              lg:p-12
            "
          >
            <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              {/* Left */}
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#6DD054]">
                  The MiniLend Flow
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Liquidity without
                  <span className="block text-[#6DD054]">
                    giving up ownership.
                  </span>
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/40">
                  Your assets remain at the center of your position.
                  MiniLend gives you access to liquidity while your
                  collateral remains secured.
                </p>
              </div>

              {/* Right flow */}
              <div className="grid gap-3 sm:grid-cols-4">
                {[
                  {
                    label: "Stake",
                    icon: FiLock,
                  },
                  {
                    label: "Borrow",
                    icon: FiCreditCard,
                  },
                  {
                    label: "Repay",
                    icon: FiRotateCcw,
                  },
                  {
                    label: "Withdraw",
                    icon: FiDownload,
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center sm:flex-col sm:items-center"
                    >
                      <div
                        className="
                          flex
                          h-14
                          w-14
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-white/[0.08]
                          bg-white/[0.025]
                        "
                      >
                        <Icon className="text-lg text-[#6DD054]" />
                      </div>

                      <span className="ml-4 text-sm font-semibold text-white/70 sm:ml-0 sm:mt-3">
                        {item.label}
                      </span>

                      {index < 3 && (
                        <FiArrowRight
                          className="
                            ml-auto
                            mr-2
                            hidden
                            text-white/20
                            sm:ml-0
                            sm:mr-0
                            sm:mt-3
                            sm:block
                          "
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            BENEFITS
        ================================================== */}
        <section className="mt-20">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
              <FiLock className="text-xl text-[#6DD054]" />

              <h3 className="mt-5 font-semibold">
                Keep Your Assets
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/35">
                Access liquidity without immediately selling your
                underlying collateral.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
              <FiTrendingUp className="text-xl text-[#6DD054]" />

              <h3 className="mt-5 font-semibold">
                Keep Earning
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/35">
                Your staking position can continue generating rewards
                while you access liquidity.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
              <FiCheckCircle className="text-xl text-[#6DD054]" />

              <h3 className="mt-5 font-semibold">
                Simple Process
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/35">
                Stake, borrow, repay, and withdraw through a simple
                decentralized experience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}