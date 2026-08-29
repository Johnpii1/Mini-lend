
import { useEffect, useState } from "react";

export default function WalletTransferAnimation() {
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const start = setInterval(() => {
      setSending(true);

      setTimeout(() => {
        setSending(false);
      }, 1800);
    }, 3500);

    return () => clearInterval(start);
  }, []);

  return (
    <div className="relative w-full max-w-md h-[300px] overflow-hidden rounded-3xl border border-white/10 bg-[#101210]">

      {/* =========================
          BACKGROUND GLOW
      ========================== */}
      <div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6DD054]/10"
        style={{ filter: "blur(60px)" }}
      />


      {/* =========================
          SHINING STARS
      ========================== */}

      <span
        className="absolute left-[18%] top-[25%] h-1 w-1 rounded-full bg-white"
        style={{
          animation: "starGlow 2s ease-in-out infinite",
        }}
      />

      <span
        className="absolute left-[48%] top-[18%] h-1 w-1 rounded-full bg-[#6DD054]"
        style={{
          animation: "starGlow 2.5s ease-in-out infinite",
        }}
      />

      <span
        className="absolute right-[18%] top-[30%] h-1 w-1 rounded-full bg-white"
        style={{
          animation: "starGlow 1.8s ease-in-out infinite",
        }}
      />

      <span
        className="absolute left-[32%] bottom-[25%] h-1 w-1 rounded-full bg-[#6DD054]"
        style={{
          animation: "starGlow 2.2s ease-in-out infinite",
        }}
      />

      <span
        className="absolute right-[35%] bottom-[20%] h-1 w-1 rounded-full bg-white"
        style={{
          animation: "starGlow 2.7s ease-in-out infinite",
        }}
      />


      {/* =========================
          TITLE
      ========================== */}

      <div className="absolute left-6 top-6">

        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
          MiniLend
        </p>

        <p className="mt-1 text-sm font-medium text-white/80">
          Liquidity transfer
        </p>

      </div>


      {/* =========================
          WALLET
      ========================== */}

      <div className="absolute left-8 top-1/2 -translate-y-1/2">

        <div
          className="
            relative
            flex
            h-20
            w-24
            items-center
            justify-center
            rounded-2xl
            border
            border-white/10
            bg-[#252825]
            shadow-[0_15px_40px_rgba(0,0,0,0.4)]
          "
        >

          {/* Wallet flap */}
          <div className="absolute -top-2 left-3 right-3 h-6 rounded-lg border border-white/10 bg-[#303330]" />

          {/* Wallet symbol */}
          <div className="relative z-10 text-2xl text-[#6DD054]">
            ▰
          </div>

        </div>

        <p className="mt-3 text-center text-xs text-white/40">
          Your Wallet
        </p>

      </div>


      {/* =========================
          TRANSFER LINE
      ========================== */}

      <div className="absolute left-[30%] right-[27%] top-1/2 h-px -translate-y-1/2 bg-[#6DD054]/20">

        <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-[#6DD054]/60 to-transparent" />

      </div>


      {/* =========================
          COIN
      ========================== */}

      <div
        className="absolute left-[32%] top-1/2 -translate-y-1/2"
        style={{
          transform: sending
            ? "translate(175px, -50%) scale(1)"
            : "translate(0, -50%) scale(0.7)",
          opacity: sending ? 1 : 0,
          transition:
            "transform 1.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease",
        }}
      >

        <div
          className="
            relative
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border-4
            border-[#6DD054]/60
            bg-[#6DD054]
            text-xl
            font-bold
            text-[#0b1609]
            shadow-[0_0_35px_rgba(109,208,84,0.7)]
          "
        >

          $

          {/* Shine */}
          <span className="absolute left-3 top-2 h-2 w-2 rounded-full bg-white/80" />

        </div>

      </div>


      {/* =========================
          DESTINATION
      ========================== */}

      <div className="absolute right-8 top-1/2 -translate-y-1/2">

        <div
          className="flex h-20 w-20 items-center justify-center rounded-full border border-[#6DD054]/30 bg-[#6DD054]/5"
          style={{
            transform: sending ? "scale(1.12)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        >

          <span className="text-3xl text-[#6DD054]">
            ↑
          </span>

        </div>

        <p className="mt-3 text-center text-xs text-white/40">
          Liquidity
        </p>

      </div>


      {/* =========================
          STATUS
      ========================== */}

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">

        <span className="text-xs text-white/30">
          Secure transfer
        </span>

        <span className="flex items-center gap-2 text-xs text-[#6DD054]">

          <span className="h-2 w-2 rounded-full bg-[#6DD054]" />

          {sending ? "Sending..." : "Ready"}

        </span>

      </div>


      {/* =========================
          CSS FOR STARS
      ========================== */}

      <style>
        {`
          @keyframes starGlow {
            0%, 100% {
              opacity: 0.2;
              transform: scale(0.7);
            }

            50% {
              opacity: 1;
              transform: scale(1.8);
            }
          }
        `}
      </style>

    </div>
  );
}

