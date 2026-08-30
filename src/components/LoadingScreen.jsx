
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState("wallet");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Wallet appears first
    const coinTimer = setTimeout(() => {
      setPhase("coin");
    }, 650);

    // Logo appears after coin movement
    const logoTimer = setTimeout(() => {
      setPhase("logo");
    }, 1250);

    // Start exiting
    const exitTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1900);

    // Remove loading screen
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2250);

    return () => {
      clearTimeout(coinTimer);
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-[#080908]
        transition-all
        duration-300
        ease-out
        ${
          fadeOut
            ? "opacity-0 scale-[1.03]"
            : "opacity-100 scale-100"
        }
      `}
    >
      {/* =====================================================
          BACKGROUND GRID
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.10]
          bg-[linear-gradient(to_right,rgba(109,208,84,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(109,208,84,0.18)_1px,transparent_1px)]
          bg-[size:55px_55px]
        "
      />

      {/* =====================================================
          SECONDARY FINE GRID
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)]
          bg-[size:11px_11px]
        "
      />

      {/* =====================================================
          GRID CENTER GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_0%,transparent_35%,#080908_82%)]
        "
      />

      {/* =====================================================
          GREEN ATMOSPHERIC GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[280px]
          h-[280px]
          rounded-full
          bg-[#6DD054]/[0.06]
          blur-[90px]
          animate-pulse
        "
      />

      {/* =====================================================
          SECONDARY GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[120px]
          h-[120px]
          rounded-full
          bg-[#6DD054]/[0.08]
          blur-[55px]
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 flex flex-col items-center">

        {/* =================================================
            WALLET SCENE
        ================================================== */}

        <div className="relative w-[180px] h-[150px]">

          {/* WALLET GLOW */}

          <div
            className={`
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-24
              h-24
              rounded-full
              bg-[#6DD054]/15
              blur-2xl
              transition-all
              duration-500

              ${
                phase === "coin"
                  ? "scale-125 opacity-100"
                  : "scale-100 opacity-50"
              }
            `}
          />

          {/* =================================================
              COIN
          ================================================== */}

          <div
            className={`
              absolute
              left-1/2
              top-[32px]
              -translate-x-1/2
              z-20
              w-[38px]
              h-[38px]
              rounded-full
              border
              border-[#b9f0a8]/70
              bg-[#6DD054]
              shadow-[0_0_25px_rgba(109,208,84,0.55)]
              flex
              items-center
              justify-center
              transition-all
              duration-500
              ease-out

              ${
                phase === "wallet"
                  ? "translate-y-[45px] scale-75 opacity-0"
                  : phase === "coin"
                  ? "-translate-y-[8px] scale-100 opacity-100"
                  : "-translate-y-[38px] scale-90 opacity-0"
              }
            `}
          >
            <span
              className="
                text-[#0b1609]
                font-bold
                text-sm
              "
            >
              $
            </span>
          </div>

          {/* =================================================
              COIN TRAIL
          ================================================== */}

          <div
            className={`
              absolute
              left-1/2
              top-[45px]
              -translate-x-1/2
              w-px
              bg-gradient-to-t
              from-[#6DD054]/0
              via-[#6DD054]/50
              to-[#6DD054]/0
              transition-all
              duration-500

              ${
                phase === "coin"
                  ? "h-[50px] opacity-100"
                  : "h-0 opacity-0"
              }
            `}
          />

          {/* =================================================
              WALLET BACK
          ================================================== */}

          <div
            className="
              absolute
              left-1/2
              bottom-[25px]
              -translate-x-1/2
              w-[105px]
              h-[60px]
              rounded-[14px]
              border
              border-white/10
              bg-[#111411]
              shadow-[0_15px_40px_rgba(0,0,0,0.5)]
            "
          />

          {/* =================================================
              WALLET FRONT
          ================================================== */}

          <div
            className="
              absolute
              left-1/2
              bottom-[18px]
              -translate-x-1/2
              w-[115px]
              h-[55px]
              rounded-[14px]
              border
              border-[#6DD054]/20
              bg-[#151815]
              shadow-[0_15px_35px_rgba(0,0,0,0.45)]
              overflow-hidden
            "
          >

            {/* WALLET HIGHLIGHT */}

            <div
              className="
                absolute
                inset-x-0
                top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-[#6DD054]/40
                to-transparent
              "
            />

            {/* CARD SLOT */}

            <div
              className="
                absolute
                left-4
                top-4
                w-8
                h-1
                rounded-full
                bg-white/10
              "
            />

            {/* WALLET DOT */}

            <div
              className="
                absolute
                right-4
                top-3
                w-2
                h-2
                rounded-full
                bg-[#6DD054]/60
                shadow-[0_0_8px_rgba(109,208,84,0.5)]
              "
            />

            {/* WALLET STRIPE */}

            <div
              className="
                absolute
                left-0
                right-0
                bottom-3
                h-px
                bg-white/[0.05]
              "
            />
          </div>

          {/* =================================================
              WALLET TOP FLAP
          ================================================== */}

          <div
            className="
              absolute
              left-1/2
              bottom-[65px]
              -translate-x-1/2
              w-[105px]
              h-[22px]
              rounded-t-[12px]
              border-t
              border-x
              border-[#6DD054]/15
              bg-[#101310]
            "
          />
        </div>

        {/* =================================================
            MINI LEND LOGO
        ================================================== */}

        <div
          className={`
            flex
            flex-col
            items-center
            transition-all
            duration-500

            ${
              phase === "logo"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }
          `}
        >
          <div className="flex items-center gap-2">

            <span
              className="
                text-white
                font-bold
                tracking-[0.16em]
                text-lg
              "
            >
              MINI
            </span>

            <span
              className="
                text-[#6DD054]
                font-bold
                tracking-[0.16em]
                text-lg
              "
            >
              LEND
            </span>

          </div>

          <p
            className="
              mt-2
              text-[9px]
              uppercase
              tracking-[0.28em]
              text-white/25
            "
          >
            Decentralized Lending
          </p>
        </div>

        {/* =================================================
            LOADING INDICATOR
        ================================================== */}

        <div
          className={`
            mt-7
            flex
            items-center
            gap-1.5
            transition-opacity
            duration-300

            ${
              phase === "logo"
                ? "opacity-0"
                : "opacity-100"
            }
          `}
        >

          <span
            className="
              w-1.5
              h-1.5
              rounded-full
              bg-[#6DD054]
              animate-pulse
            "
          />

          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/25
            "
          >
            Securing liquidity
          </span>

        </div>
      </div>

      {/* =====================================================
          CUSTOM ANIMATIONS
      ====================================================== */}

      <style>
        {`
          @keyframes walletFloat {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-4px);
            }
          }
        `}
      </style>
    </div>
  );
}



