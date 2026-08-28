
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiBookOpen,
  FiHelpCircle,
  FiMessageCircle,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import Footer from "../components/Footer";

export default function HelpCenter() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is MiniLend?",
      answer:
        "MiniLend is a decentralized lending platform that allows you to stake ETH as collateral, borrow supported assets and manage your lending position.",
    },
    {
      question: "How does staking work?",
      answer:
        "You deposit ETH into MiniLend as collateral. Your collateral helps secure your borrowing position and determines how much you can borrow.",
    },
    {
      question: "How do I borrow assets?",
      answer:
        "Open the Borrow action from your dashboard, select the asset and amount you want to borrow, review the position details and confirm the transaction with your wallet.",
    },
    {
      question: "How do I repay my debt?",
      answer:
        "Use the Repay action from your dashboard. Select the amount you want to repay and confirm the transaction through your connected wallet.",
    },
    {
      question: "Can I withdraw my collateral?",
      answer:
        "Yes. You can withdraw available collateral as long as your remaining collateral keeps your lending position within the required health limits.",
    },
    {
      question: "What happens if my position becomes unhealthy?",
      answer:
        "If your collateral value falls too far relative to your borrowed amount, your position may become eligible for liquidation. Monitor your health factor regularly.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-white/[0.07] bg-[#0d0d0d]">

        <div className="px-5 py-5 sm:px-6 lg:px-8">

          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-[#111111]
              px-3.5
              py-2
              text-sm
              font-medium
              text-white/60
              hover:text-white
              hover:border-[#6DD054]/30
              hover:bg-[#151515]
              transition-all
              duration-200
            "
          >
            <FiArrowLeft
              size={16}
              className="
                transition-transform
                duration-200
                group-hover:-translate-x-0.5
              "
            />

            Back to Dashboard
          </button>


          {/* HEADER CONTENT */}

          <div className="mt-7 max-w-5xl mx-auto text-left">

            <p
              className="
                text-xs
                sm:text-sm
                text-[#6DD054]
                font-medium
                uppercase
                tracking-wider
              "
            >
              Support
            </p>

            <h1
              className="
                mt-1
                text-2xl
                sm:text-3xl
                font-bold
                tracking-tight
              "
            >
              Help Center
            </h1>

            <p
              className="
                mt-2
                text-sm
                text-white/40
                max-w-xl
              "
            >
              Find answers, learn how MiniLend works, or get help
              with your lending position.
            </p>

          </div>

        </div>

      </header>


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <main
        className="
          flex-1
          px-5
          py-6
          sm:px-6
          lg:px-8
          lg:py-10
        "
      >

        {/* CENTERED DESKTOP CONTAINER */}

        <div className="w-full max-w-5xl mx-auto">

          {/* =================================================
              HELP OPTIONS
          ================================================== */}

          <section
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-4
              mb-10
            "
          >

            <HelpCard
              icon={FiBookOpen}
              title="How MiniLend Works"
              description="Learn about staking, borrowing, repayment and withdrawals."
              onClick={() => {}}
            />

            <HelpCard
              icon={FiHelpCircle}
              title="Frequently Asked Questions"
              description="Find answers to common questions about MiniLend."
              onClick={() =>
                document
                  .getElementById("faq")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />

            <HelpCard
              icon={FiMessageCircle}
              title="Contact Support"
              description="Need help? Get in touch with the MiniLend support team."
              onClick={() => {}}
            />

          </section>


          {/* =================================================
              FAQ
          ================================================== */}

          <section id="faq">

            <div className="mb-4">

              <p
                className="
                  text-xs
                  text-[#6DD054]
                  font-medium
                  uppercase
                  tracking-wider
                "
              >
                FAQ
              </p>

              <h2
                className="
                  mt-1
                  text-lg
                  font-semibold
                "
              >
                Frequently Asked Questions
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-white/35
                "
              >
                Quick answers to common MiniLend questions.
              </p>

            </div>


            {/* FAQ CONTAINER */}

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-[#111111]
                overflow-hidden
              "
            >

              {faqs.map((faq, index) => {

                const isOpen = openFaq === index;

                return (
                  <div
                    key={index}
                    className="
                      border-b
                      border-white/[0.07]
                      last:border-b-0
                    "
                  >

                    {/* QUESTION */}

                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="
                        group
                        w-full
                        flex
                        items-center
                        justify-between
                        gap-4
                        px-5
                        py-4
                        text-left
                        hover:bg-white/[0.025]
                        transition
                      "
                    >

                      <span
                        className="
                          text-sm
                          font-medium
                          text-white/80
                          group-hover:text-white
                        "
                      >
                        {faq.question}
                      </span>

                      <FiChevronDown
                        size={17}
                        className={`
                          shrink-0
                          text-white/30
                          transition-transform
                          duration-200
                          ${
                            isOpen
                              ? "rotate-180 text-[#6DD054]"
                              : ""
                          }
                        `}
                      />

                    </button>


                    {/* ANSWER */}

                    {isOpen && (
                      <div
                        className="
                          px-5
                          pb-5
                          pr-12
                        "
                      >
                        <p
                          className="
                            text-sm
                            leading-6
                            text-white/40
                          "
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          </section>

        </div>

      </main>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

    </div>
  );
}


/* =========================================================
   HELP CARD
========================================================= */

function HelpCard({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        w-full
        text-left
        rounded-2xl
        border
        border-white/10
        bg-[#111111]
        p-5
        transition-all
        duration-200
        hover:bg-[#151515]
        hover:border-[#6DD054]/25
      "
    >

      <div className="flex items-start justify-between gap-4">

        {/* ICON */}

        <div
          className="
            w-11
            h-11
            shrink-0
            rounded-xl
            bg-[#6DD054]/10
            border
            border-[#6DD054]/15
            flex
            items-center
            justify-center
            text-[#6DD054]
          "
        >
          <Icon size={19} />
        </div>


        {/* ARROW */}

        <FiChevronRight
          size={18}
          className="
            mt-1
            shrink-0
            text-white/20
            group-hover:text-[#6DD054]
            group-hover:translate-x-0.5
            transition-all
          "
        />

      </div>


      <h2
        className="
          mt-5
          text-sm
          font-semibold
        "
      >
        {title}
      </h2>


      <p
        className="
          mt-1
          text-xs
          leading-5
          text-white/35
        "
      >
        {description}
      </p>

    </button>
  );
}

