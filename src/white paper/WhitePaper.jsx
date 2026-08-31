
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowUpRight,
  FiChevronDown,
  FiChevronRight,
  FiShield,
  FiLock,
  FiTrendingUp,
  FiLayers,
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiGithub,
  FiFileText,
} from "react-icons/fi";

export default function WhitePaper() {
  const [activeSection, setActiveSection] = useState("abstract");
  const [mobileOpen, setMobileOpen] = useState(false);

  const sections = [
    { id: "abstract", number: "01", title: "Abstract" },
    { id: "introduction", number: "02", title: "Introduction" },
    { id: "problem", number: "03", title: "The Problem" },
    { id: "solution", number: "04", title: "Our Solution" },
    { id: "how-it-works", number: "05", title: "How MiniLend Works" },
    { id: "collateral", number: "06", title: "Collateral" },
    { id: "borrowing", number: "07", title: "Borrowing & Repayment" },
    { id: "risk", number: "08", title: "Risk Management" },
    { id: "security", number: "09", title: "Security" },
    { id: "architecture", number: "10", title: "Protocol Architecture" },
    { id: "governance", number: "11", title: "Governance" },
    { id: "roadmap", number: "12", title: "Roadmap" },
    { id: "conclusion", number: "13", title: "Conclusion" },
  ];

  /* ============================================================
     ACTIVE SECTION
  ============================================================ */

  useEffect(() => {
    const handleScroll = () => {
      const offset = 150;
      let current = "abstract";

      sections.forEach((section) => {
        const element = document.getElementById(section.id);

        if (element) {
          const position = element.getBoundingClientRect().top;

          if (position <= offset) {
            current = section.id;
          }
        }
      });

      setActiveSection(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ============================================================
     SCROLL TO SECTION
  ============================================================ */

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setActiveSection(id);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#080908] text-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            bg-[linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)]
            bg-[size:50px_50px]
          "
        />

        {/* Green glow */}
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[500px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#6DD054]/[0.045]
            blur-[140px]
          "
        />
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-white/[0.07]
          bg-[#080908]/85
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            h-16
            max-w-7xl
            items-center
            justify-between
            px-5
            sm:px-8
            lg:px-10
          "
        >
          {/* LOGO */}

          <Link
            to="/"
            className="group flex items-center gap-2.5"
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                bg-[#6DD054]
                shadow-[0_0_25px_rgba(109,208,84,0.12)]
                transition
                duration-300
                group-hover:scale-105
              "
            >
              <img
                src="/favicon.png"
                alt="MiniLend"
                className="h-8 w-8 object-contain"
              />
            </div>

            <div className="leading-none">
              <span className="block text-xs font-bold tracking-[0.15em]">
                MINI
              </span>

              <span className="block text-xs font-bold tracking-[0.15em] text-[#6DD054]">
                LEND
              </span>
            </div>
          </Link>

          {/* CENTER TITLE */}

          <div className="hidden items-center gap-2 md:flex">
            <FiFileText className="text-[#6DD054]" />

            <span className="text-xs font-medium text-white/60">
              MiniLend White Paper
            </span>

            <span
              className="
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-2
                py-0.5
                text-[9px]
                text-white/35
              "
            >
              v1.0
            </span>
          </div>

          {/* BACK */}

          <Link
            to="/"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/[0.025]
              px-3
              py-2
              text-xs
              text-white/50
              transition
              hover:border-[#6DD054]/25
              hover:bg-[#6DD054]/[0.06]
              hover:text-[#6DD054]
            "
          >
            <FiArrowLeft />

            <span className="hidden sm:block">
              Back to MiniLend
            </span>
          </Link>
        </div>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="
          mx-auto
          max-w-7xl
          px-5
          pb-16
          pt-16
          sm:px-8
          lg:px-10
          lg:pb-20
          lg:pt-24
        "
      >
        <div className="max-w-4xl">
          {/* LABEL */}

          <div
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#6DD054]/15
              bg-[#6DD054]/[0.05]
              px-3
              py-1.5
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#6DD054]
                shadow-[0_0_8px_rgba(109,208,84,0.6)]
              "
            />

            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-[#6DD054]
              "
            >
              Protocol Documentation
            </span>
          </div>

          {/* TITLE */}

          <h1
            className="
              text-4xl
              font-bold
              leading-[1.08]
              tracking-tight
              sm:text-5xl
              lg:text-7xl
            "
          >
            MiniLend

            <span className="block text-[#6DD054]">
              White Paper
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mt-7
              max-w-2xl
              text-base
              leading-8
              text-white/45
              sm:text-lg
            "
          >
            A simple and transparent decentralized lending protocol
            that allows users to unlock liquidity from their crypto
            assets without selling them.
          </p>

          {/* INFORMATION */}

          <div className="mt-8 flex flex-wrap gap-3">
            <div
              className="
                rounded-xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                px-4
                py-3
              "
            >
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                Version
              </p>

              <p className="mt-1 text-sm font-semibold">
                1.0
              </p>
            </div>

            <div
              className="
                rounded-xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                px-4
                py-3
              "
            >
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                Category
              </p>

              <p className="mt-1 text-sm font-semibold">
                DeFi Lending
              </p>
            </div>

            <div
              className="
                rounded-xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                px-4
                py-3
              "
            >
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                Model
              </p>

              <p className="mt-1 text-sm font-semibold">
                Non-Custodial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DOCUMENT LAYOUT
      ====================================================== */}

      <div
        className="
          mx-auto
          grid
          max-w-7xl
          grid-cols-1
          gap-10
          px-5
          pb-24
          sm:px-8
          lg:grid-cols-[230px_1fr]
          lg:px-10
        "
      >
        {/* =================================================
            MOBILE SECTION SELECTOR
        ================================================== */}

        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              border
              border-white/10
              bg-white/[0.025]
              px-4
              py-3
              text-sm
            "
          >
            <div className="flex items-center gap-3">
              <FiFileText className="text-[#6DD054]" />

              <span>
                {
                  sections.find(
                    (section) => section.id === activeSection
                  )?.title
                }
              </span>
            </div>

            <FiChevronDown
              className={`transition ${
                mobileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileOpen && (
            <div
              className="
                mt-2
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-[#101210]
              "
            >
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-left
                    text-xs
                    transition

                    ${
                      activeSection === section.id
                        ? "bg-[#6DD054]/10 text-[#6DD054]"
                        : "text-white/45 hover:bg-white/[0.03] hover:text-white"
                    }
                  `}
                >
                  <span className="w-6 text-[9px] text-white/20">
                    {section.number}
                  </span>

                  {section.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* =================================================
            SIDEBAR
        ================================================== */}

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p
              className="
                mb-4
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-white/25
              "
            >
              Contents
            </p>

            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    text-left
                    text-[11px]
                    transition-all

                    ${
                      activeSection === section.id
                        ? "bg-[#6DD054]/[0.07] text-[#6DD054]"
                        : "text-white/35 hover:bg-white/[0.025] hover:text-white/70"
                    }
                  `}
                >
                  <span
                    className={`
                      text-[9px]

                      ${
                        activeSection === section.id
                          ? "text-[#6DD054]"
                          : "text-white/15"
                      }
                    `}
                  >
                    {section.number}
                  </span>

                  <span>{section.title}</span>

                  {activeSection === section.id && (
                    <FiChevronRight className="ml-auto text-[10px]" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* =================================================
            DOCUMENT
        ================================================== */}

        <main className="min-w-0 max-w-3xl">
          {/* =================================================
              ABSTRACT
          ================================================== */}

          <section
            id="abstract"
            className="scroll-mt-24 border-b border-white/[0.07] pb-14"
          >
            <SectionHeading
              number="01"
              title="Abstract"
            />

            <p className="document-text">
              MiniLend is a decentralized lending protocol designed
              to provide users with access to liquidity without
              requiring them to sell their crypto assets.
            </p>

            <p className="document-text">
              Instead of selling an asset to obtain capital, a user
              can deposit supported crypto assets as collateral and
              borrow against their value. The collateral remains
              locked within the protocol while the user receives
              access to a stablecoin loan.
            </p>

            <p className="document-text">
              The goal of MiniLend is to make decentralized lending
              easier to understand, easier to access, and more
              transparent for everyday users.
            </p>

            <InfoBox
              icon={<FiCheckCircle />}
              title="Core idea"
              text="Deposit collateral → unlock liquidity → repay the loan → withdraw your collateral."
            />
          </section>

          {/* =================================================
              INTRODUCTION
          ================================================== */}

          <section
            id="introduction"
            className="scroll-mt-24 border-b border-white/[0.07] py-14"
          >
            <SectionHeading
              number="02"
              title="Introduction"
            />

            <p className="document-text">
              Traditional financial systems often require users to
              sell assets or go through centralized institutions
              before accessing liquidity.
            </p>

            <p className="document-text">
              Decentralized finance introduces another approach:
              financial services can be provided through blockchain
              networks and programmable smart contracts rather than
              depending entirely on centralized intermediaries.
            </p>

            <p className="document-text">
              MiniLend applies this concept to crypto-backed lending.
              The protocol focuses on a straightforward experience
              where users can understand what they deposit, what they
              can borrow, and what is required to maintain a healthy
              position.
            </p>
          </section>

          {/* =================================================
              PROBLEM
          ================================================== */}

          <section
            id="problem"
            className="scroll-mt-24 border-b border-white/[0.07] py-14"
          >
            <SectionHeading
              number="03"
              title="The Problem"
            />

            <p className="document-text">
              Crypto holders can own valuable digital assets while
              still needing short-term liquidity. Selling those
              assets may create unwanted consequences, including
              losing exposure to the asset.
            </p>

            <div className="my-8 grid gap-3 sm:grid-cols-2">
              <FeatureCard
                icon={<FiTrendingUp />}
                title="Asset Exposure"
                text="Selling an asset removes the user's exposure to its future value."
              />

              <FeatureCard
                icon={<FiLayers />}
                title="Complexity"
                text="Many financial products are difficult for new users to understand."
              />

              <FeatureCard
                icon={<FiLock />}
                title="Custody"
                text="Centralized services may require users to transfer control of their assets."
              />

              <FeatureCard
                icon={<FiActivity />}
                title="Transparency"
                text="Users need clearer visibility into their collateral and loan positions."
              />
            </div>
          </section>

          {/* =================================================
              SOLUTION
          ================================================== */}

          <section
            id="solution"
            className="scroll-mt-24 border-b border-white/[0.07] py-14"
          >
            <SectionHeading
              number="04"
              title="Our Solution"
            />

            <p className="document-text">
              MiniLend creates a simple collateralized lending
              workflow. Users provide supported assets as collateral,
              and the protocol determines how much liquidity can be
              made available against that collateral.
            </p>

            <p className="document-text">
              The protocol is designed around four fundamental
              actions:
            </p>

            <div className="my-8 space-y-3">
              <Step
                number="01"
                title="Stake"
                text="The user deposits supported crypto assets into the protocol."
              />

              <Step
                number="02"
                title="Borrow"
                text="The user borrows available liquidity against the value of the collateral."
              />

              <Step
                number="03"
                title="Repay"
                text="The user repays the outstanding loan according to the protocol's requirements."
              />

              <Step
                number="04"
                title="Withdraw"
                text="After satisfying the required loan conditions, the user can withdraw eligible collateral."
              />
            </div>
          </section>

          {/* =================================================
              HOW IT WORKS
          ================================================== */}

          <section
            id="how-it-works"
            className="scroll-mt-24 border-b border-white/[0.07] py-14"
          >
            <SectionHeading
              number="05"
              title="How MiniLend Works"
            />

            <p className="document-text">
              The easiest way to understand MiniLend is to follow a
              user's position from beginning to end.
            </p>

            <div
              className="
                my-8
                rounded-2xl
                border
                border-[#6DD054]/15
                bg-[#6DD054]/[0.035]
                p-5
                sm:p-6
              "
            >
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#6DD054]
                "
              >
                Example
              </p>

              <p className="mt-4 text-sm leading-7 text-white/60">
                Imagine a user owns ETH but does not want to sell it.
                The user can deposit ETH as collateral. If the
                collateral has sufficient value, MiniLend can allow
                the user to borrow USDT against it.
              </p>

              <div className="mt-6 grid gap-2 sm:grid-cols-4">
                <FlowItem
                  title="ETH"
                  subtitle="Collateral"
                />

                <FlowArrow />

                <FlowItem
                  title="MiniLend"
                  subtitle="Protocol"
                />

                <FlowArrow />

                <FlowItem
                  title="USDT"
                  subtitle="Liquidity"
                />
              </div>
            </div>

            <p className="document-text">
              The important distinction is that the user does not
              need to sell the collateral in order to access the
              borrowed liquidity. Instead, the asset remains part of
              the lending position while the loan is outstanding.
            </p>

            <InfoBox
              icon={<FiShield />}
              title="Non-custodial principle"
              text="The protocol is designed so that lending operations are governed by programmed protocol rules rather than relying on a traditional intermediary."
            />
          </section>

          {/* =================================================
              COLLATERAL
          ================================================== */}

          <section
            id="collateral"
            className="scroll-mt-24 border-b border-white/[0.07] py-14"
          >
            <SectionHeading
              number="06"
              title="Collateral"
            />

            <p className="document-text">
              Collateral is the asset deposited by a borrower to
              secure a loan. Because crypto markets can change
              quickly, borrowers generally cannot borrow the full
              market value of their collateral.
            </p>

            <p className="document-text">
              Instead, a collateralized lending protocol uses a
              borrowing limit designed to provide protection against
              market movements.
            </p>

            <div
              className="
                my-8
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                p-6
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#627EEA]/10
                    text-[#627EEA]
                  "
                >
                  Ξ
                </div>

                <div>
                  <p className="text-xs text-white/35">
                    Example collateral
                  </p>

                  <p className="text-sm font-semibold">
                    ETH
                  </p>
                </div>
              </div>

              <div className="my-6 h-px bg-white/[0.06]" />

              <div className="grid gap-5 sm:grid-cols-3">
                <Metric
                  label="Asset"
                  value="ETH"
                />

                <Metric
                  label="Purpose"
                  value="Collateral"
                />

                <Metric
                  label="Loan"
                  value="USDT"
                />
              </div>
            </div>

            <p className="document-text">
              The exact supported assets, collateral factors, interest
              parameters, and other protocol values should be defined
              by the deployed protocol configuration.
            </p>
          </section>

          {/* =================================================
              BORROWING
          ================================================== */}

          <section
            id="borrowing"
            className="scroll-mt-24 border-b border-white/[0.07] py-14"
          >
            <SectionHeading
              number="07"
              title="Borrowing & Repayment"
            />

            <p className="document-text">
              Once collateral has been deposited and the user's
              position satisfies the protocol requirements, the user
              can access available borrowing capacity.
            </p>

            <p className="document-text">
              Borrowing creates an obligation. The user must repay the
              outstanding loan according to the protocol's rules
              before all collateral can become eligible for
              withdrawal.
            </p>

            <div className="my-8 space-y-3">
              <Step
                number="01"
                title="Check borrowing capacity"
                text="The protocol evaluates the user's collateral and determines the amount that can be borrowed."
              />

              <Step
                number="02"
                title="Receive liquidity"
                text="The approved loan amount is made available to the borrower."
              />

              <Step
                number="03"
                title="Maintain the position"
                text="The borrower monitors collateral value and outstanding debt."
              />

              <Step
                number="04"
                title="Repay"
                text="The borrower repays the loan and any applicable protocol charges."
              />
            </div>
          </section>

          {/* =================================================
              RISK
          ================================================== */}

          <section
            id="risk"
            className="scroll-mt-24 border-b border-white/[0.07] py-14"
          >
            <SectionHeading
              number="08"
              title="Risk Management"
            />

            <p className="document-text">
              Lending protocols operate in an environment where asset
              prices can change rapidly. Risk management is therefore
              a fundamental part of MiniLend.
            </p>

            <div className="my-8 grid gap-3">
              <FeatureCard
                icon={<FiAlertTriangle />}
                title="Market Risk"
                text="The value of deposited collateral can increase or decrease as market prices change."
              />

              <FeatureCard
                icon={<FiActivity />}
                title="Position Health"
                text="Borrowers must maintain sufficient collateral relative to their outstanding debt."
              />

              <FeatureCard
                icon={<FiShield />}
                title="Smart Contract Risk"
                text="Protocol users remain exposed to risks associated with smart contract implementation and blockchain infrastructure."
              />

              <FeatureCard
                icon={<FiLock />}
                title="Liquidity Risk"
                text="The availability of borrowing and repayment liquidity depends on the protocol's available resources."
              />
            </div>

            <InfoBox
              icon={<FiAlertTriangle />}
              title="Important"
              text="Users should understand that decentralized lending involves financial and technical risks. A healthy position can change as market conditions change."
              warning
            />
          </section>

          {/* =================================================
              SECURITY
          ================================================== */}

          <section
            id="security"
            className="scroll-mt-24 border-b border-white/[0.07] py-14"
          >
            <SectionHeading
              number="09"
              title="Security"
            />

            <p className="document-text">
              Security is essential because the protocol interacts
              with user assets. MiniLend's security model should
              prioritize predictable smart contract behavior,
              transparent transactions, and minimized unnecessary
              trust assumptions.
            </p>

            <div className="my-8 space-y-3">
              <SecurityItem
                title="Smart Contract Controls"
                text="Core lending operations should be enforced by deterministic on-chain logic."
              />

              <SecurityItem
                title="Access Controls"
                text="Administrative functionality should be limited to authorized operations."
              />

              <SecurityItem
                title="Transparent Transactions"
                text="Important protocol interactions can be verified through blockchain transaction records."
              />

              <SecurityItem
                title="Failure Awareness"
                text="Users should be clearly informed about protocol, market, and smart contract risks."
              />
            </div>
          </section>

          {/* =================================================
              ARCHITECTURE
          ================================================== */}

          <section
            id="architecture"
            className="scroll-mt-24 border-b border-white/[0.07] py-14"
          >
            <SectionHeading
              number="10"
              title="Protocol Architecture"
            />

            <p className="document-text">
              MiniLend can be understood as a set of connected
              components working together to provide the lending
              experience.
            </p>

            <div className="my-8 grid gap-3 sm:grid-cols-2">
              <ArchitectureCard
                number="01"
                title="User Interface"
                text="Provides the interface through which users view positions and initiate protocol actions."
              />

              <ArchitectureCard
                number="02"
                title="Wallet"
                text="Allows users to authorize blockchain transactions without giving the application custody of their private keys."
              />

              <ArchitectureCard
                number="03"
                title="Smart Contracts"
                text="Enforce the core lending rules and manage protocol interactions on-chain."
              />

              <ArchitectureCard
                number="04"
                title="Blockchain Network"
                text="Provides the settlement and verification layer for protocol transactions."
              />
            </div>

            <div
              className="
                my-8
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#0d100d]
                p-5
              "
            >
              <div
                className="
                  flex
                  flex-col
                  items-center
                  gap-3
                  text-center
                  sm:flex-row
                  sm:justify-center
                "
              >
                <ArchitectureNode title="User" />

                <FiArrowUpRight className="rotate-45 text-[#6DD054]/50" />

                <ArchitectureNode title="Wallet" />

                <FiArrowUpRight className="rotate-45 text-[#6DD054]/50" />

                <ArchitectureNode title="MiniLend" />

                <FiArrowUpRight className="rotate-45 text-[#6DD054]/50" />

                <ArchitectureNode title="Blockchain" />
              </div>
            </div>
          </section>

          {/* =================================================
              GOVERNANCE
          ================================================== */}

          <section
            id="governance"
            className="scroll-mt-24 border-b border-white/[0.07] py-14"
          >
            <SectionHeading
              number="11"
              title="Governance"
            />

            <p className="document-text">
              Governance determines how protocol parameters,
              supported assets, risk controls, and future changes can
              evolve over time.
            </p>

            <p className="document-text">
              As MiniLend develops, governance mechanisms may be
              introduced or expanded to provide a structured process
              for protocol improvements while protecting users from
              unauthorized changes.
            </p>

            <InfoBox
              icon={<FiLayers />}
              title="Governance principle"
              text="Protocol changes should prioritize transparency, security, user protection, and long-term sustainability."
            />
          </section>

          {/* =================================================
              ROADMAP
          ================================================== */}

          <section
            id="roadmap"
            className="scroll-mt-24 border-b border-white/[0.07] py-14"
          >
            <SectionHeading
              number="12"
              title="Roadmap"
            />

            <p className="document-text">
              MiniLend's development can be organized into progressive
              stages, allowing the protocol to improve its
              infrastructure before expanding its scope.
            </p>

            <div className="my-8 space-y-3">
              <RoadmapItem
                phase="Phase 01"
                title="Foundation"
                text="Build the core lending interface, wallet interaction, and protocol infrastructure."
                active
              />

              <RoadmapItem
                phase="Phase 02"
                title="Protocol Expansion"
                text="Expand supported assets, improve risk controls, and strengthen protocol monitoring."
              />

              <RoadmapItem
                phase="Phase 03"
                title="Ecosystem"
                text="Introduce additional integrations and tools that make decentralized lending more accessible."
              />

              <RoadmapItem
                phase="Phase 04"
                title="Decentralized Growth"
                text="Progress toward broader community participation and governance."
              />
            </div>
          </section>

          {/* =================================================
              CONCLUSION
          ================================================== */}

          <section
            id="conclusion"
            className="scroll-mt-24 pt-14"
          >
            <SectionHeading
              number="13"
              title="Conclusion"
            />

            <p className="document-text">
              MiniLend is built around a simple idea: crypto users
              should be able to access liquidity without automatically
              giving up ownership exposure to their assets.
            </p>

            <p className="document-text">
              By combining collateralized borrowing, programmable
              blockchain infrastructure, and a user-focused interface,
              MiniLend aims to make decentralized lending easier to
              understand and easier to use.
            </p>

            <p className="document-text">
              The protocol's long-term success depends on security,
              responsible risk management, transparent development,
              and continued improvement of the user experience.
            </p>

            {/* FINAL CARD */}

            <div
              className="
                mt-10
                overflow-hidden
                rounded-3xl
                border
                border-[#6DD054]/15
                bg-[#0d100d]
                p-6
                sm:p-8
              "
            >
              <div className="relative">
                <div
                  className="
                    absolute
                    -right-20
                    -top-20
                    h-48
                    w-48
                    rounded-full
                    bg-[#6DD054]/10
                    blur-[80px]
                  "
                />

                <div className="relative">
                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-[#6DD054]
                    "
                  >
                    The MiniLend Vision
                  </p>

                  <h3
                    className="
                      mt-3
                      text-2xl
                      font-bold
                      tracking-tight
                      sm:text-3xl
                    "
                  >
                    Unlock liquidity.
                    <span className="text-[#6DD054]">
                      {" "}Keep your assets.
                    </span>
                  </h3>

                  <p
                    className="
                      mt-4
                      max-w-xl
                      text-sm
                      leading-7
                      text-white/40
                    "
                  >
                    A simpler path toward transparent and accessible
                    decentralized lending.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    {/* EXPLORE MINILEND */}

                    <Link
                      to="/"
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-[#6DD054]
                        px-5
                        py-3
                        text-xs
                        font-bold
                        text-[#0b1609]
                        transition
                        hover:bg-[#7ae360]
                      "
                    >
                      Explore MiniLend

                      <FiArrowUpRight />
                    </Link>

                    {/* GITHUB REPOSITORY */}

                    <a
                      href="https://github.com/Johnpii1/Mini-lend"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.025]
                        px-5
                        py-3
                        text-xs
                        text-white/50
                        transition
                        hover:border-white/20
                        hover:text-white
                      "
                    >
                      <FiGithub />

                      View Repository
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-white/[0.07]">
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-4
            px-5
            py-8
            sm:px-8
            md:flex-row
            md:items-center
            md:justify-between
            lg:px-10
          "
        >
          <div>
            <p className="text-xs font-bold tracking-[0.15em]">
              MINI
              <span className="text-[#6DD054]">
                LEND
              </span>
            </p>

            <p className="mt-1 text-[10px] text-white/25">
              Decentralized Lending Protocol
            </p>
          </div>

          <p className="text-[10px] text-white/25">
            White Paper v1.0 · 2026
          </p>

          <Link
            to="/"
            className="
              flex
              items-center
              gap-2
              text-[10px]
              text-white/35
              transition
              hover:text-[#6DD054]
            "
          >
            Back to MiniLend

            <FiArrowUpRight />
          </Link>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================
   SECTION HEADING
============================================================ */

function SectionHeading({ number, title }) {
  return (
    <div className="mb-7">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[9px] font-mono text-[#6DD054]">
          {number}
        </span>

        <span className="h-px w-8 bg-[#6DD054]/30" />
      </div>

      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

/* ============================================================
   INFO BOX
============================================================ */

function InfoBox({
  icon,
  title,
  text,
  warning = false,
}) {
  return (
    <div
      className={`
        my-8
        flex
        gap-4
        rounded-2xl
        border
        p-5

        ${
          warning
            ? "border-yellow-400/10 bg-yellow-400/[0.025]"
            : "border-[#6DD054]/10 bg-[#6DD054]/[0.025]"
        }
      `}
    >
      <div
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl

          ${
            warning
              ? "bg-yellow-400/10 text-yellow-400"
              : "bg-[#6DD054]/10 text-[#6DD054]"
          }
        `}
      >
        {icon}
      </div>

      <div>
        <h4 className="text-xs font-semibold text-white">
          {title}
        </h4>

        <p className="mt-1 text-xs leading-6 text-white/40">
          {text}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   FEATURE CARD
============================================================ */

function FeatureCard({
  icon,
  title,
  text,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/[0.07]
        bg-white/[0.02]
        p-5
        transition
        duration-300
        hover:border-[#6DD054]/15
        hover:bg-[#6DD054]/[0.025]
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-[#6DD054]/10
            text-[#6DD054]
          "
        >
          {icon}
        </div>

        <h4 className="text-sm font-semibold">
          {title}
        </h4>
      </div>

      <p className="mt-3 text-xs leading-6 text-white/35">
        {text}
      </p>
    </div>
  );
}

/* ============================================================
   STEP
============================================================ */

function Step({
  number,
  title,
  text,
}) {
  return (
    <div
      className="
        flex
        gap-4
        rounded-2xl
        border
        border-white/[0.07]
        bg-white/[0.02]
        p-5
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#6DD054]/10
          text-[10px]
          font-bold
          text-[#6DD054]
        "
      >
        {number}
      </div>

      <div>
        <h4 className="text-sm font-semibold">
          {title}
        </h4>

        <p className="mt-1 text-xs leading-6 text-white/35">
          {text}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   FLOW
============================================================ */

function FlowItem({
  title,
  subtitle,
}) {
  return (
    <div
      className="
        flex-1
        rounded-xl
        border
        border-white/[0.07]
        bg-white/[0.025]
        p-4
        text-center
      "
    >
      <p className="text-sm font-bold">
        {title}
      </p>

      <p
        className="
          mt-1
          text-[9px]
          uppercase
          tracking-wider
          text-white/25
        "
      >
        {subtitle}
      </p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden items-center justify-center sm:flex">
      <FiArrowUpRight className="text-[#6DD054]/50" />
    </div>
  );
}

/* ============================================================
   METRIC
============================================================ */

function Metric({
  label,
  value,
}) {
  return (
    <div>
      <p
        className="
          text-[9px]
          uppercase
          tracking-wider
          text-white/25
        "
      >
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   SECURITY ITEM
============================================================ */

function SecurityItem({
  title,
  text,
}) {
  return (
    <div
      className="
        flex
        gap-4
        rounded-2xl
        border
        border-white/[0.07]
        bg-white/[0.02]
        p-5
      "
    >
      <FiCheckCircle className="mt-0.5 shrink-0 text-[#6DD054]" />

      <div>
        <h4 className="text-sm font-semibold">
          {title}
        </h4>

        <p className="mt-1 text-xs leading-6 text-white/35">
          {text}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   ARCHITECTURE
============================================================ */

function ArchitectureCard({
  number,
  title,
  text,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/[0.07]
        bg-white/[0.02]
        p-5
      "
    >
      <span className="text-[9px] font-mono text-[#6DD054]">
        {number}
      </span>

      <h4 className="mt-3 text-sm font-semibold">
        {title}
      </h4>

      <p className="mt-2 text-xs leading-6 text-white/35">
        {text}
      </p>
    </div>
  );
}

function ArchitectureNode({ title }) {
  return (
    <div
      className="
        rounded-xl
        border
        border-[#6DD054]/10
        bg-[#6DD054]/[0.04]
        px-4
        py-3
      "
    >
      <span className="text-xs font-semibold text-white/70">
        {title}
      </span>
    </div>
  );
}

/* ============================================================
   ROADMAP
============================================================ */

function RoadmapItem({
  phase,
  title,
  text,
  active = false,
}) {
  return (
    <div
      className={`
        rounded-2xl
        border
        p-5

        ${
          active
            ? "border-[#6DD054]/15 bg-[#6DD054]/[0.035]"
            : "border-white/[0.07] bg-white/[0.02]"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <span
          className={`
            text-[9px]
            font-mono

            ${
              active
                ? "text-[#6DD054]"
                : "text-white/25"
            }
          `}
        >
          {phase}
        </span>

        {active && (
          <span
            className="
              rounded-full
              bg-[#6DD054]/10
              px-2
              py-0.5
              text-[8px]
              uppercase
              tracking-wider
              text-[#6DD054]
            "
          >
            Current
          </span>
        )}
      </div>

      <h4 className="mt-3 text-sm font-semibold">
        {title}
      </h4>

      <p className="mt-1 text-xs leading-6 text-white/35">
        {text}
      </p>
    </div>
  );
}

/* ============================================================
   GLOBAL DOCUMENT STYLES
============================================================ */

const styles = `
  .document-text {
    margin-top: 18px;
    color: rgba(255,255,255,0.50);
    font-size: 14px;
    line-height: 2rem;
  }

  @media (min-width: 640px) {
    .document-text {
      font-size: 15px;
    }
  }
`;

/* Inject document styles */

if (typeof document !== "undefined") {
  const styleId = "minilend-whitepaper-styles";

  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = styles;
    document.head.appendChild(style);
  }
}

