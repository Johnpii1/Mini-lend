
import { FiArrowLeft, FiFileText, FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function TermsOfUse() {
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
                Terms of Use
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
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6DD054]/10 text-[#6DD054]">
          <FiFileText size={25} />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6DD054]">
          Legal
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Terms of Use
        </h1>

        <p className="mt-4 text-sm text-zinc-500">
          Last updated: August 31, 2026
        </p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-xl font-bold">1. Acceptance of Terms</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              By accessing or interacting with MiniLend, you acknowledge that
              you have read, understood, and agree to these Terms of Use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">2. Use of the Protocol</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              MiniLend provides a decentralized interface for interacting with
              blockchain-based lending functionality. Users are responsible for
              understanding the transactions they approve and the assets they
              interact with.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">3. Wallet Responsibility</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Users are responsible for maintaining the security of their
              wallets, private keys, recovery phrases, and connected devices.
              MiniLend will never ask users to disclose private keys or recovery
              phrases.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">4. Transactions</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Blockchain transactions may be irreversible. Users should verify
              transaction details, destination addresses, amounts, fees, and
              other relevant information before approving transactions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">5. No Financial Advice</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Information provided through MiniLend is for informational and
              technical purposes only. Nothing on the platform should be
              considered financial, investment, legal, or tax advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">6. Availability</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              MiniLend may experience interruptions, maintenance periods,
              blockchain network issues, or other technical limitations. No
              guarantee is made that the application will always be available.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">7. Limitation of Liability</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Users acknowledge that interacting with decentralized protocols
              involves technical, financial, market, and blockchain-related
              risks. Users should independently evaluate these risks before
              using MiniLend.
            </p>
          </section>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <Link
            to="/risk-disclosure"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6DD054] hover:text-white"
          >
            Read Risk Disclosure
            <FiArrowUpRight size={15} />
          </Link>
        </div>
      </main>
    </div>
  );
}

