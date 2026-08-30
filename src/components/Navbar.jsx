
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FiArrowUpRight,
  FiMenu,
  FiX,
  FiCircle,
  FiFileText,
} from "react-icons/fi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  // ============================================================
  // CENTER NAVIGATION
  // ============================================================

  const navItems = [
    {
      label: "How It Works",
      id: "how-it-works",
    },
    {
      label: "FAQ",
      id: "faq",
    },
  ];

  // ============================================================
  // SCROLL BACKGROUND
  // ============================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ============================================================
  // ACTIVE SECTION
  // ============================================================

  useEffect(() => {
    if (location.pathname !== "/") return;

    const updateActiveSection = () => {
      const sections = navItems
        .map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }))
        .filter((item) => item.element);

      const scrollPosition = window.scrollY + 140;

      let currentSection = "home";

      for (const section of sections) {
        if (scrollPosition >= section.element.offsetTop) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [location.pathname]);

  // ============================================================
  // HASH NAVIGATION
  // ============================================================

  useEffect(() => {
    if (location.pathname !== "/") return;

    const hash = window.location.hash;

    if (!hash) return;

    const id = hash.replace("#", "");

    const timeout = setTimeout(() => {
      const section = document.getElementById(id);

      if (!section) return;

      const navbarOffset = 110;

      const position =
        section.getBoundingClientRect().top +
        window.scrollY -
        navbarOffset;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });

      setActiveSection(id);
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  // ============================================================
  // CLOSE MOBILE MENU
  // ============================================================

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  // ============================================================
  // SCROLL TO SECTION
  // ============================================================

  const scrollToSection = (id) => {
    closeMobileMenu();

    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    const section = document.getElementById(id);

    if (!section) return;

    const navbarOffset = 110;

    const position =
      section.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    setActiveSection(id);

    window.history.replaceState(
      null,
      "",
      id === "home" ? "/" : `/#${id}`
    );

    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  // ============================================================
  // RESIZE
  // ============================================================

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ============================================================
  // NAVBAR
  // ============================================================

  return (
    <header
      className={`
        fixed
        top-4
        left-1/2
        -translate-x-1/2
        z-50
        w-[calc(100%-2rem)]
        sm:w-[calc(100%-3rem)]
        lg:w-[calc(100%-5rem)]
        max-w-7xl
        rounded-2xl
        border
        transition-all
        duration-300

        ${
          scrolled
            ? `
              bg-[#0c0c0c]/95
              border-white/[0.10]
              backdrop-blur-2xl
              shadow-[0_18px_50px_rgba(0,0,0,0.45)]
            `
            : `
              bg-[#101010]/90
              border-white/[0.08]
              backdrop-blur-xl
            `
        }
      `}
    >
      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}

      <div className="relative h-[64px] px-4 sm:px-6 lg:px-7 flex items-center">

        {/* =================================================
            LOGO - LEFT
        ================================================== */}

        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="
            group
            flex
            items-center
            gap-2.5
            shrink-0
          "
        >
          <div className="relative">
            <img
              src="./favicon.png"
              alt="MiniLend Logo"
              className="w-[46px] h-[46px] object-contain"
            />

            <div
              className="
                absolute
                -top-4
                -right-4
                w-8
                h-8
                rounded-full
                bg-white/15
                blur-md
                opacity-70
                group-hover:translate-x-2
                group-hover:translate-y-2
                transition-transform
                duration-500
              "
            />
          </div>

          <div className="leading-none text-left">
            <span className="block text-white font-bold tracking-[0.12em] text-sm">
              MINI
            </span>

            <span className="block text-[#6DD054] font-bold tracking-[0.12em] text-sm">
              LEND
            </span>
          </div>
        </button>

        {/* =================================================
            CENTER MENU
        ================================================== */}

        <nav
          className="
            hidden
            md:flex
            absolute
            left-1/2
            -translate-x-1/2
            items-center
            gap-1
          "
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`
                  group
                  relative
                  flex
                  items-center
                  justify-center
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? `
                        text-white
                        bg-[#6DD054]/[0.08]
                        border-[#6DD054]/10
                      `
                      : `
                        text-white/55
                        border-transparent
                        hover:text-white
                        hover:bg-white/[0.05]
                        hover:border-white/[0.07]
                      `
                  }
                `}
              >
                {item.label}

                {/* ACTIVE / HOVER LINE */}

                <span
                  className={`
                    absolute
                    bottom-1
                    left-4
                    right-4
                    h-px
                    bg-[#6DD054]
                    origin-center
                    transition-transform
                    duration-300

                    ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }
                  `}
                />
              </button>
            );
          })}
        </nav>

        {/* =================================================
            RIGHT SIDE
        ================================================== */}

        <div className="ml-auto flex items-center gap-1.5">

          {/* =================================================
              WHITE PAPER
          ================================================== */}

          <Link
            to="/white-paper"
            className="
              hidden
              lg:flex
              group
              items-center
              gap-1.5
              px-3
              py-2.5
              rounded-xl
              border
              border-transparent
              text-xs
              font-medium
              text-white/55
              hover:text-white
              hover:bg-white/[0.05]
              hover:border-white/[0.07]
              transition-all
              duration-200
            "
          >
            <FiFileText
              className="
                text-white/35
                group-hover:text-[#6DD054]
                transition-colors
              "
            />

            White Paper

            <FiArrowUpRight
              className="
                text-white/20
                group-hover:text-[#6DD054]
                transition-all
                duration-200
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>

          {/* =================================================
              ANVIL
          ================================================== */}

          <div
            className="
              hidden
              sm:flex
              items-center
              gap-1.5
              px-2.5
              h-9
              rounded-xl
              text-xs
              text-white/45
            "
          >
            <FiCircle
              className="
                text-[7px]
                fill-[#6DD054]
                text-[#6DD054]
                animate-pulse
              "
            />

            <span>Anvil</span>
          </div>

          {/* =================================================
              CONNECT WALLET
          ================================================== */}

          <button
            id="headerConnect"
            type="button"
            className="
              hidden
              sm:flex
              group
              relative
              items-center
              justify-center
              gap-1.5
              h-10
              px-4
              lg:px-5
              rounded-xl
              overflow-hidden
              bg-[#6DD054]
              text-[#0b1609]
              font-semibold
              text-xs
              lg:text-sm
              transition-all
              duration-300
              hover:bg-[#cae8d3]
              hover:-translate-y-0.5
              active:translate-y-0
              active:scale-[0.98]
            "
          >
            <span className="relative z-10">
              Connect Wallet
            </span>

            <FiArrowUpRight
              className="
                relative
                z-10
                text-base
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />

            {/* BUTTON SHINE */}

            <span
              className="
                absolute
                inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-white/30
                to-transparent
                skew-x-12
                group-hover:translate-x-full
                transition-transform
                duration-700
              "
            />
          </button>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileOpen}
            className="
              md:hidden
              w-10
              h-10
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              flex
              items-center
              justify-center
              text-white
              hover:border-[#6DD054]/30
              hover:bg-[#6DD054]/10
              hover:text-[#6DD054]
              transition-all
            "
          >
            {mobileOpen ? (
              <FiX className="text-xl" />
            ) : (
              <FiMenu className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <div
        className={`
          md:hidden
          grid
          transition-all
          duration-300
          ease-out

          ${
            mobileOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4">
            <div className="border-t border-white/[0.07] pt-3">

              {/* =================================================
                  MOBILE NAVIGATION
              ================================================== */}

              <div className="space-y-1">

                {/* HOW IT WORKS + FAQ */}

                {navItems.map((item) => {
                  const isActive =
                    activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        scrollToSection(item.id)
                      }
                      className={`
                        group
                        flex
                        items-center
                        justify-between
                        w-full
                        px-3
                        py-3
                        rounded-xl
                        border
                        text-sm
                        font-medium
                        text-left
                        transition-all
                        duration-200

                        ${
                          isActive
                            ? `
                              text-white
                              bg-[#6DD054]/[0.08]
                              border-[#6DD054]/10
                            `
                            : `
                              text-white/60
                              border-transparent
                              hover:text-white
                              hover:bg-white/[0.05]
                              hover:border-white/[0.07]
                            `
                        }
                      `}
                    >
                      {item.label}

                      <FiArrowUpRight
                        className={`
                          transition-all
                          duration-200

                          ${
                            isActive
                              ? "text-[#6DD054]"
                              : "text-white/20 group-hover:text-[#6DD054]"
                          }
                        `}
                      />
                    </button>
                  );
                })}

                {/* =================================================
                    WHITE PAPER
                ================================================== */}

                <Link
                  to="/white-paper"
                  onClick={closeMobileMenu}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    w-full
                    px-3
                    py-3
                    rounded-xl
                    border
                    border-transparent
                    text-sm
                    font-medium
                    text-white/60
                    hover:text-white
                    hover:bg-white/[0.05]
                    hover:border-white/[0.07]
                    transition-all
                  "
                >
                  <span className="flex items-center gap-3">
                    <FiFileText
                      className="
                        text-[#6DD054]
                        group-hover:text-[#6DD054]
                      "
                    />

                    White Paper
                  </span>

                  <FiArrowUpRight
                    className="
                      text-white/20
                      group-hover:text-[#6DD054]
                      transition-all
                    "
                  />
                </Link>
              </div>

              {/* =================================================
                  MOBILE NETWORK
              ================================================== */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-3
                  py-3
                  mt-3
                  rounded-xl
                  bg-white/[0.025]
                "
              >
                <span className="text-xs text-white/35">
                  Network
                </span>

                <span className="flex items-center gap-2 text-xs text-[#6DD054]">
                  <FiCircle
                    className="
                      text-[7px]
                      fill-[#6DD054]
                      text-[#6DD054]
                      animate-pulse
                    "
                  />

                  Anvil
                </span>
              </div>

              {/* =================================================
                  MOBILE CONNECT WALLET
              ================================================== */}

              <button
                id="mobileConnect"
                type="button"
                onClick={closeMobileMenu}
                className="
                  group
                  w-full
                  mt-3
                  h-12
                  rounded-xl
                  bg-[#6DD054]
                  text-[#0b1609]
                  font-semibold
                  text-sm
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition-all
                  duration-200
                  hover:bg-[#cae8d0]
                  active:scale-[0.98]
                "
              >
                Connect Wallet

                <FiArrowUpRight
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

