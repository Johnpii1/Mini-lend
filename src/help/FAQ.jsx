
import {
  FiArrowLeft,
  FiChevronDown,
  FiHelpCircle,
} from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function FAQ() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is MiniLend?",
      answer:
        "MiniLend is a decentralized lending platform that allows users to stake ETH as collateral, borrow supported assets, repay debt and manage their lending positions.",
    },
    {
      question: "How do I stake ETH?",
      answer:
        "Connect your wallet, open the Dashboard and select Stake from Quick Actions. Enter the amount of ETH you want to stake and confirm the transaction in your wallet.",
    },
    {
      question: "What is collateral?",
      answer:
        "Collateral is the asset you deposit to secure a loan. On MiniLend, ETH can be used as collateral when borrowing supported assets.",
    },
    {
      question: "How do I borrow?",
      answer:
        "After supplying enough collateral, select Borrow from Quick Actions, enter the amount you want to borrow and confirm the transaction through your connected wallet.",
    },
    {
      question: "How do I repay my debt?",
      answer:
        "Open the Repay action from your Dashboard, enter the amount you want to repay and confirm the transaction in your wallet.",
    },
    {
      question: "Can I withdraw my collateral?",
      answer:
        "Yes. You can withdraw available collateral as long as the withdrawal does not make your lending position unsafe.",
    },
    {
      question: "What happens if my position becomes unhealthy?",
      answer:
        "If your collateral value falls too low compared with your borrowed amount, your position may become eligible for liquidation. Keep an eye on your health factor.",
    },
    {
      question: "How do I connect my wallet?",
      answer:
        "Use the Connect Wallet button in the MiniLend interface and select a supported wallet. Once connected, your wallet address and position can be displayed on the Dashboard.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* HEADER */}
      <header className="border-b border-white/[0.07] bg-[#0d0d0d]">
        <div className="px-5 py-5 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() => navigate("/help")}
            className="
              flex items-center gap-2
              text-sm text-white/50
              hover:text-[#6DD054]
              transition
            "
          >
            <FiArrowLeft size={16} />
            Back to Help Center
          </button>

          <div className="mt-6">

            <p className="text-xs text-[#6DD054] font-medium uppercase tracking-wider">
              Support
            </p>

            <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h1>

            <p className="mt-2 text-sm text-white/40 max-w-xl">
              Find answers to common questions about using MiniLend.
            </p>

          </div>

        </div>
      </header>

      {/* CONTENT */}
      <main className="px-5 py-6 sm:px-6 lg:px-8 lg:py-8">

        <div className="max-w-3xl">

          {/* FAQ ICON */}
          <div
            className="
              w-12 h-12
              rounded-2xl
              bg-[#6DD054]/10
              border border-[#6DD054]/15
              flex items-center justify-center
              text-[#6DD054]
              mb-6
            "
          >
            <FiHelpCircle size={21} />
          </div>

          {/* FAQ LIST */}
          <div className="space-y-3">

            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#111111]
                    overflow-hidden
                  "
                >

                  {/* QUESTION */}
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="
                      w-full
                      flex
                      items-center
                      justify-between
                      gap-4
                      p-5
                      text-left
                      hover:bg-white/[0.03]
                      transition
                    "
                  >

                    <span className="text-sm font-semibold">
                      {faq.question}
                    </span>

                    <FiChevronDown
                      size={18}
                      className={`
                        shrink-0
                        text-white/30
                        transition-transform
                        duration-200
                        ${isOpen ? "rotate-180 text-[#6DD054]" : ""}
                      `}
                    />

                  </button>

                  {/* ANSWER */}
                  {isOpen && (
                    <div className="px-5 pb-5">

                      <div className="pt-4 border-t border-white/[0.06]">

                        <p className="text-sm leading-6 text-white/45">
                          {faq.answer}
                        </p>

                      </div>

                    </div>
                  )}

                </div>
              );
            })}

          </div>

          {/* SUPPORT FOOTER */}
          <div
            className="
              mt-6
              rounded-2xl
              border
              border-[#6DD054]/15
              bg-[#6DD054]/[0.04]
              p-5
            "
          >

            <h2 className="text-sm font-semibold">
              Still need help?
            </h2>

            <p className="mt-1 text-xs text-white/35">
              If you cannot find the answer you are looking for,
              contact MiniLend support.
            </p>

            <button
              type="button"
              onClick={() => navigate("/help")}
              className="
                mt-4
                text-xs
                font-semibold
                text-[#6DD054]
                hover:text-white
                transition
              "
            >
              Contact Support →
            </button>

          </div>

        </div>

      </main>
<Footer />
    </div>
  );
}

