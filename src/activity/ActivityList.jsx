
import { useState } from "react";
import {
  FiArrowUpRight,
  FiArrowDownLeft,
  FiPlus,
  FiRefreshCw,
  FiLock,
  FiActivity,
  FiExternalLink,
} from "react-icons/fi";

import TransactionModal from "./TransactionModal";

export default function ActivityList({ filter, search }) {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const transactions = [
    {
      id: 1,
      type: "Stake",
      title: "ETH Staked",
      asset: "ETH",
      amount: "+0.50 ETH",
      status: "Confirmed",
      date: "Today, 10:42 AM",
      hash: "0x8a4f...92bd",
      icon: FiLock,
      positive: true,
    },
    {
      id: 2,
      type: "Borrow",
      title: "USDC Borrowed",
      asset: "USDC",
      amount: "+500 USDC",
      status: "Confirmed",
      date: "Yesterday, 4:18 PM",
      hash: "0x71cd...45ef",
      icon: FiArrowDownLeft,
      positive: false,
    },
    {
      id: 3,
      type: "Repay",
      title: "Debt Repaid",
      asset: "USDC",
      amount: "-200 USDC",
      status: "Confirmed",
      date: "Aug 25, 2:31 PM",
      hash: "0x35ab...81ca",
      icon: FiRefreshCw,
      positive: true,
    },
    {
      id: 4,
      type: "Add Collateral",
      title: "Collateral Added",
      asset: "ETH",
      amount: "+0.25 ETH",
      status: "Confirmed",
      date: "Aug 24, 11:20 AM",
      hash: "0x91de...72aa",
      icon: FiPlus,
      positive: true,
    },
    {
      id: 5,
      type: "Withdraw",
      title: "ETH Withdrawn",
      asset: "ETH",
      amount: "-0.20 ETH",
      status: "Confirmed",
      date: "Aug 23, 9:45 AM",
      hash: "0x42fc...13be",
      icon: FiArrowUpRight,
      positive: false,
    },
  ];

  /* =====================================================
     FILTER + SEARCH
  ====================================================== */

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter =
      filter === "All" || transaction.type === filter;

    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      !searchValue ||
      transaction.title.toLowerCase().includes(searchValue) ||
      transaction.asset.toLowerCase().includes(searchValue) ||
      transaction.amount.toLowerCase().includes(searchValue) ||
      transaction.hash.toLowerCase().includes(searchValue);

    return matchesFilter && matchesSearch;
  });

  /* =====================================================
     EMPTY STATE
  ====================================================== */

  if (filteredTransactions.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-[#111111]/80
          px-5
          py-16
          text-center
        "
      >
        <div
          className="
            mx-auto
            w-12
            h-12
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            flex
            items-center
            justify-center
            text-white/30
          "
        >
          <FiActivity size={20} />
        </div>

        <h3 className="mt-4 text-sm font-semibold">
          No transactions found
        </h3>

        <p className="mt-2 text-xs text-white/35 max-w-sm mx-auto">
          There are no transactions matching your current
          filter or search.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* =====================================================
          DESKTOP TABLE
      ====================================================== */}

      <div
        className="
          hidden
          md:block
          rounded-2xl
          border
          border-white/10
          bg-[#111111]/80
          overflow-hidden
        "
      >
        {/* TABLE HEADER */}

        <div
          className="
            grid
            grid-cols-[2fr_1fr_1.2fr_1fr_1.2fr]
            gap-4
            px-6
            py-4
            border-b
            border-white/[0.07]
            text-[10px]
            uppercase
            tracking-wider
            text-white/30
          "
        >
          <span>Transaction</span>
          <span>Asset</span>
          <span>Amount</span>
          <span>Status</span>
          <span className="text-right">Details</span>
        </div>

        {/* TABLE ROWS */}

        {filteredTransactions.map((transaction) => {
          const Icon = transaction.icon;

          return (
            <div
              key={transaction.id}
              className="
                grid
                grid-cols-[2fr_1fr_1.2fr_1fr_1.2fr]
                gap-4
                items-center
                px-6
                py-5
                border-b
                border-white/[0.05]
                last:border-b-0
                hover:bg-white/[0.02]
                transition
              "
            >
              {/* TRANSACTION */}

              <div className="flex items-center gap-3 min-w-0">

                <div
                  className="
                    w-10
                    h-10
                    shrink-0
                    rounded-xl
                    bg-white/[0.04]
                    border
                    border-white/[0.06]
                    flex
                    items-center
                    justify-center
                    text-[#6DD054]
                  "
                >
                  <Icon size={17} />
                </div>

                <div className="min-w-0">

                  <p className="text-sm font-medium truncate">
                    {transaction.title}
                  </p>

                  <p className="text-xs text-white/30 mt-1">
                    {transaction.date}
                  </p>

                </div>

              </div>

              {/* ASSET */}

              <p className="text-sm text-white/60">
                {transaction.asset}
              </p>

              {/* AMOUNT */}

              <p
                className={`
                  text-sm
                  font-semibold
                  ${
                    transaction.positive
                      ? "text-[#6DD054]"
                      : "text-white/70"
                  }
                `}
              >
                {transaction.amount}
              </p>

              {/* STATUS */}

              <div>
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    px-2.5
                    py-1
                    rounded-lg
                    bg-[#6DD054]/10
                    border
                    border-[#6DD054]/15
                    text-[10px]
                    font-medium
                    text-[#6DD054]
                  "
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6DD054]" />
                  {transaction.status}
                </span>
              </div>

              {/* DETAILS */}

              <div className="flex justify-end">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedTransaction(transaction)
                  }
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    text-xs
                    text-white/40
                    hover:text-[#6DD054]
                    transition
                  "
                >
                  View
                  <FiExternalLink size={13} />
                </button>

              </div>

            </div>
          );
        })}
      </div>


      {/* =====================================================
          MOBILE LIST
      ====================================================== */}

      <div className="md:hidden space-y-3">

        {filteredTransactions.map((transaction) => {
          const Icon = transaction.icon;

          return (
            <div
              key={transaction.id}
              className="
                rounded-2xl
                border
                border-white/10
                bg-[#111111]/80
                p-4
              "
            >

              {/* TOP */}

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3 min-w-0">

                  <div
                    className="
                      w-10
                      h-10
                      shrink-0
                      rounded-xl
                      bg-white/[0.04]
                      border
                      border-white/[0.06]
                      flex
                      items-center
                      justify-center
                      text-[#6DD054]
                    "
                  >
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-sm font-medium truncate">
                      {transaction.title}
                    </p>

                    <p className="text-xs text-white/30 mt-1">
                      {transaction.date}
                    </p>

                  </div>

                </div>


                {/* STATUS */}

                <span
                  className="
                    shrink-0
                    inline-flex
                    items-center
                    gap-1.5
                    px-2
                    py-1
                    rounded-lg
                    bg-[#6DD054]/10
                    text-[9px]
                    text-[#6DD054]
                  "
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6DD054]" />
                  Confirmed
                </span>

              </div>


              {/* DETAILS */}

              <div
                className="
                  mt-4
                  pt-4
                  border-t
                  border-white/[0.06]
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <p className="text-[10px] text-white/25 uppercase tracking-wider">
                    Amount
                  </p>

                  <p
                    className={`
                      mt-1
                      text-sm
                      font-semibold
                      ${
                        transaction.positive
                          ? "text-[#6DD054]"
                          : "text-white/70"
                      }
                    `}
                  >
                    {transaction.amount}
                  </p>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setSelectedTransaction(transaction)
                  }
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    text-xs
                    text-white/40
                    hover:text-[#6DD054]
                    transition
                  "
                >
                  View transaction
                  <FiExternalLink size={13} />
                </button>

              </div>

            </div>
          );
        })}

      </div>


      {/* =====================================================
          TRANSACTION MODAL
      ====================================================== */}

      <TransactionModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </>
  );
}

