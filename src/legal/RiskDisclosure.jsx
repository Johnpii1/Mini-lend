
import { FiArrowLeft, FiAlertTriangle, FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function RiskDisclosure() {
  return (
    <div className="min-h-screen bg-[#070807] text-white">
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

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#070807]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#6DD054]/20 bg-[#6DD054]/10">
              <span className="text-sm font-black text-[#6DD054]">M</span>
            </div>

            <div>
              <p className="text-sm font-bold">
                Mini<span className="text-[#6DD054]">Lend</span>
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                Risk Disclosure
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:border-white/20 hover:text-white"
          >
            <FiArrowLeft size={15} />
            Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8">
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-400">
          <FiAlertTriangle size={25} />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6DD054]">
          Legal
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Risk Disclosure
        </h1>

        <p className="mt-4 text-sm text-zinc-500">
          Last updated: August 31, 2026
        </p>

        <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.04] p-6">
          <h2 className="text-sm font-semibold text-yellow-400">
            Important Notice
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            DeFi and digital assets involve significant risks. You should not
            use funds that you cannot afford to lose.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-xl font-bold">1. Market Risk</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Digital asset prices can be highly volatile. Changes in asset
              prices can significantly affect the value of collateral,
              supplied assets, and outstanding borrowing positions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">2. Liquidation Risk</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Borrowing positions may become eligible for liquidation if the
              value of collateral falls below applicable protocol requirements.
              Users may lose part or all of their collateral in such situations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">3. Smart Contract Risk</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Smart contracts are software and may contain vulnerabilities,
              bugs, configuration errors, or unexpected behavior. Such issues
              may result in loss of digital assets.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">4. Liquidity Risk</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Available liquidity may change over time. Users may not always be
              able to borrow or withdraw the exact amount they expect at a
              particular moment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">5. Blockchain Network Risk</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Network congestion, outages, failed transactions, high fees, or
              changes to the underlying blockchain may affect interactions with
              MiniLend.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">6. Wallet Security</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Users are responsible for protecting their wallets and private
              credentials. Losing a private key or recovery phrase may result
              in permanent loss of access to digital assets.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">7. No Guarantee of Returns</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Participation in decentralized lending does not guarantee profits
              or a particular rate of return. Market conditions and protocol
              parameters can change.
            </p>
          </section>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <Link
            to="/docs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6DD054] hover:text-white"
          >
            Read Documentation
            <FiArrowUpRight size={15} />
          </Link>
        </div>
      </main>
    </div>
  );
}

