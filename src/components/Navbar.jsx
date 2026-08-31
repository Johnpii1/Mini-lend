
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
  }, [location.pathname, location.hash]);

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

    // If user is not on Landing page,
    // navigate to Landing first.
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

      <div className="relative flex h-[64px] items-center px-4 sm:px-6 lg:px-7">

        {/* =================================================
            LOGO
        ================================================== */}

        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="
            group
            flex
            shrink-0
            items-center
            gap-2.5
          "
        >
          <div className="relative">

            <img
              src="/favicon.png"
              alt="MiniLend Logo"
              className="h-[46px] w-[46px] object-contain"
            />

            <div
              className="
                absolute
                -right-4
                -top-4
                h-8
                w-8
                rounded-full
                bg-white/15
                blur-md
                opacity-70
                transition-transform
                duration-500
                group-hover:translate-x-2
                group-hover:translate-y-2
              "
            />

          </div>

          <div className="leading-none text-left">

            <span className="block text-sm font-bold tracking-[0.12em] text-white">
              MINI
            </span>

            <span className="block text-sm font-bold tracking-[0.12em] text-[#6DD054]">
              LEND
            </span>

          </div>
        </button>


        {/* =================================================
            CENTER MENU
        ================================================== */}

        <nav
          className="
            absolute
            left-1/2
            hidden
            -translate-x-1/2
            items-center
            gap-1
            md:flex
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
                  rounded-xl
                  border
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? `
                        border-[#6DD054]/10
                        bg-[#6DD054]/[0.08]
                        text-white
                      `
                      : `
                        border-transparent
                        text-white/55
                        hover:border-white/[0.07]
                        hover:bg-white/[0.05]
                        hover:text-white
                      `
                  }
                `}
              >
                {item.label}

                <span
                  className={`
                    absolute
                    bottom-1
                    left-4
                    right-4
                    h-px
                    origin-center
                    bg-[#6DD054]
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
              WHITE PAPER - DESKTOP
          ================================================== */}

          <Link
            to="/whitepaper"
            className="
              group
              hidden
              items-center
              gap-1.5
              rounded-xl
              border
              border-transparent
              px-3
              py-2.5
              text-xs
              font-medium
              text-white/55
              transition-all
              duration-200
              hover:border-white/[0.07]
              hover:bg-white/[0.05]
              hover:text-white
              lg:flex
            "
          >
            <FiFileText
              className="
                text-white/35
                transition-colors
                group-hover:text-[#6DD054]
              "
            />

            White Paper

            <FiArrowUpRight
              className="
                text-white/20
                transition-all
                duration-200
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                group-hover:text-[#6DD054]
              "
            />
          </Link>


          {/* =================================================
              ANVIL
          ================================================== */}

          <div
            className="
              hidden
              h-9
              items-center
              gap-1.5
              rounded-xl
              px-2.5
              text-xs
              text-white/45
              sm:flex
            "
          >
            <FiCircle
              className="
                animate-pulse
                text-[7px]
                text-[#6DD054]
              "
              fill="#6DD054"
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
              group
              relative
              hidden
              h-10
              items-center
              justify-center
              gap-1.5
              overflow-hidden
              rounded-xl
              bg-[#6DD054]
              px-4
              text-xs
              font-semibold
              text-[#0b1609]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#cae8d3]
              active:translate-y-0
              active:scale-[0.98]
              sm:flex
              lg:px-5
              lg:text-sm
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
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />

            <span
              className="
                absolute
                inset-0
                -translate-x-full
                skew-x-12
                bg-gradient-to-r
                from-transparent
                via-white/30
                to-transparent
                transition-transform
                duration-700
                group-hover:translate-x-full
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
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              text-white
              transition-all
              hover:border-[#6DD054]/30
              hover:bg-[#6DD054]/10
              hover:text-[#6DD054]
              md:hidden
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
          grid
          transition-all
          duration-300
          ease-out
          md:hidden

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

              {/* MOBILE NAVIGATION */}

              <div className="space-y-1">

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
                        w-full
                        items-center
                        justify-between
                        rounded-xl
                        border
                        px-3
                        py-3
                        text-left
                        text-sm
                        font-medium
                        transition-all
                        duration-200

                        ${
                          isActive
                            ? `
                              border-[#6DD054]/10
                              bg-[#6DD054]/[0.08]
                              text-white
                            `
                            : `
                              border-transparent
                              text-white/60
                              hover:border-white/[0.07]
                              hover:bg-white/[0.05]
                              hover:text-white
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
                    WHITE PAPER - MOBILE
                ================================================== */}

                <Link
                  to="/whitepaper"
                  onClick={closeMobileMenu}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-transparent
                    px-3
                    py-3
                    text-sm
                    font-medium
                    text-white/60
                    transition-all
                    hover:border-white/[0.07]
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  <span className="flex items-center gap-3">

                    <FiFileText
                      className="
                        text-[#6DD054]
                      "
                    />

                    White Paper

                  </span>

                  <FiArrowUpRight
                    className="
                      text-white/20
                      transition-all
                      group-hover:text-[#6DD054]
                    "
                  />

                </Link>

              </div>


              {/* MOBILE NETWORK */}

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  bg-white/[0.025]
                  px-3
                  py-3
                "
              >
                <span className="text-xs text-white/35">
                  Network
                </span>

                <span className="flex items-center gap-2 text-xs text-[#6DD054]">

                  <FiCircle
                    className="
                      animate-pulse
                      text-[7px]
                      text-[#6DD054]
                    "
                    fill="#6DD054"
                  />

                  Anvil

                </span>
              </div>


              {/* MOBILE CONNECT WALLET */}

              <button
                id="mobileConnect"
                type="button"
                onClick={closeMobileMenu}
                className="
                  group
                  mt-3
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#6DD054]
                  text-sm
                  font-semibold
                  text-[#0b1609]
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
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
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



