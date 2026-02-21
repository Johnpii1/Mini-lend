import {
  createWalletClient,
  createPublicClient,
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

const connectHeaderBtn = document.getElementById("headerConnect");
const modalActionBtn = document.getElementById("connectWalletBtn");
const tokenMetaCache = {}; // simple in-memory cache for token metadata
const _liquidationThreshold = 0.7; // example threshold, adjust as needed
let walletClient;
let publicClient;
let userAddress = null;
let miniLend;
let chainId = null;

// Hide all first
document.getElementById("safeStatus").classList.add("hidden");
document.getElementById("warningStatus").classList.add("hidden");
document.getElementById("liquidateStatus").classList.add("hidden");

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

    console.log("Checking existing wallet connection...");
    console.log("walletClient:", walletClient);
    console.log("publicClient:", publicClient);
    console.log("userAddress:", userAddress);
    console.log("chainId:", chainId);

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

    if (receipt.status !== "success") {
      throw new Error("Transaction failed");
    }

    updateUI();
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
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Initializing DApp...");

  // 1. Check if wallet is already connected
  // console.log(formatEther(104489248056523438n));

  await checkExistingConnection();
});

async function checkExistingConnection() {
  if (window.ethereum && window.ethereum.selectedAddress) {
    userAddress = window.ethereum.selectedAddress;
    window.ethereum.on("accountsChanged", (userAddress) => {
      if (userAddress.length === 0) {
        // Wallet disconnected
        console.log("Wallet disconnected, reloading...");
        setTimeout(() => window.location.reload(), 100);
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

    await updateUI();
    console.log("Processing user position ...");
    getUserPosition(userAddress);

    const userBalance = await publicClient.getBalance({
      address: userAddress,
    });

    // console.log("User balance:", formatEther(userBalance), "ETH");

    document.getElementById("userAddress").textContent =
      shortenAddress(userAddress);

    document.getElementById("mobile").textContent = shortenAddress(userAddress);
    document.getElementById("mobileAddress").textContent =
      shortenAddress(userAddress);

    document.getElementById("userBalance").textContent =
      `${Number(formatEther(userBalance)).toFixed(3)} ETH`;

    document.getElementById("mobileBalance").textContent =
      `${Number(formatEther(userBalance)).toFixed(3)} ETH`;

    document.getElementById("walletEthBalance").textContent =
      `${Number(formatEther(userBalance)).toFixed(3)} ETH`;
  }

  console.log("User address after checkExistingConnection:", userAddress);
  // if (window.location.pathname.endsWith("page1.html")) {
  //   location.href = "index.html";
  // }
}

async function updateUI() {
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  userAddress = accounts.length > 0 ? accounts[0] : null;
  // console.log("UI user address:", userAddress);

  if (!userAddress || !publicClient) {
    await loadContract();
    console.log("Public client:", publicClient);
    console.log("User address after connection:", userAddress);
  }

  try {
    const userInfo = await getUserPosition(userAddress);
    // const usdInfo = await getUserPositionInUSD(userAddress);

    const stakedAmount = userInfo.stakedAmount;
    const debtAmount = userInfo.debtAmount;
    const debtAsset = userInfo.debtAsset;
    const stakedAsset = userInfo.stakedAsset;
    console.log("User position details:", {
      stakedAmount: formatEther(stakedAmount),
      debtAmount: formatEther(debtAmount),
      debtAsset,
      stakedAsset,
    });

    const debtInUsd = await getUsdPrice(debtAsset, debtAmount);
    const collateralInUsd = await getUsdPrice(stakedAsset, stakedAmount);
    const healthFactor = calculateHealthFactor(
      _liquidationThreshold,
      Number(collateralInUsd.replace(/,/g, "")),
      Number(debtInUsd.replace(/,/g, "")),
    );
    console.log("Calculated health factor:", healthFactor);
    updateHealthStatus(healthFactor);

    console.log("User position in USD:", {
      debtInUsd,
      collateralInUsd,
    });

    document.getElementById("stakedEth").textContent =
      `${formatEther(stakedAmount)} ETH ($${collateralInUsd})`;

    document.getElementById("collateral").textContent =
      `${formatEther(stakedAmount)} ETH ($${collateralInUsd})`;
    // `${Number(availableBorrowUsd).toFixed(3)} ${tokenSymbol}___${availableBorrowUsdPrice} USD`;

    // Getting available borrow amount in USD
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

        const availableBorrowUsdPrice = await getUsdPrice(tokenAddress, avail);

        if (availableBorrowUsd === 0) {
          document.getElementById("connectWalletBtn2").disabled = true; // Disable borrow button if nothing is available to borrow
        }
        // update debt and available borrow in UI
        document.getElementById("debt").textContent =
          `${formatEther(debtAmount)} ${tokenSymbol} ($${debtInUsd})`;
        document.getElementById("available").textContent =
          `${Number(availableBorrowUsd).toFixed(3)} ${tokenSymbol} ($${availableBorrowUsdPrice})`;

        break;
      }
    }
  } catch (err) {
    console.error("Error updating UI:", err);
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

function updateHealthStatus(healthFactor) {
  // Show appropriate one
  if (healthFactor >= 2) {
    document.getElementById("safeStatus").classList.remove("hidden");
  } else if (healthFactor >= 1 && healthFactor < 2) {
    document.getElementById("safeStatus").classList.add("hidden");
    document.getElementById("warningStatus").classList.remove("hidden");
  } else {
    document.getElementById("safeStatus").classList.add("hidden");
    document.getElementById("warningStatus").classList.add("hidden");
    document.getElementById("liquidateStatus").classList.remove("hidden");
    document.getElementById("liquidationNote").classList.remove("hidden");
  }
}

function calculateHealthFactor(
  _liquidationThreshold,
  collateralValue,
  debtValue,
) {
  if (debtValue === 0) return Infinity; // no debt means infinitely healthy
  const healthFactor = (_liquidationThreshold * collateralValue) / debtValue;
  return healthFactor;
}
