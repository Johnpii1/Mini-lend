import { useState } from "react";
import {
  FiHelpCircle,
  FiPlus,
  FiMinus,
} from "react-icons/fi";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is MiniLend?",
      answer:
        "MiniLend is a decentralized lending platform that allows users to stake supported digital assets and borrow stablecoins against their collateral.",
    },
    {
      question: "How does MiniLend work?",
      answer:
        "Users deposit supported digital assets as collateral and can borrow stablecoins against them based on the protocol's collateralization requirements. Interest accrues over time, and users can repay their loan to recover their collateral.",
    },
    {
      question: "What happens if my position gets liquidated?",
      answer:
        "If the value of your collateral falls below the required safety threshold, your position may become eligible for liquidation. Users can monitor their position and add collateral or repay their debt to help avoid liquidation.",
    },
    {
      question: "Is MiniLend secure?",
      answer:
        "MiniLend is designed around smart contracts with explicit risk parameters, validation checks, and transparent lending logic. However, decentralized protocols still carry smart-contract and market risks.",
    },
    {
      question: "How is interest calculated?",
      answer:
        "Interest accrues over time based on the borrowed amount, applicable interest rate, and elapsed time. Your outstanding debt can be monitored through the protocol interface.",
    },
    {
      question: "What assets are supported?",
      answer:
        "MiniLend currently supports selected assets for collateral and borrowing. Supported assets and networks may change as the protocol develops.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-[#080908] py-24 text-white"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#6DD054]/20
              bg-[#6DD054]/[0.05]
              px-4
              py-2
              text-xs
              font-medium
              text-[#6DD054]
            "
          >
            <FiHelpCircle />
            Frequently Asked Questions
          </div>

          <h2
            className="
              logo
              mt-6
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-semibold
              leading-tight
            "
          >
            Everything you need to know
            <span className="text-[#6DD054]">
              {" "}about MiniLend.
            </span>
          </h2>

          <p className="logo mt-5 text-sm sm:text-base leading-7 text-white/45">
            Find answers to common questions about borrowing,
            collateral, interest, security, and supported assets.
          </p>

        </div>

        {/* FAQ LIST */}
        <div className="space-y-3">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`
                  overflow-hidden
                  rounded-2xl
                  border
                  transition-all
                  duration-300
                  ${
                    isOpen
                      ? "border-[#6DD054]/25 bg-white/[0.035]"
                      : "border-white/[0.08] bg-white/[0.02]"
                  }
                `}
              >

                {/* QUESTION */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-5
                    px-5
                    py-5
                    text-left
                    sm:px-6
                  "
                >

                  <div className="flex items-center gap-4">

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#6DD054]/10
                        text-[#6DD054]
                      "
                    >
                      <FiHelpCircle className="text-sm" />
                    </span>

                    <span className="logo text-sm sm:text-base font-medium text-white">
                      {faq.question}
                    </span>

                  </div>

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-white/10
                      text-white/40
                      transition-all
                      group-hover:border-[#6DD054]/20
                      group-hover:text-[#6DD054]
                    "
                  >
                    {isOpen ? (
                      <FiMinus className="text-sm" />
                    ) : (
                      <FiPlus className="text-sm" />
                    )}
                  </span>

                </button>

                {/* ANSWER */}
                <div
                  className={`
                    grid
                    transition-all
                    duration-300
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">

                    <p
                      className="
                        logo
                        px-5
                        pb-6
                        pl-[4.5rem]
                        pr-6
                        text-sm
                        leading-7
                        text-white/45
                        sm:pl-[4.75rem]
                      "
                    >
                      {faq.answer}
                    </p>

                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}