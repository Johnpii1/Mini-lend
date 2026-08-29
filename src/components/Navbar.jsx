import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FiHelpCircle,
  FiFileText,
  FiArrowUpRight,
  FiMenu,
  FiX,
  FiHome,
  FiInfo,
  FiCircle,
  FiAward,
  FiGrid,
  FiMail,
} from "react-icons/fi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  /*
  ============================================================
  NAVIGATION ITEMS
  ============================================================
  */

  const navItems = [
    {
      label: "Home",
      id: "home",
      icon: FiHome,
    },
    {
      label: "How It Works",
      id: "how-it-works",
      icon: FiInfo,
    },
    {
      label: "Benefits",
      id: "benefits",
      icon: FiAward,
    },
    {
      label: "Assets",
      id: "assets",
      icon: FiGrid,
    },
    {
      label: "FAQ",
      id: "faq",
      icon: FiHelpCircle,
    },
    {
      label: "White Paper",
      to: "/white-paper",
      icon: FiFileText,
      externalPage: true,
    },
    {
      label: "Contact Us",
      id: "contact",
      icon: FiMail,
    },
  ];

  /*
  ============================================================
  SCROLL BACKGROUND
  ============================================================
  */

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

  /*
  ============================================================
  FIND ACTIVE SECTION
  ============================================================
  */

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const updateActiveSection = () => {
      const sections = navItems
        .filter((item) => !item.externalPage)
        .map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }))
        .filter((item) => item.element);

      /*
        The navbar is fixed, so we use a position near
        the top of the viewport to determine which section
        the user is currently inside.
      */

      const scrollPosition = window.scrollY + 140;

      let currentSection = "home";

      for (const section of sections) {
        const sectionTop = section.element.offsetTop;

        if (scrollPosition >= sectionTop) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    // Run immediately on page load / refresh
    updateActiveSection();

    // Run whenever the user scrolls
    window.addEventListener("scroll", updateActiveSection);

    // Run again after everything has rendered
    const timeout = setTimeout(() => {
      updateActiveSection();
    }, 100);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      clearTimeout(timeout);
    };
  }, [location.pathname]);

  /*
  ============================================================
  HANDLE PAGE HASH AFTER NAVIGATION
  ============================================================
  */

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const hash = window.location.hash;

    if (!hash) {
      return;
    }

    const id = hash.replace("#", "");

    const timeout = setTimeout(() => {
      const section = document.getElementById(id);

      if (section) {
        const navbarOffset = 110;

        const position =
          section.getBoundingClientRect().top + window.scrollY - navbarOffset;

        window.scrollTo({
          top: position,
          behavior: "smooth",
        });

        setActiveSection(id);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  /*
  ============================================================
  SCROLL TO SECTION
  ============================================================
  */

  const scrollToSection = (id) => {
    closeMobileMenu();

    /*
      If we are on another page, go back to landing page
      and include the section hash.
    */

    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    const section = document.getElementById(id);

    if (!section) {
      return;
    }

    const navbarOffset = 110;

    const sectionPosition =
      section.getBoundingClientRect().top + window.scrollY - navbarOffset;

    /*
      Immediately mark this section as active.
    */

    setActiveSection(id);

    /*
      Update URL without refreshing the page.
    */

    window.history.replaceState(null, "", id === "home" ? "/" : `/#${id}`);

    /*
      Smooth scroll.
    */

    window.scrollTo({
      top: sectionPosition,
      behavior: "smooth",
    });
  };

  /*
  ============================================================
  CLOSE MOBILE MENU
  ============================================================
  */

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  /*
  ============================================================
  RESIZE
  ============================================================
  */

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

  /*
  ============================================================
  NAVBAR
  ============================================================
  */

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
              bg-[#0d0d0d]/95
              border-[#6DD054]/35
              backdrop-blur-2xl
              shadow-[0_20px_60px_rgba(0,0,0,0.45)]
            `
            : `
              bg-[#111111]/80
              border-white/10
              backdrop-blur-xl
            `
        }
      `}
    >
      {/* =====================================================
          TOP NAVBAR
      ====================================================== */}

      <div className="h-[64px] px-4 sm:px-6 lg:px-7 flex items-center justify-between">
        {/* =====================================================
            LOGO
        ====================================================== */}

        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="group flex items-center gap-2.5 shrink-0"
        >
          <div
            className=""
          >
            <img
            className="object-contain w-[50px]"
             src="./favicon.png" alt="" />

            <div
              className="
                absolute
                -top-5
                -right-5
                w-10
                h-10
                rounded-full
                bg-white/20
                blur-md
                transition-transform
                duration-500
                group-hover:translate-x-3
                group-hover:translate-y-3
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

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            /*
            ====================================================
            WHITE PAPER
            ====================================================
            */

            if (item.externalPage) {
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="
                    group
                    relative
                    flex
                    items-center
                    gap-2
                    px-2.5
                    lg:px-3
                    py-2.5
                    rounded-xl
                    text-xs
                    lg:text-sm
                    font-medium
                    text-white/60
                    hover:text-white
                    hover:bg-white/[0.04]
                    transition-all
                    duration-200
                  "
                >
                  <Icon
                    className="
                      text-base
                      text-white/40
                      transition-colors
                      duration-200
                      group-hover:text-[#6DD054]
                    "
                  />

                  <span>{item.label}</span>

                  <span
                    className="
                      absolute
                      bottom-1.5
                      left-4
                      right-4
                      h-px
                      bg-[#6DD054]
                      scale-x-0
                      origin-left
                      group-hover:scale-x-100
                      transition-transform
                      duration-300
                    "
                  />
                </Link>
              );
            }

            /*
            ====================================================
            ACTIVE SECTION
            ====================================================
            */

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
                  gap-2
                  px-2.5
                  lg:px-3
                  py-2.5
                  rounded-xl
                  text-xs
                  lg:text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "text-white bg-[#6DD054]/[0.08]"
                      : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                  }
                `}
              >
                <Icon
                  className={`
                    text-base
                    transition-colors
                    duration-200

                    ${
                      isActive
                        ? "text-[#6DD054]"
                        : "text-white/40 group-hover:text-[#6DD054]"
                    }
                  `}
                />

                <span>{item.label}</span>

                <span
                  className={`
                    absolute
                    bottom-1.5
                    left-4
                    right-4
                    h-px
                    bg-[#6DD054]
                    origin-left
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

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div className="flex items-center gap-2.5">
          {/* NETWORK */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-2
              h-9
              px-3
              rounded-xl
              border
              border-[#6DD054]/15
              bg-[#6DD054]/[0.05]
            "
          >
            <FiCircle
              className="
                text-[9px]
                fill-[#6DD054]
                text-[#6DD054]
                animate-pulse
              "
            />

            <span className="text-xs font-medium text-white/55">Anvil</span>
          </div>

          {/* CONNECT WALLET */}

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
              gap-2
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
              hover:shadow-[0_8px_25px_rgba(215,203,177,0.18)]
              active:translate-y-0
              active:scale-[0.98]
            "
          >
            <span className="relative z-10">Connect Wallet</span>

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

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
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
              duration-200
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
            <div className="border-t border-white/[0.08] pt-3 space-y-1">
              {/* NETWORK */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-3
                  py-3
                  mb-1
                  rounded-xl
                  bg-[#6DD054]/[0.05]
                  border
                  border-[#6DD054]/10
                "
              >
                <span className="text-xs text-white/45">Network</span>

                <span className="flex items-center gap-2 text-xs font-medium text-[#6DD054]">
                  <FiCircle
                    className="
                      text-[8px]
                      fill-[#6DD054]
                      animate-pulse
                    "
                  />
                  Anvil
                </span>
              </div>

              {/* MOBILE NAV ITEMS */}

              {navItems.map((item) => {
                const Icon = item.icon;

                /*
                =================================================
                WHITE PAPER
                =================================================
                */

                if (item.externalPage) {
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMobileMenu}
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        px-3
                        py-3.5
                        rounded-xl
                        text-sm
                        font-medium
                        text-white/65
                        hover:text-white
                        hover:bg-white/[0.04]
                        transition-all
                        duration-200
                      "
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="
                            w-8
                            h-8
                            rounded-lg
                            bg-white/[0.05]
                            flex
                            items-center
                            justify-center
                            group-hover:bg-[#6DD054]/10
                            transition-colors
                          "
                        >
                          <Icon className="text-[#6DD054]" />
                        </span>

                        {item.label}
                      </span>

                      <FiArrowUpRight
                        className="
                          text-white/30
                          transition-all
                          group-hover:text-[#6DD054]
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                        "
                      />
                    </Link>
                  );
                }

                /*
                =================================================
                ACTIVE MOBILE SECTION
                =================================================
                */

                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      group
                      w-full
                      flex
                      items-center
                      justify-between
                      px-3
                      py-3.5
                      rounded-xl
                      text-sm
                      font-medium
                      transition-all
                      duration-200
                      text-left

                      ${
                        isActive
                          ? "text-white bg-[#6DD054]/[0.08]"
                          : "text-white/65 hover:text-white hover:bg-white/[0.04]"
                      }
                    `}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`
                          w-8
                          h-8
                          rounded-lg
                          flex
                          items-center
                          justify-center
                          transition-colors

                          ${
                            isActive
                              ? "bg-[#6DD054]/15"
                              : "bg-white/[0.05] group-hover:bg-[#6DD054]/10"
                          }
                        `}
                      >
                        <Icon className="text-[#6DD054]" />
                      </span>

                      {item.label}
                    </span>

                    <FiArrowUpRight
                      className={`
                        transition-all
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5

                        ${
                          isActive
                            ? "text-[#6DD054]"
                            : "text-white/30 group-hover:text-[#6DD054]"
                        }
                      `}
                    />
                  </button>
                );
              })}

              {/* CONNECT */}

              <button
                id="mobileConnect"
                type="button"
                onClick={closeMobileMenu}
                className="
                  group
                  w-full
                  mt-2
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
