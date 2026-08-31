
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiBookOpen,
  FiChevronDown,
  FiChevronRight,
  FiCode,
  FiCpu,
  FiDatabase,
  FiExternalLink,
  FiGithub,
  FiLock,
  FiMenu,
  FiShield,
  FiX,
  FiZap,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "overview", label: "Protocol Overview" },
  { id: "how-it-works", label: "How MiniLend Works" },
  { id: "lending", label: "Lending" },
  { id: "borrowing", label: "Borrowing" },
  { id: "repaying", label: "Repaying" },
  { id: "withdrawals", label: "Withdrawals" },
  { id: "collateral", label: "Collateral" },
  { id: "architecture", label: "Architecture" },
  { id: "security", label: "Security" },
  { id: "risks", label: "Risks" },
  { id: "roadmap", label: "Roadmap" },
  { id: "faq", label: "FAQ" },
];

const faqItems = [
  {
    question: "What is MiniLend?",
    answer:
      "MiniLend is a decentralized lending protocol designed to allow users to supply digital assets, earn lending returns, and access liquidity through collateralized borrowing.",
  },
  {
    question: "How does borrowing work?",
    answer:
      "A borrower supplies supported collateral and can then borrow available liquidity according to the protocol's collateral and risk parameters. The borrowed position must be repaid before the collateral can be fully withdrawn.",
  },
  {
    question: "What happens when I repay?",
    answer:
      "When a borrower repays a position, the outstanding borrowed amount and applicable interest are reduced. Once the debt is fully cleared, eligible collateral can be withdrawn.",
  },
  {
    question: "Can I withdraw my supplied assets?",
    answer:
      "Yes. Supplied assets can generally be withdrawn when they are not being used to support an outstanding borrowing position and sufficient protocol liquidity is available.",
  },
  {
    question: "What is collateral?",
    answer:
      "Collateral is an asset deposited by a borrower to secure a loan. If the value of the collateral becomes insufficient relative to the outstanding debt, the position may become subject to liquidation according to protocol rules.",
  },
  {
    question: "Is MiniLend custodial?",
    answer:
      "MiniLend is designed around smart-contract-based interactions. Users retain control of their wallets and approve transactions rather than depositing assets with a traditional centralized custodian.",
  },
];

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#6DD054]">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-[#6DD054]/30 hover:bg-white/[0.05]">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#6DD054]/20 bg-[#6DD054]/10 text-[#6DD054]">
        <Icon size={21} />
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>

      <div className="mt-3 text-sm leading-6 text-zinc-400">
        {children}
      </div>
    </div>
  );
}

function Step({ number, title, children }) {
  return (
    <div className="relative flex gap-5">
      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#6DD054]/30 bg-[#0b0d0b] text-sm font-bold text-[#6DD054]">
        {number}
      </div>

      <div className="pb-8">
        <h3 className="text-base font-semibold text-white">{title}</h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {children}
        </p>
      </div>
    </div>
  );
}

export default function Documentation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const [openFaq, setOpenFaq] = useState(null);

  // ============================================================
  // TRACK CURRENT DOCUMENTATION SECTION
  // ============================================================

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      let currentSection = "introduction";

      sections.forEach((section) => {
        const element = document.getElementById(section.id);

        if (element && element.offsetTop <= scrollPosition) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ============================================================
  // SCROLL TO SECTION
  // ============================================================

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setActiveSection(id);
      setMobileOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070807] text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#6DD054]/[0.04] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

      </div>

      {/* =====================================================
          TOP NAVBAR
      ====================================================== */}

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#070807]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 lg:px-8">

          {/* BRAND */}

          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => window.scrollTo(0, 0)}
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#6DD054]/20 bg-[#6DD054]/10">
              <span className="text-sm font-black text-[#6DD054]">
                M
              </span>
            </div>

            <div>

              <p className="text-sm font-bold tracking-wide text-white">
                Mini<span className="text-[#6DD054]">Lend</span>
              </p>

              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                Documentation
              </p>

            </div>

          </Link>

          {/* DESKTOP ACTIONS */}

          <div className="hidden items-center gap-3 md:flex">

            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
            >
              <FiArrowLeft size={15} />
              Back to MiniLend
            </Link>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[#6DD054] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#7ee565]"
            >
              GitHub
              <FiArrowUpRight size={15} />
            </a>

          </div>

          {/* MOBILE BUTTON */}

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-300 md:hidden"
            aria-label="Toggle documentation menu"
          >
            {mobileOpen ? (
              <FiX size={20} />
            ) : (
              <FiMenu size={20} />
            )}
          </button>

        </div>

        {/* MOBILE MENU */}

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#070807] px-5 py-5 md:hidden">

            <div className="space-y-1">

              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={`relative flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-[#6DD054]/10 text-[#6DD054]"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >

                  {/* MOBILE ACTIVE INDICATOR */}

                  <span
                    className={`absolute left-0 top-1/2 h-6 -translate-y-1/2 rounded-r-full bg-[#6DD054] transition-all duration-300 ${
                      activeSection === section.id
                        ? "w-1 opacity-100"
                        : "w-0 opacity-0"
                    }`}
                  />

                  <span>{section.label}</span>

                  <FiChevronRight
                    size={15}
                    className={`transition-all duration-300 ${
                      activeSection === section.id
                        ? "text-[#6DD054]"
                        : ""
                    }`}
                  />

                </button>
              ))}

            </div>

            <div className="mt-4 border-t border-white/10 pt-4">

              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-3 text-sm text-zinc-400"
                onClick={() => setMobileOpen(false)}
              >
                <FiArrowLeft size={15} />
                Back to MiniLend
              </Link>

            </div>

          </div>
        )}

      </header>

      {/* =====================================================
          MAIN DOCUMENTATION LAYOUT
      ====================================================== */}

      <div className="mx-auto flex max-w-[1500px] pt-16">

        {/* =================================================
            LEFT SIDEBAR
        ================================================== */}

        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[260px] shrink-0 overflow-y-auto border-r border-white/10 px-5 py-8 lg:block">

          <div className="mb-7">

            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6DD054]">

              <FiBookOpen size={14} />

              Documentation

            </div>

            <p className="text-xs leading-5 text-zinc-500">
              Learn how MiniLend works, from supplying assets to borrowing,
              repayment, security, and protocol architecture.
            </p>

          </div>

          {/* SIDEBAR NAVIGATION */}

          <nav className="space-y-1">

            {sections.map((section) => (

              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={`group relative flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-[#6DD054]/10 font-medium text-[#6DD054]"
                    : "text-zinc-500 hover:bg-white/[0.03] hover:text-white"
                }`}
              >

                {/* =================================================
                    ACTIVE GREEN INDICATOR
                ================================================== */}

                <span
                  className={`absolute left-0 top-1/2 h-6 -translate-y-1/2 rounded-r-full bg-[#6DD054] transition-all duration-300 ${
                    activeSection === section.id
                      ? "w-1 opacity-100"
                      : "w-0 opacity-0"
                  }`}
                />

                <span>{section.label}</span>

                <FiChevronRight
                  size={14}
                  className={`transition-all duration-300 ${
                    activeSection === section.id
                      ? "translate-x-0 text-[#6DD054] opacity-100"
                      : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                />

              </button>

            ))}

          </nav>

          {/* QUICK START */}

          <div className="mt-10 rounded-2xl border border-[#6DD054]/15 bg-[#6DD054]/[0.04] p-4">

            <div className="mb-3 flex items-center gap-2 text-[#6DD054]">

              <FiZap size={16} />

              <span className="text-xs font-semibold">
                Quick Start
              </span>

            </div>

            <p className="text-xs leading-5 text-zinc-500">
              Connect your wallet, supply collateral, and explore available
              liquidity through the MiniLend interface.
            </p>

            <Link
              to="/"
              className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#6DD054] hover:text-white"
            >
              Launch MiniLend
              <FiArrowUpRight size={13} />
            </Link>

          </div>

        </aside>

        {/* =====================================================
            DOCUMENT CONTENT
        ====================================================== */}

        <main className="min-w-0 flex-1 px-5 py-10 sm:px-8 lg:px-14 xl:px-20">

          <div className="mx-auto max-w-4xl">

            {/* =================================================
                INTRODUCTION
            ================================================== */}

            <section
              id="introduction"
              className="scroll-mt-24 pb-20"
            >

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#6DD054]/20 bg-[#6DD054]/10 px-3 py-1.5 text-xs font-medium text-[#6DD054]">

                <span className="h-1.5 w-1.5 rounded-full bg-[#6DD054]" />

                MiniLend Documentation

              </div>

              <h1 className="max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">

                Decentralized lending,

                <span className="block text-[#6DD054]">
                  made simple.
                </span>

              </h1>

              <p className="mt-7 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
                MiniLend is a decentralized lending experience designed to
                make crypto lending and borrowing easier to understand and
                interact with. Users can supply supported assets, access
                liquidity through collateralized borrowing, repay outstanding
                debt, and withdraw eligible assets through a non-custodial
                interface.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">

                <Link
                  to="/"
                  className="flex items-center gap-2 rounded-xl bg-[#6DD054] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#7ee565]"
                >
                  Launch MiniLend
                  <FiArrowUpRight size={16} />
                </Link>

                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:text-white"
                >
                  <FiGithub size={16} />
                  View Source
                </a>

              </div>

              <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <InfoCard icon={FiLock} title="Non-Custodial">
                  Users interact with the protocol through their own wallets
                  and approve blockchain transactions directly.
                </InfoCard>

                <InfoCard icon={FiZap} title="Permissionless">
                  Smart-contract-based lending can reduce dependence on
                  traditional financial intermediaries.
                </InfoCard>

                <InfoCard icon={FiShield} title="Transparent">
                  Protocol interactions are designed to be verifiable through
                  blockchain transactions and smart-contract state.
                </InfoCard>

              </div>

            </section>

            {/* =================================================
                OVERVIEW
            ================================================== */}

            <section
              id="overview"
              className="scroll-mt-24 border-t border-white/10 py-20"
            >

              <SectionTitle
                eyebrow="01 — Overview"
                title="Protocol Overview"
                description="MiniLend connects liquidity providers and borrowers through a decentralized lending model."
              />

              <div className="space-y-5 text-sm leading-7 text-zinc-400">

                <p>
                  Traditional lending generally requires a centralized
                  institution to hold assets, evaluate borrowers, manage loans,
                  and enforce repayment. Decentralized lending moves much of
                  this logic into blockchain-based smart contracts.
                </p>

                <p>
                  MiniLend follows this model by allowing users to interact
                  with lending markets through a web interface while the
                  underlying protocol logic is handled by smart contracts.
                </p>

                <p>
                  A lender can provide liquidity to a supported market. A
                  borrower can provide collateral and borrow against that
                  collateral when protocol conditions permit it.
                </p>

              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">

                <InfoCard icon={FiDatabase} title="Supply Liquidity">
                  Users deposit supported assets into the lending market and
                  become liquidity providers.
                </InfoCard>

                <InfoCard icon={FiCode} title="Borrow Liquidity">
                  Eligible users can borrow available assets against approved
                  collateral.
                </InfoCard>

              </div>

            </section>

            {/* =================================================
                HOW IT WORKS
            ================================================== */}

            <section
              id="how-it-works"
              className="scroll-mt-24 border-t border-white/10 py-20"
            >

              <SectionTitle
                eyebrow="02 — Core Flow"
                title="How MiniLend Works"
                description="The core lending cycle consists of supplying assets, borrowing against collateral, repaying debt, and withdrawing assets."
              />

              <div className="relative mt-10">

                <div className="absolute bottom-8 left-[18px] top-4 w-px bg-gradient-to-b from-[#6DD054]/40 via-white/10 to-transparent" />

                <Step number="1" title="Connect your wallet">
                  Connect a compatible wallet to the MiniLend interface. Your
                  wallet remains under your control.
                </Step>

                <Step number="2" title="Supply assets">
                  Deposit supported assets into a lending market to provide
                  liquidity.
                </Step>

                <Step number="3" title="Use collateral">
                  Eligible supplied assets can serve as collateral when
                  opening a borrowing position.
                </Step>

                <Step number="4" title="Borrow">
                  Borrow available liquidity while maintaining the required
                  collateralization level.
                </Step>

                <Step number="5" title="Repay">
                  Repay the borrowed amount and applicable interest to reduce
                  or close the debt position.
                </Step>

                <Step number="6" title="Withdraw">
                  Once conditions are satisfied, withdraw eligible supplied
                  assets from the protocol.
                </Step>

              </div>

            </section>

            {/* =================================================
                LENDING
            ================================================== */}

            <section
              id="lending"
              className="scroll-mt-24 border-t border-white/10 py-20"
            >

              <SectionTitle
                eyebrow="03 — Lending"
                title="Supplying Assets"
                description="Lending allows users to provide liquidity to the protocol."
              />

              <p className="text-sm leading-7 text-zinc-400">
                When a user supplies an asset, the protocol records the
                supplied position and makes the available liquidity accessible
                to eligible borrowers. The economic return for suppliers is
                determined by the market's lending conditions.
              </p>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                <h3 className="text-lg font-semibold text-white">
                  Supply flow
                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-4">

                  {[
                    "Connect wallet",
                    "Select asset",
                    "Enter amount",
                    "Confirm transaction",
                  ].map((item, index) => (

                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-black/20 p-4"
                    >

                      <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#6DD054]/10 text-xs font-bold text-[#6DD054]">
                        {index + 1}
                      </div>

                      <p className="text-sm font-medium text-white">
                        {item}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </section>

            {/* =================================================
                BORROWING
            ================================================== */}

            <section
              id="borrowing"
              className="scroll-mt-24 border-t border-white/10 py-20"
            >

              <SectionTitle
                eyebrow="04 — Borrowing"
                title="Borrowing Liquidity"
                description="Borrowers use collateral to access liquidity without immediately selling their underlying assets."
              />

              <p className="text-sm leading-7 text-zinc-400">
                Borrowing is collateralized. The amount a user can borrow
                depends on factors such as the value of the collateral,
                available market liquidity, protocol risk parameters, and the
                user's existing debt.
              </p>

              <div className="mt-10 grid gap-4 md:grid-cols-3">

                <InfoCard icon={FiShield} title="Collateral">
                  Borrowers must maintain sufficient collateral relative to
                  their outstanding debt.
                </InfoCard>

                <InfoCard icon={FiDatabase} title="Liquidity">
                  Borrowing is subject to available liquidity in the selected
                  market.
                </InfoCard>

                <InfoCard icon={FiZap} title="Interest">
                  Outstanding debt can accrue interest according to the
                  applicable market model.
                </InfoCard>

              </div>

              <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.04] p-6">

                <h3 className="text-sm font-semibold text-yellow-400">
                  Important
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Borrowers should monitor collateral value and debt
                  continuously. Market volatility can change the health of a
                  borrowing position.
                </p>

              </div>

            </section>

            {/* =================================================
                REPAYING
            ================================================== */}

            <section
              id="repaying"
              className="scroll-mt-24 border-t border-white/10 py-20"
            >

              <SectionTitle
                eyebrow="05 — Repayment"
                title="Repaying a Loan"
                description="Repayment reduces the borrower's outstanding debt and can restore access to locked collateral."
              />

              <p className="text-sm leading-7 text-zinc-400">
                A borrower can repay part or all of an outstanding borrowing
                position. A complete repayment closes the debt position once
                the protocol confirms that no outstanding amount remains.
              </p>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                <div className="grid gap-6 md:grid-cols-3">

                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-600">
                      Step 01
                    </p>

                    <p className="mt-2 font-semibold text-white">
                      Open position
                    </p>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      Review your current borrowed balance.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-600">
                      Step 02
                    </p>

                    <p className="mt-2 font-semibold text-white">
                      Choose amount
                    </p>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      Enter the amount you want to repay.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-600">
                      Step 03
                    </p>

                    <p className="mt-2 font-semibold text-white">
                      Confirm transaction
                    </p>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      Approve the transaction through your wallet.
                    </p>
                  </div>

                </div>

              </div>

            </section>

            {/* =================================================
                WITHDRAWALS
            ================================================== */}

            <section
              id="withdrawals"
              className="scroll-mt-24 border-t border-white/10 py-20"
            >

              <SectionTitle
                eyebrow="06 — Withdrawals"
                title="Withdrawing Assets"
                description="Withdraw supplied assets when your position meets the protocol's withdrawal requirements."
              />

              <p className="text-sm leading-7 text-zinc-400">
                Users may withdraw available supplied assets when doing so does
                not violate the requirements of an active borrowing position.
                If an asset is being used as collateral, the user may first
                need to reduce or close the associated debt.
              </p>

              <div className="mt-10 flex flex-col gap-4">

                {[
                  "Check your supplied balance.",
                  "Confirm that the amount is available for withdrawal.",
                  "If necessary, repay outstanding debt.",
                  "Enter the withdrawal amount.",
                  "Confirm the blockchain transaction.",
                ].map((item, index) => (

                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4"
                  >

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#6DD054]/10 text-xs font-bold text-[#6DD054]">
                      {index + 1}
                    </div>

                    <p className="text-sm text-zinc-300">
                      {item}
                    </p>

                  </div>

                ))}

              </div>

            </section>

            {/* =================================================
                COLLATERAL
            ================================================== */}

            <section
              id="collateral"
              className="scroll-mt-24 border-t border-white/10 py-20"
            >

              <SectionTitle
                eyebrow="07 — Risk Engine"
                title="Collateral & Health"
                description="Collateral protects the lending market by ensuring that borrowed liquidity is backed by sufficient assets."
              />

              <p className="text-sm leading-7 text-zinc-400">
                When borrowing against collateral, users need to maintain a
                sufficient collateral value. If market prices move against a
                borrower, the value of collateral can fall relative to debt.
              </p>

              <div className="mt-10 rounded-2xl border border-[#6DD054]/20 bg-[#6DD054]/[0.035] p-6">

                <h3 className="text-lg font-semibold text-white">
                  Simplified collateral model
                </h3>

                <div className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-black/20 p-5">

                  <code className="whitespace-nowrap text-sm text-[#6DD054]">
                    Borrow Capacity = Collateral Value × Loan-to-Value Ratio
                  </code>

                </div>

                <p className="mt-5 text-sm leading-6 text-zinc-500">
                  Actual protocol parameters should always be taken from the
                  deployed market configuration rather than assumed from this
                  documentation.
                </p>

              </div>

            </section>

            {/* =================================================
                ARCHITECTURE
            ================================================== */}

            <section
              id="architecture"
              className="scroll-mt-24 border-t border-white/10 py-20"
            >

              <SectionTitle
                eyebrow="08 — Technology"
                title="Protocol Architecture"
                description="MiniLend separates the user interface from the blockchain protocol layer."
              />

              <div className="grid gap-4">

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6DD054]/10 text-[#6DD054]">
                      <FiCpu size={21} />
                    </div>

                    <div>

                      <h3 className="font-semibold text-white">
                        Application Layer
                      </h3>

                      <p className="text-sm text-zinc-500">
                        React-based MiniLend interface
                      </p>

                    </div>

                  </div>

                  <p className="mt-5 text-sm leading-6 text-zinc-400">
                    Provides navigation, market information, wallet
                    interactions, transaction controls, dashboards, and
                    documentation.
                  </p>

                </div>

                <div className="mx-auto text-zinc-700">
                  <FiChevronDown size={20} />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6DD054]/10 text-[#6DD054]">
                      <FiCode size={21} />
                    </div>

                    <div>

                      <h3 className="font-semibold text-white">
                        Protocol Layer
                      </h3>

                      <p className="text-sm text-zinc-500">
                        Smart contracts and lending logic
                      </p>

                    </div>

                  </div>

                  <p className="mt-5 text-sm leading-6 text-zinc-400">
                    Handles lending markets, collateralized borrowing,
                    repayments, withdrawals, balances, and other protocol
                    operations.
                  </p>

                </div>

                <div className="mx-auto text-zinc-700">
                  <FiChevronDown size={20} />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6DD054]/10 text-[#6DD054]">
                      <FiDatabase size={21} />
                    </div>

                    <div>

                      <h3 className="font-semibold text-white">
                        Blockchain Layer
                      </h3>

                      <p className="text-sm text-zinc-500">
                        On-chain state and transactions
                      </p>

                    </div>

                  </div>

                  <p className="mt-5 text-sm leading-6 text-zinc-400">
                    Transactions are submitted to the configured blockchain
                    network and confirmed through the network's consensus
                    mechanism.
                  </p>

                </div>

              </div>

            </section>

            {/* =================================================
                SECURITY
            ================================================== */}

            <section
              id="security"
              className="scroll-mt-24 border-t border-white/10 py-20"
            >

              <SectionTitle
                eyebrow="09 — Security"
                title="Security Principles"
                description="Security is a core part of a decentralized financial application."
              />

              <div className="grid gap-4 md:grid-cols-2">

                <InfoCard icon={FiLock} title="Wallet Ownership">
                  Users connect their own wallets and approve transactions
                  directly rather than handing over private keys.
                </InfoCard>

                <InfoCard icon={FiShield} title="On-Chain Verification">
                  Blockchain transactions provide a verifiable record of
                  protocol interactions.
                </InfoCard>

                <InfoCard icon={FiCode} title="Smart Contract Logic">
                  Core financial rules are executed by deployed smart
                  contracts rather than relying entirely on a centralized
                  backend.
                </InfoCard>

                <InfoCard icon={FiZap} title="Transaction Confirmation">
                  Wallet approval is required before a user transaction can be
                  submitted to the network.
                </InfoCard>

              </div>

              <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/[0.035] p-6">

                <h3 className="text-sm font-semibold text-red-400">
                  Security disclaimer
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  No blockchain protocol can guarantee that it is completely
                  free from vulnerabilities. Users should independently
                  evaluate smart-contract risk, wallet security, market
                  conditions, and transaction details before interacting with
                  the protocol.
                </p>

              </div>

            </section>

            {/* =================================================
                RISKS
            ================================================== */}

            <section
              id="risks"
              className="scroll-mt-24 border-t border-white/10 py-20"
            >

              <SectionTitle
                eyebrow="10 — Risk"
                title="Understanding the Risks"
                description="Decentralized lending introduces financial and technical risks that users should understand before participating."
              />

              <div className="space-y-4">

                {[
                  {
                    title: "Market Risk",
                    text: "Digital asset prices can change rapidly. A fall in collateral value can negatively affect a borrowing position.",
                  },
                  {
                    title: "Liquidation Risk",
                    text: "If a position no longer satisfies collateral requirements, it may become eligible for liquidation under the protocol's rules.",
                  },
                  {
                    title: "Smart Contract Risk",
                    text: "Software vulnerabilities, incorrect configuration, or unexpected contract behavior can result in financial loss.",
                  },
                  {
                    title: "Liquidity Risk",
                    text: "A market may not always have enough available liquidity for an immediate withdrawal or borrowing request.",
                  },
                  {
                    title: "Network Risk",
                    text: "Blockchain congestion, transaction failures, or network interruptions can affect user interactions.",
                  },
                ].map((risk) => (

                  <div
                    key={risk.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"
                  >

                    <h3 className="font-semibold text-white">
                      {risk.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {risk.text}
                    </p>

                  </div>

                ))}

              </div>

            </section>

            {/* =================================================
                ROADMAP
            ================================================== */}

            <section
              id="roadmap"
              className="scroll-mt-24 border-t border-white/10 py-20"
            >

              <SectionTitle
                eyebrow="11 — Roadmap"
                title="Roadmap"
                description="The MiniLend roadmap focuses on improving the lending experience, protocol capabilities, and ecosystem."
              />

              <div className="relative">

                <div className="absolute bottom-0 left-4 top-0 w-px bg-white/10" />

                <div className="space-y-8">

                  {[
                    {
                      phase: "Phase 01",
                      title: "Foundation",
                      items: [
                        "Core MiniLend interface",
                        "Wallet connection",
                        "Landing page",
                        "Documentation",
                      ],
                    },
                    {
                      phase: "Phase 02",
                      title: "Lending Markets",
                      items: [
                        "Asset supply",
                        "Borrowing interface",
                        "Repayment flows",
                        "Withdrawal flows",
                      ],
                    },
                    {
                      phase: "Phase 03",
                      title: "Risk & Security",
                      items: [
                        "Improved risk monitoring",
                        "Transaction safety improvements",
                        "Protocol testing",
                        "Security reviews",
                      ],
                    },
                    {
                      phase: "Phase 04",
                      title: "Ecosystem",
                      items: [
                        "Additional supported assets",
                        "Advanced analytics",
                        "Developer integrations",
                        "Community governance",
                      ],
                    },
                  ].map((phase) => (

                    <div
                      key={phase.phase}
                      className="relative pl-12"
                    >

                      <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-[#6DD054]/30 bg-[#070807] text-[#6DD054]">

                        <span className="h-2 w-2 rounded-full bg-[#6DD054]" />

                      </div>

                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6DD054]">
                        {phase.phase}
                      </p>

                      <h3 className="mt-2 text-xl font-bold text-white">
                        {phase.title}
                      </h3>

                      <div className="mt-4 grid gap-2 sm:grid-cols-2">

                        {phase.items.map((item) => (

                          <div
                            key={item}
                            className="flex items-center gap-2 text-sm text-zinc-400"
                          >

                            <span className="h-1.5 w-1.5 rounded-full bg-[#6DD054]" />

                            {item}

                          </div>

                        ))}

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </section>

            {/* =================================================
                FAQ
            ================================================== */}

            <section
              id="faq"
              className="scroll-mt-24 border-t border-white/10 py-20"
            >

              <SectionTitle
                eyebrow="12 — FAQ"
                title="Frequently Asked Questions"
                description="Common questions about MiniLend and decentralized lending."
              />

              <div className="space-y-3">

                {faqItems.map((item, index) => {

                  const isOpen = openFaq === index;

                  return (

                    <div
                      key={item.question}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"
                    >

                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaq(isOpen ? null : index)
                        }
                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                      >

                        <span className="text-sm font-semibold text-white">
                          {item.question}
                        </span>

                        <FiChevronDown
                          size={18}
                          className={`shrink-0 text-zinc-500 transition ${
                            isOpen
                              ? "rotate-180 text-[#6DD054]"
                              : ""
                          }`}
                        />

                      </button>

                      {isOpen && (

                        <div className="border-t border-white/10 px-5 py-5">

                          <p className="text-sm leading-6 text-zinc-400">
                            {item.answer}
                          </p>

                        </div>

                      )}

                    </div>

                  );

                })}

              </div>

            </section>

            {/* =================================================
                FINAL CTA
            ================================================== */}

            <section className="border-t border-white/10 py-20">

              <div className="overflow-hidden rounded-3xl border border-[#6DD054]/20 bg-[#6DD054]/[0.05] p-7 sm:p-10">

                <div className="max-w-2xl">

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6DD054]/10 text-[#6DD054]">
                    <FiBookOpen size={22} />
                  </div>

                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    Ready to explore MiniLend?
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-zinc-400">
                    Return to the MiniLend application and explore the lending
                    experience.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">

                    <Link
                      to="/"
                      className="flex items-center gap-2 rounded-xl bg-[#6DD054] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#7ee565]"
                    >
                      Launch MiniLend
                      <FiArrowUpRight size={16} />
                    </Link>

                    <a
                      href="https://github.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
                    >
                      <FiGithub size={16} />
                      GitHub
                      <FiExternalLink size={14} />
                    </a>

                  </div>

                </div>

              </div>

            </section>

            {/* =================================================
                FOOTER
            ================================================== */}

            <footer className="border-t border-white/10 py-8">

              <div className="flex flex-col gap-4 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">

                <p>
                  © {new Date().getFullYear()} MiniLend. Documentation.
                </p>

                <div className="flex items-center gap-5">

                  <Link
                    to="/"
                    className="transition hover:text-zinc-300"
                  >
                    Home
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      scrollToSection("introduction")
                    }
                    className="transition hover:text-zinc-300"
                  >
                    Back to top
                  </button>

                </div>

              </div>

            </footer>

          </div>

        </main>

      </div>

    </div>
  );
}

