import { useState } from "react";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiStar,
  FiCheckCircle,
  FiShield,
  FiX,
} from "react-icons/fi";
import benefit from "../assets/benefit.png";

export default function Benefits() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* =====================================================
          BENEFITS SECTION
      ====================================================== */}
      <section className="bg-[#080908] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* =====================================================
              MAIN SECTION HEADING
          ====================================================== */}
          <div className="text-center max-w-2xl mx-auto mb-14">

            <p className="logo text-[#6DD054] text-xs tracking-[0.2em] uppercase mb-3">
              Why MiniLend
            </p>

            <h2 className="logo text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Built to make
              <span className="text-[#6DD054]">
                {" "}crypto lending simple.
              </span>
            </h2>

            <p className="logo text-white/50 text-sm md:text-base leading-relaxed mt-4">
              Access liquidity without giving up your crypto.
              MiniLend gives you a simple and secure way to borrow
              while keeping your assets working for you.
            </p>

          </div>


          {/* =====================================================
              MAIN CONTENT
          ====================================================== */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-14">

            {/* =================================================
                LEFT
            ================================================== */}
            <div className="w-full max-w-md">

              <h3 className="logo text-white text-2xl md:text-3xl text-center mb-8">
                Benefits of choosing us
              </h3>

              {/* IMAGE CARD */}
              <div className="flex items-center justify-center">

              

                  {/* IMAGE RING */}
                  

                 <img
  src={benefit}
  alt="MiniLend crypto lending"
  className="relative w-60 sm:w-80 h-[200px] md:w-100 object-contain"
/>
                </div>

             

            </div>


            {/* =================================================
                RIGHT
            ================================================== */}
            <div className="w-full max-w-lg text-white">

              {/* LABEL */}
              <p className="logo text-[#6DD054] text-xs tracking-[0.2em] uppercase mb-4">
                Why MiniLend
              </p>


              {/* HEADING */}
              <h3 className="logo text-3xl md:text-4xl font-semibold leading-tight">
                Access liquidity without
                <span className="text-[#6DD054]">
                  {" "}selling your crypto.
                </span>
              </h3>


              {/* DESCRIPTION */}
              <p className="logo text-white/70 leading-relaxed mt-6">
                MiniLend lets you stake your crypto to get instant stablecoin
                loans while still earning rewards. It's secure, easy to use,
                and designed to make decentralized borrowing simple.
              </p>


              {/* =================================================
                  BENEFIT POINTS
              ================================================== */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">

                {/* BENEFIT 1 */}
                <div className="flex items-center gap-3">

                  <div className="w-8 h-8 rounded-lg bg-[#6DD054]/10 flex items-center justify-center shrink-0">
                    <FiCheckCircle className="text-[#6DD054] text-sm" />
                  </div>

                  <span className="logo text-sm text-white/80">
                    Keep your assets
                  </span>

                </div>


                {/* BENEFIT 2 */}
                <div className="flex items-center gap-3">

                  <div className="w-8 h-8 rounded-lg bg-[#6DD054]/10 flex items-center justify-center shrink-0">
                    <FiCheckCircle className="text-[#6DD054] text-sm" />
                  </div>

                  <span className="logo text-sm text-white/80">
                    Access stablecoins
                  </span>

                </div>


                {/* BENEFIT 3 */}
                <div className="flex items-center gap-3">

                  <div className="w-8 h-8 rounded-lg bg-[#6DD054]/10 flex items-center justify-center shrink-0">
                    <FiCheckCircle className="text-[#6DD054] text-sm" />
                  </div>

                  <span className="logo text-sm text-white/80">
                    Stay in control
                  </span>

                </div>


                {/* BENEFIT 4 */}
                <div className="flex items-center gap-3">

                  <div className="w-8 h-8 rounded-lg bg-[#6DD054]/10 flex items-center justify-center shrink-0">
                    <FiCheckCircle className="text-[#6DD054] text-sm" />
                  </div>

                  <span className="logo text-sm text-white/80">
                    Simple borrowing
                  </span>

                </div>

              </div>


              {/* =================================================
                  CTA
              ================================================== */}
              <div className="flex justify-start">

                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="
                    logo
                    group
                    flex
                    items-center
                    gap-3
                    text-[#6DD054]
                    text-xs
                    border
                    border-[#6DD054]/50
                    rounded-[14px]
                    px-8
                    h-[42px]
                    mt-9
                    hover:bg-[#6DD054]
                    hover:text-black
                    hover:-translate-y-0.5
                    transition-all
                    duration-300
                  "
                >
                  GET STARTED

                  <FiArrowRight
                    className="
                      text-sm
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </button>

              </div>


              {/* =================================================
                  TESTIMONIAL
              ================================================== */}
              <div
                className="
                  mt-10
                  p-5
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/10
                "
              >

                {/* STARS */}
                <div className="flex gap-1 text-[#6DD054] mb-3">

                  <FiStar className="text-sm fill-current" />
                  <FiStar className="text-sm fill-current" />
                  <FiStar className="text-sm fill-current" />
                  <FiStar className="text-sm fill-current" />
                  <FiStar className="text-sm fill-current" />

                </div>


                {/* QUOTE */}
                <p className="logo text-sm leading-relaxed text-white/70">
                  "MiniLend makes accessing liquidity feel simple. I don't
                  have to sell my crypto just because I need stablecoins."
                </p>


                {/* USER */}
                <div className="flex items-center gap-3 mt-4">

                  <div
                    className="
                      w-9
                      h-9
                      rounded-full
                      bg-[#6DD054]/10
                      border
                      border-[#6DD054]/20
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <span className="logo text-xs text-[#6DD054]">
                      M
                    </span>
                  </div>


                  <div>

                    <p className="logo text-xs font-semibold text-white">
                      MiniLend User
                    </p>

                    <p className="logo text-[10px] text-white/40">
                      Early Access User
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
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

            {/* CLOSE BUTTON */}
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


            {/* CONNECT WALLET */}
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
                hover:bg-[#7ae360]
                hover:-translate-y-0.5
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
              </a>{" "}
              and{" "}
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