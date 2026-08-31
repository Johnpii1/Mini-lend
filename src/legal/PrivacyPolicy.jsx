
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiBookOpen,
  FiShield,
  FiLock,
  FiDatabase,
  FiMail,
} from "react-icons/fi";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#070807] text-white">
      {/* BACKGROUND */}
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

      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#070807]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#6DD054]/20 bg-[#6DD054]/10">
              <span className="text-sm font-black text-[#6DD054]">M</span>
            </div>

            <div>
              <p className="text-sm font-bold tracking-wide">
                Mini<span className="text-[#6DD054]">Lend</span>
              </p>

              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                Privacy Policy
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
          >
            <FiArrowLeft size={15} />
            Back to MiniLend
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <main className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8">
        {/* HEADER */}
        <div className="border-b border-white/10 pb-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#6DD054]/20 bg-[#6DD054]/10 px-3 py-1.5 text-xs font-medium text-[#6DD054]">
            <FiShield size={13} />
            Legal
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
            This Privacy Policy explains how MiniLend handles information
            when you access or interact with the MiniLend application,
            website, and related services.
          </p>

          <p className="mt-4 text-xs text-zinc-600">
            Last updated: August 31, 2026
          </p>
        </div>

        {/* 01 */}
        <section className="border-b border-white/10 py-12">
          <div className="mb-5 flex items-center gap-3">
            <FiDatabase className="text-[#6DD054]" />
            <h2 className="text-2xl font-bold">1. Information We Collect</h2>
          </div>

          <div className="space-y-5 text-sm leading-7 text-zinc-400">
            <p>
              MiniLend is designed to operate through blockchain networks and
              user-controlled wallets. We aim to minimize the amount of
              personal information required to use the application.
            </p>

            <p>
              Depending on how you interact with MiniLend, information may
              include publicly available blockchain information, wallet
              addresses, transaction information, and information that you
              voluntarily provide when contacting us.
            </p>

            <p>
              Blockchain transactions may be publicly visible and recorded
              permanently on the applicable blockchain network.
            </p>
          </div>
        </section>

        {/* 02 */}
        <section className="border-b border-white/10 py-12">
          <div className="mb-5 flex items-center gap-3">
            <FiLock className="text-[#6DD054]" />
            <h2 className="text-2xl font-bold">
              2. Wallet Information
            </h2>
          </div>

          <p className="text-sm leading-7 text-zinc-400">
            MiniLend does not request or store your wallet private keys,
            recovery phrases, or wallet passwords. You are responsible for
            protecting your wallet credentials and approving only
            transactions that you understand and intend to execute.
          </p>
        </section>

        {/* 03 */}
        <section className="border-b border-white/10 py-12">
          <h2 className="text-2xl font-bold">3. How Information Is Used</h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-400">
            <p>
              Information may be used to provide and improve the MiniLend
              interface, respond to support requests, monitor application
              performance, detect abuse, and improve security.
            </p>

            <p>
              Public blockchain information may also be used to display
              balances, lending positions, transactions, and other protocol
              information required by the application.
            </p>
          </div>
        </section>

        {/* 04 */}
        <section className="border-b border-white/10 py-12">
          <h2 className="text-2xl font-bold">
            4. Cookies and Analytics
          </h2>

          <p className="mt-5 text-sm leading-7 text-zinc-400">
            MiniLend may use essential technologies and, where applicable,
            analytics tools to understand application usage and improve the
            user experience. Any analytics configuration should be reviewed
            before deployment and should comply with applicable privacy
            requirements.
          </p>
        </section>

        {/* 05 */}
        <section className="border-b border-white/10 py-12">
          <h2 className="text-2xl font-bold">
            5. Third-Party Services
          </h2>

          <p className="mt-5 text-sm leading-7 text-zinc-400">
            MiniLend may interact with third-party infrastructure such as
            blockchain networks, wallet providers, RPC providers, analytics
            services, and other technical infrastructure. Those services may
            have their own privacy policies and terms.
          </p>
        </section>

        {/* 06 */}
        <section className="border-b border-white/10 py-12">
          <h2 className="text-2xl font-bold">
            6. Data Security
          </h2>

          <p className="mt-5 text-sm leading-7 text-zinc-400">
            We take reasonable measures to protect information handled by the
            application. However, no website, blockchain network, wallet, or
            internet transmission can be guaranteed to be completely secure.
          </p>
        </section>

        {/* 07 */}
        <section className="border-b border-white/10 py-12">
          <h2 className="text-2xl font-bold">
            7. Blockchain Transparency
          </h2>

          <p className="mt-5 text-sm leading-7 text-zinc-400">
            Blockchain networks are generally public and transparent. Once a
            transaction is submitted to a blockchain, transaction details may
            be visible to other network participants and may remain publicly
            accessible.
          </p>
        </section>

        {/* 08 */}
        <section className="border-b border-white/10 py-12">
          <h2 className="text-2xl font-bold">
            8. Your Responsibilities
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-400">
            <p>
              You are responsible for maintaining the security of your wallet,
              private keys, recovery phrases, and connected devices.
            </p>

            <p>
              You should carefully review every transaction before signing
              it and should never share private wallet credentials with
              another person or website.
            </p>
          </div>
        </section>

        {/* 09 */}
        <section className="border-b border-white/10 py-12">
          <div className="mb-5 flex items-center gap-3">
            <FiMail className="text-[#6DD054]" />
            <h2 className="text-2xl font-bold">9. Contact</h2>
          </div>

          <p className="text-sm leading-7 text-zinc-400">
            If you have questions about this Privacy Policy or MiniLend's
            handling of information, you can contact the MiniLend team through
            the contact information provided by the project.
          </p>
        </section>

        {/* DISCLAIMER */}
        <section className="pt-12">
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.04] p-6">
            <h3 className="text-sm font-semibold text-yellow-400">
              Important Notice
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              This page is a project-level privacy policy template and should
              be reviewed and adapted to MiniLend's actual data practices,
              legal entity, jurisdictions, analytics providers, cookies, and
              applicable privacy laws before production use.
            </p>
          </div>
        </section>

        {/* NAVIGATION */}
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/terms"
            className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 transition hover:border-[#6DD054]/30 hover:text-white"
          >
            Terms of Use
            <FiArrowUpRight size={15} />
          </Link>

          <Link
            to="/risk-disclosure"
            className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 transition hover:border-[#6DD054]/30 hover:text-white"
          >
            Risk Disclosure
            <FiArrowUpRight size={15} />
          </Link>

          <Link
            to="/docs"
            className="flex items-center gap-2 rounded-xl bg-[#6DD054] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#7ee565]"
          >
            Documentation
            <FiBookOpen size={15} />
          </Link>
        </div>

        {/* FOOTER */}
        <footer className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-3 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} MiniLend. All rights reserved.
            </p>

            <Link
              to="/"
              className="transition hover:text-zinc-300"
            >
              Back to Home
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

