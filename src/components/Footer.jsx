
import { useState } from "react";
import {
  FiArrowUpRight,
  FiGithub,
  FiTwitter,
  FiMail,
  FiShield,
  FiX,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // ============================================================
  // PRODUCT LINKS
  // ============================================================

  const productLinks = [
    {
      label: "How It Works",
      id: "how-it-works",
    },
    {
      label: "Benefits",
      id: "benefits",
    },
    {
      label: "Supported Assets",
      id: "assets",
    },
    {
      label: "FAQ",
      id: "faq",
    },
  ];

  // ============================================================
  // RESOURCE LINKS
  // ============================================================

  const resourceLinks = [
    {
      label: "White Paper",
      to: "/white-paper",
      page: true,
    },
    {
      label: "Documentation",
      to: "/docs",
      page: true,
    },
    {
      label: "Contact Us",
      id: "contact",
    },
  ];

  // ============================================================
  // LEGAL LINKS
  // ============================================================

  const legalLinks = [
    {
      label: "Privacy Policy",
      to: "/privacy",
      page: true,
    },
    {
      label: "Terms of Use",
      to: "/terms",
      page: true,
    },
    {
      label: "Risk Disclosure",
      to: "/risk-disclosure",
      page: true,
    },
  ];

  // ============================================================
  // SCROLL TO LANDING PAGE SECTION
  // ============================================================

  const scrollToSection = (id) => {
    setModalOpen(false);

    // If we are not on the landing page,
    // go there first with the hash.
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    const section = document.getElementById(id);

    if (!section) {
      return;
    }

    const navbarOffset = 110;

    const position =
      section.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.history.replaceState(
      null,
      "",
      `/#${id}`
    );

    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-[#080908] text-white">

        {/* =====================================================
            CTA SECTION
        ====================================================== */}

        <section className="px-5 sm:px-8 lg:px-10 pt-20 pb-12">

          <div
            className="
              relative
              max-w-7xl
              mx-auto
              overflow-hidden
              rounded-3xl
              border
              border-[#6DD054]/15
              bg-[#0d100d]
              px-6
              py-12
              sm:px-10
              lg:px-14
            "
          >

            {/* BACKGROUND GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-64
                w-64
                rounded-full
                bg-[#6DD054]/10
                blur-[100px]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -left-24
                -bottom-24
                h-64
                w-64
                rounded-full
                bg-[#6DD054]/5
                blur-[100px]
              "
            />

            <div
              className="
                relative
                z-10
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-8
              "
            >

              {/* LEFT */}

              <div className="max-w-2xl">

                <div className="flex items-center gap-2 mb-4">

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#6DD054]/10
                      border
                      border-[#6DD054]/15
                    "
                  >
                    <FiShield className="text-[#6DD054] text-sm" />
                  </span>

                  <span className="text-xs uppercase tracking-[0.2em] text-[#6DD054]">
                    Decentralized Lending
                  </span>

                </div>

                <h2
                  className="
                    text-2xl
                    sm:text-3xl
                    md:text-4xl
                    font-semibold
                    leading-tight
                  "
                >
                  Put your crypto to work
                  <span className="text-[#6DD054]">
                    {" "}without selling it.
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/45">
                  Access decentralized liquidity, keep control of your
                  assets, and manage your lending position through MiniLend.
                </p>

              </div>

              {/* CTA BUTTON */}

              <div className="shrink-0">

                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="
                    group
                    flex
                    h-12
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-[#6DD054]
                    px-6
                    text-sm
                    font-bold
                    text-[#0b1609]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#7ae360]
                    hover:shadow-[0_12px_35px_rgba(109,208,84,0.2)]
                    active:scale-[0.98]
                  "
                >
                  Connect Wallet

                  <FiArrowUpRight
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />

                </button>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-[1.5fr_1fr_1fr_1fr]
              gap-12
              py-14
              border-b
              border-white/[0.07]
            "
          >

            {/* =================================================
                BRAND
            ================================================= */}

            <div className="max-w-sm">

              {/* LOGO */}

              <button
                type="button"
                onClick={() => {
                  if (location.pathname !== "/") {
                    navigate("/");
                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }, 100);
                  } else {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }
                }}
                className="inline-flex items-center gap-2.5 group text-left"
              >

                <div
                  className="
                    relative
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    bg-[#6DD054]
                    shadow-[0_0_25px_rgba(109,208,84,0.12)]
                    transition-all
                    duration-300
                    group-hover:scale-105
                    group-hover:shadow-[0_0_30px_rgba(109,208,84,0.25)]
                  "
                >

                  <img
                    className="object-contain w-[50px]"
                    src="./favicon.png"
                    alt="MiniLend Logo"
                  />

                  <div
                    className="
                      absolute
                      -right-5
                      -top-5
                      h-10
                      w-10
                      rounded-full
                      bg-white/20
                      blur-md
                    "
                  />

                </div>

                <div className="leading-none">

                  <span className="block text-sm font-bold tracking-[0.15em] text-white">
                    MINI
                  </span>

                  <span className="block text-sm font-bold tracking-[0.15em] text-[#6DD054]">
                    LEND
                  </span>

                </div>

              </button>


              {/* DESCRIPTION */}

              <p className="mt-6 text-sm leading-7 text-white/40">
                A decentralized lending protocol designed to give
                users simple and transparent access to crypto-backed
                liquidity.
              </p>


              {/* NETWORK */}

              <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#6DD054]/10 bg-[#6DD054]/[0.04] px-3 py-2">

                <span className="relative flex h-2 w-2">

                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6DD054] opacity-50" />

                  <span className="relative h-2 w-2 rounded-full bg-[#6DD054]" />

                </span>

                <span className="text-xs text-white/50">
                  Protocol online
                </span>

              </div>


              {/* SOCIALS */}

              <div className="flex items-center gap-2 mt-6">

                <a
                  href="#"
                  aria-label="GitHub"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    text-white/40
                    transition-all
                    duration-200
                    hover:border-[#6DD054]/25
                    hover:bg-[#6DD054]/10
                    hover:text-[#6DD054]
                  "
                >
                  <FiGithub />
                </a>

                <a
                  href="#"
                  aria-label="Twitter"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    text-white/40
                    transition-all
                    duration-200
                    hover:border-[#6DD054]/25
                    hover:bg-[#6DD054]/10
                    hover:text-[#6DD054]
                  "
                >
                  <FiTwitter />
                </a>

                <a
                  href="mailto:hello@minilend.eth"
                  aria-label="Email"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    text-white/40
                    transition-all
                    duration-200
                    hover:border-[#6DD054]/25
                    hover:bg-[#6DD054]/10
                    hover:text-[#6DD054]
                  "
                >
                  <FiMail />
                </a>

              </div>

            </div>


            {/* =================================================
                PRODUCT
            ================================================= */}

            <div>

              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                Product
              </h3>

              <div className="mt-5 space-y-3">

                {productLinks.map((item) => (

                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="
                      group
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-white/40
                      transition-colors
                      hover:text-[#6DD054]
                    "
                  >
                    {item.label}

                    <FiArrowUpRight
                      className="
                        text-xs
                        opacity-0
                        transition-all
                        duration-200
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                        group-hover:opacity-100
                      "
                    />

                  </button>

                ))}

              </div>

            </div>


            {/* =================================================
                RESOURCES
            ================================================= */}

            <div>

              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                Resources
              </h3>

              <div className="mt-5 space-y-3">

                {resourceLinks.map((item) => {

                  // LANDING PAGE SECTION
                  if (item.id) {
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className="
                          group
                          flex
                          items-center
                          gap-2
                          text-sm
                          text-white/40
                          transition-colors
                          hover:text-[#6DD054]
                        "
                      >
                        {item.label}

                        <FiArrowUpRight
                          className="
                            text-xs
                            opacity-0
                            transition-all
                            duration-200
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                            group-hover:opacity-100
                          "
                        />

                      </button>
                    );
                  }

                  // NORMAL PAGE
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="
                        group
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-white/40
                        transition-colors
                        hover:text-[#6DD054]
                      "
                    >
                      {item.label}

                      <FiArrowUpRight
                        className="
                          text-xs
                          opacity-0
                          transition-all
                          duration-200
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                          group-hover:opacity-100
                        "
                      />

                    </Link>
                  );
                })}

              </div>

            </div>


            {/* =================================================
                LEGAL
            ================================================= */}

            <div>

              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                Legal
              </h3>

              <div className="mt-5 space-y-3">

                {legalLinks.map((item) => (

                  <Link
                    key={item.to}
                    to={item.to}
                    className="
                      group
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-white/40
                      transition-colors
                      hover:text-[#6DD054]
                    "
                  >
                    {item.label}

                    <FiArrowUpRight
                      className="
                        text-xs
                        opacity-0
                        transition-all
                        duration-200
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                        group-hover:opacity-100
                      "
                    />

                  </Link>

                ))}

              </div>

            </div>

          </div>


          {/* =====================================================
              BOTTOM FOOTER
          ====================================================== */}

          <div
            className="
              flex
              flex-col
              gap-5
              py-6
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            {/* COPYRIGHT */}

            <p className="text-[11px] text-white/30">
              © 2026 MiniLend.eth. All rights reserved.
            </p>


            {/* STATUS */}

            <div className="flex items-center gap-2">

              <span className="relative flex h-2 w-2">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6DD054] opacity-40" />

                <span className="relative h-2 w-2 rounded-full bg-[#6DD054]" />

              </span>

              <span className="text-[11px] text-white/30">
                Built for decentralized finance
              </span>

            </div>


            {/* BACK TO TOP */}

            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="
                group
                flex
                items-center
                gap-2
                text-[11px]
                text-white/35
                transition-colors
                hover:text-[#6DD054]
              "
            >
              Back to top

              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10
                  transition-all
                  group-hover:border-[#6DD054]/30
                  group-hover:bg-[#6DD054]/10
                "
              >
                <FiArrowUpRight className="-rotate-45" />
              </span>

            </button>

          </div>

        </div>

      </footer>


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

            {/* CLOSE */}

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
              aria-label="Close modal"
            >
              <FiX />
            </button>


            {/* ICON */}

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6DD054]/10">
              <FiShield className="text-2xl text-[#6DD054]" />
            </div>


            {/* TITLE */}

            <h2 className="mt-5 text-center text-xl font-bold text-white">
              Connect Your Wallet
            </h2>


            {/* DESCRIPTION */}

            <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-white/40">
              Connect your wallet to start staking assets and access
              stablecoin loans through MiniLend.
            </p>


            {/* CONNECT */}

            <button
              type="button"
              id="footerConnectWalletBtn"
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


            {/* TERMS */}

            <p className="mt-4 text-center text-[10px] leading-5 text-white/25">

              By connecting, you agree to our{" "}

              <Link
                to="/terms"
                onClick={() => setModalOpen(false)}
                className="text-white/50 underline underline-offset-2 hover:text-white"
              >
                Terms of Use
              </Link>

              {" "}and{" "}

              <Link
                to="/privacy"
                onClick={() => setModalOpen(false)}
                className="text-white/50 underline underline-offset-2 hover:text-white"
              >
                Privacy Policy
              </Link>

              .

            </p>

          </div>

        </div>

      )}

    </>
  );
}

