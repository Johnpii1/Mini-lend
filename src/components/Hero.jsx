
import { useEffect, useState } from "react";
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

  // =====================================================
  // TYPING TEXT
  // =====================================================
  const phrases = [
    "without selling.",
    "against your crypto.",
    "while keeping rewards.",
    "when you need it.",
    "without middlemen.",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout;

    if (!isDeleting && displayText.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayText(
          currentPhrase.substring(0, displayText.length + 1)
        );
      }, 80);
    } else if (
      !isDeleting &&
      displayText.length === currentPhrase.length
    ) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(
          currentPhrase.substring(0, displayText.length - 1)
        );
      }, 45);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  // =====================================================
  // NUMBER COUNTING ANIMATION
  // =====================================================
  const [liquidity, setLiquidity] = useState(0);
  const [collateral, setCollateral] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [health, setHealth] = useState(0);
  const [numbersStarted, setNumbersStarted] = useState(false);

  useEffect(() => {
    // Small delay so the Hero visual appears first
    const startTimer = setTimeout(() => {
      setNumbersStarted(true);
    }, 450);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!numbersStarted) return;

    const duration = 2200;
    const startTime = performance.now();

    let animationFrame;

    const animateNumbers = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      setLiquidity(Math.floor(2450 * easedProgress));

      setCollateral(
        Number((1.25 * easedProgress).toFixed(2))
      );

      setBorrowed(
        Math.floor(2450 * easedProgress)
      );

      setHealth(
        Math.floor(78 * easedProgress)
      );

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animateNumbers);
      } else {
        setLiquidity(2450);
        setCollateral(1.25);
        setBorrowed(2450);
        setHealth(78);
      }
    };

    animationFrame =
      requestAnimationFrame(animateNumbers);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [numbersStarted]);

  // =====================================================
  // SHINING STARS
  // =====================================================
  const stars = [
    {
      top: "12%",
      left: "7%",
      size: "2px",
      delay: "0s",
      duration: "2.8s",
    },
    {
      top: "20%",
      left: "22%",
      size: "3px",
      delay: "1.2s",
      duration: "3.5s",
    },
    {
      top: "9%",
      left: "42%",
      size: "2px",
      delay: "0.6s",
      duration: "2.5s",
    },
    {
      top: "28%",
      left: "53%",
      size: "2px",
      delay: "2s",
      duration: "4s",
    },
    {
      top: "15%",
      left: "68%",
      size: "3px",
      delay: "0.3s",
      duration: "3.2s",
    },
    {
      top: "34%",
      left: "88%",
      size: "2px",
      delay: "1.7s",
      duration: "2.7s",
    },
    {
      top: "47%",
      left: "5%",
      size: "2px",
      delay: "2.5s",
      duration: "3.8s",
    },
    {
      top: "55%",
      left: "28%",
      size: "3px",
      delay: "0.9s",
      duration: "3s",
    },
    {
      top: "63%",
      left: "48%",
      size: "2px",
      delay: "1.5s",
      duration: "3.6s",
    },
    {
      top: "72%",
      left: "76%",
      size: "3px",
      delay: "0.2s",
      duration: "2.9s",
    },
    {
      top: "82%",
      left: "15%",
      size: "2px",
      delay: "2.2s",
      duration: "3.4s",
    },
    {
      top: "88%",
      left: "62%",
      size: "2px",
      delay: "1s",
      duration: "2.6s",
    },
    {
      top: "42%",
      left: "94%",
      size: "2px",
      delay: "2.8s",
      duration: "3.7s",
    },
    {
      top: "76%",
      left: "38%",
      size: "2px",
      delay: "0.5s",
      duration: "3.1s",
    },
    {
      top: "24%",
      left: "78%",
      size: "2px",
      delay: "1.9s",
      duration: "4.2s",
    },
  ];

  return (
    <>
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative min-h-screen overflow-hidden bg-[#080908] text-white">

        {/* =====================================================
            BACKGROUND GLOW
        ====================================================== */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[25%] h-[320px] w-[320px] rounded-full bg-[#6DD054]/10 blur-[120px]" />

          <div className="absolute right-[5%] top-[18%] h-[400px] w-[400px] rounded-full bg-[#6DD054]/[0.07] blur-[140px]" />
        </div>

        {/* =====================================================
            SHINING STARS
        ====================================================== */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          {stars.map((star, index) => (
            <span
              key={index}
              className="absolute rounded-full bg-white animate-[twinkle_ease-in-out_infinite]"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            />
          ))}
        </div>

        {/* =====================================================
            SUBTLE GRID
        ====================================================== */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[2]
            opacity-[0.035]
            bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
            bg-[size:55px_55px]
          "
        />

        {/* =====================================================
            MAIN HERO
        ====================================================== */}
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

              {/* STATUS BADGE */}
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

              {/* HEADING */}
              <h1
                className="
                  text-4xl
                  font-black
                  text-center
                  md:text-left
                  leading-[1.05]
                  tracking-[-0.04em]
                  sm:text-5xl
                  md:text-6xl
                  lg:text-[68px]
                "
              >
                Unlock liquidity

                <span className="block min-h-[1.1em] text-[#6DD054]">
                  {displayText}

                  <span
                    className="
                      ml-1
                      inline-block
                      h-[0.8em]
                      w-[3px]
                      translate-y-[2px]
                      animate-pulse
                      rounded-full
                      bg-[#6DD054]
                    "
                  />
                </span>
              </h1>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-7
                  max-w-xl
                  text-sm
                  text-center
                  md:text-left
                  leading-7
                  text-white/50
                  sm:text-base
                  sm:leading-8
                "
              >
                MiniLend lets you stake your digital assets, borrow
                stablecoins, and keep your staking rewards. No credit
                checks. No middlemen. Just decentralized access to
                liquidity.
              </p>

              {/* BUTTONS */}
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

              {/* TRUST POINTS */}
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

              {/* OUTER GLOW */}
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[280px]
                  w-[280px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[#6DD054]/10
                  blur-[100px]
                "
              />

              {/* =================================================
                  MAIN CARD
              ================================================== */}
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

                {/* CARD TOP */}
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

                {/* =================================================
                    BALANCE
                ================================================== */}
                <div className="py-7">

                  <p className="text-xs text-white/35">
                    Available liquidity
                  </p>

                  <div className="mt-2 flex items-end gap-2">

                    <span
                      className="
                        text-4xl
                        font-bold
                        tracking-tight
                        text-white
                        sm:text-5xl
                        tabular-nums
                        transition-all
                        duration-300
                      "
                    >
                      {liquidity.toLocaleString()}
                    </span>

                    <span className="mb-1 text-sm font-semibold text-[#6DD054]">
                      USDT
                    </span>

                  </div>

                  <p className="mt-2 text-xs text-white/30">
                    Borrow against your staked assets
                  </p>

                </div>

                {/* =================================================
                    COLLATERAL / LOAN
                ================================================== */}
                <div className="grid gap-3 sm:grid-cols-2">

                  {/* COLLATERAL */}
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">

                    <div className="flex items-center justify-between">

                      <span className="text-xs text-white/35">
                        Collateral
                      </span>

                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#627EEA]/10 text-xs font-bold text-[#627EEA]">
                        Ξ
                      </span>

                    </div>

                    <p className="mt-4 text-lg font-bold text-white tabular-nums">
                      {collateral.toFixed(2)} ETH
                    </p>

                    <p className="mt-1 text-[10px] text-white/30">
                      Staked asset
                    </p>

                  </div>

                  {/* BORROWED */}
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">

                    <div className="flex items-center justify-between">

                      <span className="text-xs text-white/35">
                        Borrowed
                      </span>

                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#6DD054]/10 text-[10px] font-bold text-[#6DD054]">
                        $
                      </span>

                    </div>

                    <p className="mt-4 text-lg font-bold text-white tabular-nums">
                      {borrowed.toLocaleString()} USDT
                    </p>

                    <p className="mt-1 text-[10px] text-white/30">
                      Stablecoin loan
                    </p>

                  </div>

                </div>

                {/* =================================================
                    HEALTH BAR
                ================================================== */}
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

                    <div
                      className="
                        h-full
                        rounded-full
                        bg-[#6DD054]
                        shadow-[0_0_12px_rgba(109,208,84,0.45)]
                        transition-all
                        duration-100
                      "
                      style={{
                        width: `${health}%`,
                      }}
                    />

                  </div>

                  <div className="mt-2 flex justify-between text-[9px] text-white/25">

                    <span>Safe</span>

                    <span>{health}%</span>

                    <span>Liquidation</span>

                  </div>

                </div>

                {/* =================================================
                    BOTTOM ACTION
                ================================================== */}
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

              {/* =================================================
                  FLOATING CARD
              ================================================== */}
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

              {/* =================================================
                  FLOATING STATUS
              ================================================== */}
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

        {/* =====================================================
            BOTTOM FADE
        ====================================================== */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080908] to-transparent" />

        {/* =====================================================
            ANIMATIONS
        ====================================================== */}
        <style>
          {`
            @keyframes twinkle {
              0%, 100% {
                opacity: 0.15;
                transform: scale(0.7);
              }

              50% {
                opacity: 1;
                transform: scale(1.5);
              }
            }
          `}
        </style>

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

            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close wallet modal"
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
              id="connectWalletBtn"
              className="
                group
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
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#7ae360]
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

            {/* TERMS */}
            <p className="mt-4 text-center text-[10px] leading-5 text-white/25">

              By connecting, you agree to our{" "}

              <a
                href="#"
                className="text-white/50 underline underline-offset-2 hover:text-white"
              >
                Terms of Use
              </a>

              {" "}and{" "}

              <a
                href="#"
                className="text-white/50 underline underline-offset-2 hover:text-white"
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

