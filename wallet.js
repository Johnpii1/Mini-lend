import {
  createWalletClient,
  createPublicClient,
  parseAbiItem,
  custom,
  http,
  parseEther,
  parseUnits,
  formatEther,
  formatUnits,
  getContract,
  maxUint256,
} from "https://esm.sh/viem";
import { setModalState, MODAL_STATE, closeModal } from "./modalController.js";
import { EXPECTED_CHAIN } from "./config.js";
import { CONTRACTS, TOKENS } from "./minilendContract.js";
import { linkinfo } from "./linkAbi.js";
import {
  renderLiquidationOpportunity,
  clearLiquidations,
} from "./liquidation.js";
// import { updateHealthStatus } from "./javascript2.js";

const connectHeaderBtn = document.getElementById("headerConnect");
const modalActionBtn = document.getElementById("connectWalletBtn");
const tokenMetaCache = {}; // simple in-memory cache for token metadata
const _liquidationThreshold = 0.7; // example threshold, adjust as needed
let walletClient;
let publicClient;
let userAddress = null;
let miniLend;
export let ETH_PRICE = null;
export let debtPrice = null;
let chainId = null;

// Hide all first
const safe = document.getElementById("safeStatus");
const warning = document.getElementById("warningStatus");
const trigger = document.getElementById("liquidateStatus");
const liquidation = document.getElementById("liquidationModal");
// const closeLiquidation = document.getElementById("closeLiquidationModal");

// shorten address
export function shortenAddress(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

export function getuserAddress() {
  const saveduserAddress = localStorage.getItem("userAddress");
  if (saveduserAddress) {
    userAddress = saveduserAddress;
  }
  return userAddress;
}

function updateInfo(
  newuserAddress,
  _walletClient,
  _publicClient,
  _chainId,
  _minilend,
) {
  userAddress = newuserAddress;
  walletClient = _walletClient;
  publicClient = _publicClient;
  chainId = _chainId;
  miniLend = _minilend;
  localStorage.setItem("userAddress", newuserAddress);
  localStorage.setItem("connected", "true");
  localStorage.setItem("walletClient", walletClient);
  localStorage.setItem("publicClient", publicClient);
  localStorage.setItem("chainId", chainId);
  localStorage.setItem("miniLend", miniLend);
}

// testing mode: always reset
localStorage.setItem("hideMetaMaskWarning", "false");

/*//////////////////////////////////////////////////////////////
        CORE CONTRACT INTERACTIONS & WALLET CONNECTION
//////////////////////////////////////////////////////////////*/

// =========== SWITCH NETWORK ============
async function switchNetwork() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${EXPECTED_CHAIN.id.toString(16)}` }], //"0x7a69"
    });
  } catch (err) {
    // chain not added yet
    if (err.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${EXPECTED_CHAIN.id.toString(16)}`,
            chainName: EXPECTED_CHAIN.name,
            rpcUrls: [EXPECTED_CHAIN.rpcUrl],
            nativeCurrency: {
              name: "Ether",
              symbol: "ETH",
              decimals: 18,
            },
          },
        ],
      });
    } else {
      throw err;
    }
  }
}

// =========== WALLET CLIENT & PUBLIC CLIENT ============
async function connectWallet() {
  try {
    if (!window.ethereum) {
      throw new Error("NO_WALLET");
    }

    miniLend = loadContract(); // initialize clients and contract

    // 🔍 Check network FIRST
    const chainId = await walletClient.getChainId();

    if (chainId !== EXPECTED_CHAIN.id) {
      throw new Error("WRONG_NETWORK");
    }

    const addresses = await walletClient.requestAddresses();
    userAddress = addresses[0];

    connectHeaderBtn.innerText = shortenAddress(userAddress);
    await updateUI();
    updateInfo(userAddress, walletClient, publicClient, chainId, miniLend);
    return { miniLend, walletClient, userAddress };
  } catch (err) {
    console.error("Connection error:", err);
    throw err;
  }
}

// ========== LOAD MINILEND-CONTRACT ============

export function loadContract() {
  walletClient = createWalletClient({
    chain: EXPECTED_CHAIN,
    transport: custom(window.ethereum),
  });

  publicClient = createPublicClient({
    chain: EXPECTED_CHAIN,
    transport: http(EXPECTED_CHAIN.rpcUrl),
  });

  return getContract({
    address: CONTRACTS.sepolia.myContract.address,
    abi: CONTRACTS.sepolia.myContract.abi,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  });
}

// =========== TOKEN DECIMAL FETCHING WITH CACHING ============
async function getTokenDecimals(tokenAddress) {
  if (tokenMetaCache[tokenAddress]?.decimals) {
    return tokenMetaCache[tokenAddress].decimals;
  }

  const decimals = await publicClient.readContract({
    address: tokenAddress,
    abi: linkinfo.linkSepolia.abi, // standard ERC20 ABI with decimals function
    functionName: "decimals",
  });

  tokenMetaCache[tokenAddress] = { decimals };

  return decimals;
}

// =========== Erc20 Approve function ============
async function userApprove({
  tokenAddress, // ERC20 token address
  owner, // token holder address eg msg.sender
  spender, // address allowed to spend tokens (eg miniLend contract)
  amount, //human-readable amount (eg "1.5" for 1.5 LINK) - will be converted to base units
}) {
  const amountWei = parseUnits(amount.toString());

  // check allowance
  const allowance = await publicClient.readContract({
    address: tokenAddress,
    abi: linkinfo.linkSepolia.abi, // standard ERC20 ABI with allowance function
    functionName: "allowance",
    args: [owner, spender],
  });

  if (allowance >= amountWei) return; // already approved

  // prompt wallet approval
  const hash = await walletClient.writeContract({
    address: tokenAddress,
    abi: linkinfo.linkSepolia.abi,
    functionName: "approve",
    args: [spender, maxUint256], // approve max to avoid repeated approvals
    account: owner,
  });

  await publicClient.waitForTransactionReceipt({ hash });
}

// ============ txHandler ============
async function executeMiniLendTx({
  functionName,
  args = [],
  value = undefined,
}) {
  try {
    if (!miniLend) {
      miniLend = loadContract();
    }

    // await checkNetworkLimits();
    console.log("Preparing transaction with params:", {
      functionName,
      args,
      value: value ? formatEther(value) + " ETH" : "N/A",
    });

    const hash = await walletClient.writeContract({
      address: CONTRACTS.sepolia.myContract.address,
      abi: CONTRACTS.sepolia.myContract.abi,
      functionName,
      args,
      account: userAddress,
      ...(value !== undefined ? { value } : {}),
    });

    console.log("Transaction sent:", hash);

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    handleUserAction({
      type: functionName,
      amount: args[1]
        ? formatUnits(args[1], 18)
        : value
          ? formatEther(value)
          : "N/A",
      hash,
    }); // log activity with actual amount and hash

    if (receipt.status !== "success") {
      throw new Error("Transaction failed");
    }

    await updateUI();
    return receipt;
  } catch (error) {
    console.error("Transaction error:", error);
    throw error;
  }
}

// ============ Stake ETH function ============
export async function stakeETH(amountInETH) {
  const amountWei = parseEther(amountInETH.toString());

  return executeMiniLendTx({
    functionName: "stakeEth",
    args: [],
    value: amountWei,
  });
}

export async function borrowAsset(tokenSymbol, amount) {
  const token = TOKENS[tokenSymbol];
  if (!token) throw new Error("Unsupported token");

  const tokenAddress = token.address;

  // Get cached decimals
  const decimals = await getTokenDecimals(tokenAddress);

  const amountUnits = parseUnits(amount.toString(), decimals);

  // updateUI(tokenSymbol);
  return executeMiniLendTx({
    functionName: "borrowAsset",
    args: [tokenAddress, amountUnits],
    tokenSymbol: tokenSymbol,
  });
}

// =========== Repay function ============
export async function repayAsset(tokenSymbol, amount) {
  const token = TOKENS[tokenSymbol];
  if (!token) throw new Error("Unsupported token");

  const tokenAddress = token.address;

  // Get cached decimals
  const decimals = await getTokenDecimals(tokenAddress);

  const amountUnits = parseUnits(amount.toString(), decimals);

  // ensure userAddress and publicClient are initialized
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  userAddress = accounts.length > 0 ? accounts[0] : null;
  console.log("Current user address:", userAddress);

  // Approve tokens first
  await userApprove({
    tokenAddress,
    owner: userAddress,
    spender: CONTRACTS.sepolia.myContract.address,
    amount: amount.toString(),
  });

  return executeMiniLendTx({
    functionName: "repayAsset",
    args: [tokenAddress, amountUnits],
    tokenSymbol: tokenSymbol, // for UI update after tx
  });
}

// ============ Withdraw ETH function ============
export async function withdrawETH(amountInETH) {
  const amountWei = parseEther(amountInETH.toString());

  return executeMiniLendTx({
    functionName: "withdrawCollateralEth",
    args: [amountWei],
  });
}
// =========== Get price ============

// tokenDecimals must be passed (18 for ETH)
async function getUsdPrice(token, amount) {
  // convert input amount → token base units
  const amountWei = parseUnits(amount.toString());

  // call contract
  const usdValue = await publicClient.readContract({
    address: CONTRACTS.sepolia.myContract.address,
    abi: CONTRACTS.sepolia.myContract.abi,
    functionName: "getUsdValue",
    args: [token, amountWei],
  });

  // convert from 18-decimal USD
  const usdNumber = Number(formatUnits(usdValue, 18));

  // format with commas
  const formattedUsd = usdNumber.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedUsd;
}

// get latest price from contract (for availableToBorrow calculation)
async function getLatestPrice(token) {
  // call contract
  const price = await publicClient.readContract({
    address: CONTRACTS.sepolia.myContract.address,
    abi: CONTRACTS.sepolia.myContract.abi,
    functionName: "getLatestPrice",
    args: [token],
  });

  // Store in localStorage as backup/default
  localStorage.setItem(`lastPrice_${token}`, price.toString());

  return Number(formatUnits(price, 18));
}

async function availableToBorrow(user, token) {
  const available = await publicClient.readContract({
    address: CONTRACTS.sepolia.myContract.address,
    abi: CONTRACTS.sepolia.myContract.abi,
    functionName: "_borrowableAmount",
    args: [user, token],
  });

  return Number(formatUnits(available, 18));
}

export async function disconnectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_revokePermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      if (window.location.pathname.endsWith("page1.html")) {
        location.href = "index.html";
      }
      console.log("Permissions revoked");
      location.href = "index.html";
    } catch (error) {
      console.error("Failed to revoke:", error);
    }
  }
  userAddress = null;
  localStorage.removeItem("connected");
  localStorage.removeItem("userAddress");
  localStorage.clear();
}

// =========== Spinner ============
export const spinner = `
<svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
  <circle class="opacity-25" cx="12" cy="12" r="10"
    stroke="currentColor" stroke-width="4" fill="none"></circle>
  <path class="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
  </path>
</svg>
`;

// closeBtn.onclick = closeModal();

document.querySelectorAll(".openModal").forEach((btn) => {
  btn.addEventListener("click", () => {
    // CASE 3: No wallet detected
    if (!window.ethereum) {
      setModalState(MODAL_STATE.NO_WALLET);
      return;
    }

    // CASE 2: Wallet already connected
    if (userAddress) {
      setModalState(MODAL_STATE.DISCONNECT, {
        userAddress,
        onAction: async () => {
          await disconnectWallet();
          location.href = "index.html"; // optional
        },
      });
      return;
    }

    // CASE 1: Not connected
    setModalState(MODAL_STATE.CONNECT, {
      onAction: async () => {
        try {
          modalActionBtn.innerHTML = `
        ${spinner}
        <span>Connecting...</span>
      `;
          await connectWallet();
          setTimeout(() => {
            modalActionBtn.innerHTML = "Connected";
          }, 1500);
          closeModal();

          location.href = "page1.html"; // optional: redirect after connection
        } catch (err) {
          // WRONG NETWORK TRANSITION
          if (err.message === "WRONG_NETWORK") {
            setModalState(MODAL_STATE.WRONG_NETWORK, {
              expectedName: EXPECTED_CHAIN.name,
              onAction: async () => {
                try {
                  modalActionBtn.innerHTML = `
                  ${spinner}
                    <span>Switching...</span>
                  `;
                  await switchNetwork();
                  if (window.location.pathname.endsWith("index.html")) {
                    location.href = "page1.html";
                  }
                  // location.reload();
                } catch (err) {
                  setModalState(MODAL_STATE.ERROR, {
                    message: "Network switch failed.",
                  });
                }
              },
            });
            return;
          }

          setModalState(MODAL_STATE.ERROR, {
            message: err.shortMessage,
          });
        }
      },
    });
    // closeBtn.onclick = closeModal();
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Initializing DApp...");

  // 1. Check if wallet is already connected
  // console.log(formatEther(104489248056523438n));
  await updateUI();

  await checkExistingConnection();
});

export async function checkExistingConnection() {
  if (window.ethereum && window.ethereum.selectedAddress) {
    userAddress = window.ethereum.selectedAddress;
    window.ethereum.on("accountsChanged", (userAddress) => {
      if (userAddress.length === 0) {
        // Wallet disconnected
        console.log("Wallet disconnected, reloading...");
        setTimeout(() => window.location.reload(), 100);
        if (window.location.pathname.endsWith("page1.html")) {
          location.href = "index.html";
        }
      }
    });

    if (window.location.pathname.endsWith("index.html")) {
      location.href = "page1.html";
    }
    console.log("Wallet already connected:", userAddress);
    connectHeaderBtn.innerText = shortenAddress(
      window.ethereum.selectedAddress,
    );

    loadContract(); // initialize clients and contract
    console.log(userAddress);

    // await updateUI();
    console.log("Processing user position ...");
    getUserPosition(userAddress);

    const userBalance = await publicClient.getBalance({
      address: userAddress,
    });

    // console.log("User balance:", formatEther(userBalance), "ETH");

    document.getElementById("walletEthBalance").textContent =
      `${Number(formatEther(userBalance)).toFixed(3)} ETH`;

    if (window.location.pathname.endsWith("page1.html")) {
      document.getElementById("userAddress").textContent =
        shortenAddress(userAddress);
      document.getElementById("mobile").textContent =
        shortenAddress(userAddress);
      document.getElementById("mobileAddress").textContent =
        shortenAddress(userAddress);

      document.getElementById("userBalance").textContent =
        `${Number(formatEther(userBalance)).toFixed(3)} ETH`;

      document.getElementById("mobileBalance").textContent =
        `${Number(formatEther(userBalance)).toFixed(3)} ETH`;
    }

    console.log("User address after checkExistingConnection:", userAddress);
    // if (window.location.pathname.endsWith("page1.html")) {
    //   location.href = "index.html";
    // }
  }
}

async function userEthUsd() {
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  userAddress = accounts.length > 0 ? accounts[0] : null;
  try {
    const userInfo = await getUserPosition(userAddress);

    const stakedAmount = userInfo.stakedAmount;
    const stakedAsset = userInfo.stakedAsset;
    collateralInUsd = await getUsdPrice(stakedAsset, stakedAmount);
    // for every occurances of eth replace the price with the usd price
  } catch (err) {
    console.error("unable to get user debt in USD:", err);
  }
}

async function updateUI() {
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  userAddress = accounts.length > 0 ? accounts[0] : null;

  if (!userAddress || !publicClient) {
    await loadContract();
  }

  try {
    const userInfo = await getUserPosition(userAddress);

    const stakedAmount = userInfo.stakedAmount;
    const debtAmount = userInfo.debtAmount;
    const debtAsset = userInfo.debtAsset;
    const stakedAsset = userInfo.stakedAsset;

    // console.log("User position details:", {
    //   stakedAmount: formatEther(stakedAmount),
    //   debtAmount: formatEther(debtAmount),
    //   debtAsset,
    //   stakedAsset,
    // });

    // -----------------------------
    // USD VALUES (SAFE HANDLING)
    // -----------------------------

    // Always calculate collateral USD (if user has staked)
    let collateralInUsd = "0.00";

    if (stakedAmount > 0n) {
      collateralInUsd = await getUsdPrice(stakedAsset, stakedAmount);
      ETH_PRICE = await getLatestPrice(stakedAsset); // update global ETH price for availableToBorrow calculations
      console.log("Eth price updated:", ETH_PRICE);
    }

    // Only calculate debt USD if valid
    let debtInUsd = "0.00";

    if (
      debtAsset !== "0x0000000000000000000000000000000000000000" &&
      debtAmount > 0n
    ) {
      debtInUsd = await getUsdPrice(debtAsset, debtAmount);
      debtPrice = await getLatestPrice(debtAsset);
      console.log("Debt asset price updated:", debtPrice);
    }

    // -----------------------------
    // HEALTH FACTOR (SAFE)
    // -----------------------------

    let healthFactor = Infinity; // default to infinitely healthy

    const debtUsdNumber = Number(debtInUsd.replace(/,/g, ""));
    const collateralUsdNumber = Number(collateralInUsd.replace(/,/g, ""));

    if (debtUsdNumber > 0) {
      healthFactor = calculateHealthFactor(
        _liquidationThreshold,
        collateralUsdNumber,
        debtUsdNumber,
      );
    }

    updateHealthStatus(healthFactor, {
      borrower: userAddress,
      debt: debtInUsd,
      collateral: collateralInUsd,
      bonus: 5,
    });

    console.log("User position in USD:", {
      debtInUsd,
      collateralInUsd,
      healthFactor,
    });

    // -----------------------------
    // UPDATE UI (ALWAYS)
    // -----------------------------
    if (window.location.pathname.endsWith("page1.html")) {
      document.getElementById("stakedEth").textContent =
        `${formatEther(stakedAmount)} ETH ($${collateralInUsd})`;

      document.getElementById("collateral").textContent =
        `${formatEther(stakedAmount)} ETH ($${collateralInUsd})`;
      document.getElementById("usdOutput").textContent = `$${collateralInUsd}`;

      // Default debt display (empty state)
      document.getElementById("debt").textContent = `0.0 ($0.00)`;

      document.getElementById("available").textContent = `0.0 ($0.00)`;

      document.getElementById("debt1").textContent = `0.0 Token`;

      document.getElementById("debtUsdValue").textContent = `$ 0.0`;

      document.getElementById("asset").textContent = `Token`;

      // -----------------------------
      // AVAILABLE BORROW LOGIC
      // -----------------------------

      if (debtAsset !== "0x0000000000000000000000000000000000000000") {
        for (const symbol in TOKENS) {
          const token = TOKENS[symbol];
          const tokenAddress = token.address;

          if (tokenAddress === debtAsset) {
            const tokenSymbol = symbol;

            const availableBorrowUsd = await availableToBorrow(
              userAddress,
              tokenAddress,
            );

            const avail = parseEther(availableBorrowUsd.toString());

            let availableBorrowUsdPrice = "0.00";

            if (availableBorrowUsd > 0) {
              availableBorrowUsdPrice = await getUsdPrice(tokenAddress, avail);
            }

            if (availableBorrowUsd === 0) {
              document.getElementById("connectWalletBtn2").disabled = true;
            }

            document.getElementById("debt").textContent =
              `${formatEther(debtAmount)} ${tokenSymbol} ($${debtInUsd})`;

            document.getElementById("debt1").textContent =
              `${formatEther(debtAmount)} ${tokenSymbol}`;
            document.getElementById("debtUsdValue").textContent =
              `$${debtInUsd}`;

            document.getElementById("asset").textContent = tokenSymbol;

            document.getElementById("available").textContent =
              `${Number(availableBorrowUsd).toFixed(3)} ${tokenSymbol} ($${availableBorrowUsdPrice})`;

            break;
          }
        }
      }
    }
  } catch (err) {
    console.error("Error updating UI:", err);
    console.log("error details:", err.shortMessage);
  }
}

// ========== Get USER DEBT ========
export async function getUserPosition(userAddress) {
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  userAddress = accounts.length > 0 ? accounts[0] : null;
  console.log("Current user address:", userAddress);

  if (!userAddress || !publicClient) {
    await loadContract();
    console.log("Public client:", publicClient);
    console.log("User address after connection:", userAddress);
  }
  try {
    console.log("Fetching user state from contract...");
    // Getting user state from contract
    const user = await publicClient.readContract({
      address: CONTRACTS.sepolia.myContract.address,
      abi: CONTRACTS.sepolia.myContract.abi,
      functionName: "getUser",
      args: [userAddress],
    });

    const [stakedAsset, stakedAmount, debtAsset, debtAmount] = user;
    console.log(debtAmount, stakedAsset, stakedAmount, debtAsset);

    return { stakedAsset, stakedAmount, debtAsset, debtAmount }; // bigint
  } catch (err) {
    console.error("unable to get user info:", err);
  }
}

export async function getUserPositionInUSD(userAddress) {
  try {
    const user = await getUserPosition(userAddress);
    const debtAmount = user.debtAmount;
    const debtAsset = user.debtAsset;
    const stakedAmount = user.stakedAmount;
    const stakedAsset = user.stakedAsset;

    const debtInUsd = await getUsdPrice(debtAsset, debtAmount);
    const collateralInUsd = await getUsdPrice(stakedAsset, stakedAmount);
    return { debtInUsd, collateralInUsd };
  } catch (err) {
    console.error("unable to get user debt in USD:", err);
  }
}

export async function loadRepayMax(user, whichToken) {
  try {
    const userInfo = await getUserPosition(user);

    const currentDebtWei = userInfo.debtAmount;

    const token = TOKENS[whichToken];
    if (!token) throw new Error("Unsupported token");

    const tokenAddress = token.address;

    const decimals = await getTokenDecimals(tokenAddress);
    console.log("rapay details", {
      userDept: currentDebtWei,
      token: token,
      tokenAddress: tokenAddress,
      tokenDecimal: decimals,
    });

    const formatted = formatUnits(currentDebtWei, decimals);
    return formatted;
  } catch (err) {
    console.error(err);
  }
}

// ============= MAX REPAY GETTER =========
document.getElementById("repayMaxBtn").onclick = async () => {
  const selectedSymbol = document.getElementById("tokenSelect2").value;
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  userAddress = accounts.length > 0 ? accounts[0] : null;
  console.log("Current user address:", userAddress);
  const formatted = await loadRepayMax(userAddress, selectedSymbol);
  document.getElementById("repayInput").value = formatted;
  document.getElementById("repayMaxDisplay").textContent =
    "Debt: " + Number(formatted).toFixed(4);
};

function calculateHealthFactor(
  _liquidationThreshold,
  collateralValue,
  debtValue,
) {
  if (debtValue === 0) return Infinity; // no debt means infinitely healthy
  const healthFactor = (_liquidationThreshold * collateralValue) / debtValue;
  return healthFactor;
}

// FOR HEALTH FACTOR

export function updateHealthStatus(healthFactor, positionData) {
  // Show appropriate one
  if (window.location.pathname.endsWith("page1.html")) {
    if (healthFactor >= 2) {
      warning.classList.add("hidden");
      trigger.classList.add("hidden");
      safe.classList.remove("hidden");
    } else if (healthFactor >= 1 && healthFactor < 2) {
      safe.classList.add("hidden");
      trigger.classList.add("hidden");
      warning.classList.remove("hidden");
    } else {
      safe.classList.add("hidden");
      warning.classList.add("hidden");
      trigger.classList.remove("hidden");

      liquidation.classList.remove("hidden");
      liquidation.classList.add("flex");
    }
  }
  if (healthFactor < 1) {
    if (window.location.pathname.endsWith("Liquidation.html")) {
      // clearLiquidations();

      renderLiquidationOpportunity(positionData);
    }
  }
}

// Send token modal logic
export async function sendAsset(symbol, recipient, amount) {
  const tokenAddress = TOKENS[symbol];

  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  userAddress = accounts.length > 0 ? accounts[0] : null;
  console.log("Current user address:", userAddress);

  console.log("Sending asset with details:", {
    symbol,
    tokenAddress,
    recipient,
    amount,
    userAddress,
  });

  // 🔹 Case 1: Native ETHa
  try {
    if (!walletClient || !publicClient) {
      await loadContract();
    }

    if (tokenAddress.address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
      console.log("Sending native ETH...");
      console.log("walletClient:", walletClient);
      const hash = await walletClient.sendTransaction({
        account: userAddress,
        to: recipient,
        value: parseEther(amount),
      });

      await publicClient.waitForTransactionReceipt({ hash });
      console.log("ETH transfer successful:", hash);
      await handleUserAction({
        type: `Send ${symbol}`,
        amount,
        hash,
      }); // log activity with actual amount and hash
      return hash;
    }

    // 🔹 Case 2: ERC20 Token
    console.log("Sending ERC20 token...");
    const hash = await walletClient.writeContract({
      account: userAddress,
      address: tokenAddress.address,
      abi: linkinfo.linkSepolia.abi, // standard ERC20 ABI with transfer function
      functionName: "transferFrom",
      args: [
        userAddress,
        recipient,
        parseUnits(amount, tokenAddress.decimals), // ⚠️ adjust decimals if needed
      ],
    });

    await publicClient.waitForTransactionReceipt({ hash });
    console.log(`${symbol} transfer successful:`, hash);
    await handleUserAction({
      type: `Send ${symbol}`,
      amount,
      hash,
    }); // log activity with actual amount and hash
    return hash;
  } catch (err) {
    console.error("Error loading contract in sendAsset:", err);
  }
}

// populate activity log
// const logs = await publicClient.getLogs({
//   address: contractAddress,
//   event: parsedAbiItem("event Borrowed(address indexed user, uint256 amount)"),
// });
// import {  } from "viem";

export function updateActivity(newItem) {
  const existing = JSON.parse(localStorage.getItem("activity")) || [];

  // Prevent duplicate txHash entries
  const index = existing.findIndex((item) => item.txHash === newItem.txHash);

  if (index !== -1) {
    // Update existing item (e.g. Pending → Success)
    existing[index] = { ...existing[index], ...newItem };
  } else {
    // Add newest at the top
    existing.unshift(newItem);
  }

  localStorage.setItem("activity", JSON.stringify(existing));

  renderActivity(); // auto re-render
}

async function handleUserAction({ type, amount, hash }) {
  // const hash = await writeContract(writeArgs);

  updateActivity({
    txHash: hash,
    type,
    amount,
    status: "Pending",
  });

  try {
    await publicClient.waitForTransactionReceipt({ hash });

    updateActivity({
      txHash: hash,
      status: "Success",
    });
  } catch (err) {
    updateActivity({
      txHash: hash,
      status: "Failed",
    });
  }
}

// export function watchUserEvent({
//   contractAddress,
//   eventSignature,
//   filterArgs,
//   callback,
// }) {
//   return publicClient.watchEvent({
//     address: contractAddress,
//     event: parseAbiItem(eventSignature),
//     args: filterArgs,
//     onLogs: callback,
//   });
// }

function renderActivity() {
  const activityList = document.getElementById("activityList");
  const activity = JSON.parse(localStorage.getItem("activity")) || [];

  activityList.innerHTML = "";

  if (!activity.length) {
    activityList.innerHTML = `
      <p class="logo text-center text-sm text-gray-500">
        No activity yet
      </p>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();

  activity.forEach((item) => {
    const container = document.createElement("div");
    container.className =
      "bg-white rounded-lg p-3 flex justify-between items-center cursor-pointer";

    container.onclick = () =>
      window.open(`https://sepolia.etherscan.io/tx/${item.txHash}`, "_blank");

    const statusColor =
      item.status === "Success"
        ? "text-green-600"
        : item.status === "Pending"
          ? "text-yellow-600"
          : "text-red-600";

    container.innerHTML = `
      <div>
          <p class="logo text-sm font-semibold">${item.type}</p>
          <p class="logo text-xs text-gray-500">${item.amount}</p>
      </div>
      <span class="logo text-xs font-semibold ${statusColor}">
          ${item.status}
      </span>
    `;

    fragment.appendChild(container);
  });

  activityList.appendChild(fragment);
}

// function saveActivity(type, amount, status, txHash) {
//   const activity = JSON.parse(localStorage.getItem("activity")) || [];

//   activity.unshift({
//     type,
//     amount,
//     status,
//     txHash,
//     timestamp: Date.now(),
//   });

//   localStorage.setItem("activity", JSON.stringify(activity));
// }
