//FOR HEADER BACKGROUND
// const header = document.getElementById("header");

// window.addEventListener("scroll", () => {
// if (window.scrollY > 50) {
// header.classList.add("bg-[#2b0f0f]", "shadow-lg");
// } else {
// header.classList.remove("bg-[#2b0f0f]", "shadow-lg");
// }
// });

//FOR MOBILE FQ AND WHITE PAPER
// const headerBtn = document.getElementById("headers");
// const headermenus = document.querySelector(".menus");
// const closeBtns = document.getElementById("closebtn");

// headerBtn.addEventListener("click", () => {
// headermenus.classList.toggle("hidden");
// });

// closeBtns.addEventListener("click", () => {
// headermenus.classList.toggle("hidden");
// });

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
} from "https://esm.sh/viem";
import { setModalState, MODAL_STATE, closeModal } from "./modalController.js";
import { EXPECTED_CHAIN } from "./config.js";
import { CONTRACTS } from "./minilendContract.js";
import { Link } from "./minilendContract.js";

const connectHeaderBtn = document.getElementById("headerConnect");
let walletClient;
let publicClient;
let userAddress = null;
let miniLend;

const USDC = CONTRACTS.sepolia.myContract.usdcAddress;
const LINK = CONTRACTS.sepolia.myContract.linkAddress;
const ETH = CONTRACTS.sepolia.myContract.ethAddress;

const TOKENS = {
  LINK: LINK,
  USDC: USDC,
};

const tokenSelect = document.getElementById("tokenSelect");
const tokenSymbol = tokenSelect.value;

const selectedTokenAddress = TOKENS[tokenSelect.value];

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

function updateuserAddress(newuserAddress) {
  userAddress = newuserAddress;
  localStorage.setItem("userAddress", newuserAddress);
  localStorage.setItem("connected", "true");
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

    walletClient = createWalletClient({
      chain: EXPECTED_CHAIN,
      transport: custom(window.ethereum),
    });

    publicClient = createPublicClient({
      chain: EXPECTED_CHAIN,
      transport: http(EXPECTED_CHAIN.rpcUrl),
    });

    // 🔍 Check network FIRST
    const chainId = await walletClient.getChainId();

    if (chainId !== EXPECTED_CHAIN.id) {
      throw new Error("WRONG_NETWORK");
    }

    const addresses = await walletClient.requestAddresses();
    userAddress = addresses[0];

    // create contract AFTER wallet connection
    miniLend = getContract({
      address: CONTRACTS.sepolia.myContract.address,
      abi: CONTRACTS.sepolia.myContract.abi,
      publicClient,
      walletClient,
    });

    connectHeaderBtn.innerText = shortenAddress(userAddress);
    updateuserAddress(userAddress);
    return { miniLend, walletClient, userAddress };
  } catch (err) {
    console.error("Connection error:", err);
    throw err;
  }
}

// ========== LOAD MINILEND-CONTRACT ============

export function getMiniLendContract(walletClient) {
  return getContract({
    address: CONTRACTS.sepolia.myContract.address,
    abi: CONTRACTS.sepolia.myContract.abi,
    publicClient,
    walletClient,
  });
}

// Add this to see current network limits
async function checkNetworkLimits() {
  const block = await publicClient.getBlock();
  console.log("Network gas limit per block:", block.gasLimit);
  console.log("Safe transaction gas limit:", Number(block.gasLimit) / 2);

  // Sepolia usually has ~30M block limit, but 16.7M per tx
  console.log("Max tx gas on Sepolia: 16,777,216");
}

// ============ Handle tranactions ===========
async function executeMiniLendTx({
  functionName,
  args = [],
  value = undefined,
}) {
  try {
    if (!userAddress) {
      await connectWallet();
    }

    if (!miniLend) {
      miniLend = getMiniLendContract(walletClient);
    }

    await checkNetworkLimits();

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

    await refreshUserState();
    return receipt;
  } catch (error) {
    console.error("Transaction error:", error);
    throw error;
  }
}

// =========== Approve ERC20 function ============

async function approveIfNeeded({
  tokenAddress, // ERC20 token address
  owner, // token holder address eg msg.sender
  spender, // address allowed to spend tokens (eg miniLend contract)
  amount, //human-readable amount (eg "1.5" for 1.5 LINK) - will be converted to base units
}) {
  const amountWei = parseUnits(amount.toString());

  // check allowance
  const allowance = await publicClient.readContract({
    address: tokenAddress,
    abi: Link.linkSepolia.abi, // standard ERC20 ABI with allowance function
    functionName: "allowance",
    args: [owner, spender],
  });

  if (allowance >= amountWei) return; // already approved

  // prompt wallet approval
  const hash = await walletClient.writeContract({
    address: tokenAddress,
    abi: Link.linkSepolia.abi,
    functionName: "approve",
    args: [spender, amountWei],
    account: owner,
  });

  await publicClient.waitForTransactionReceipt({ hash });
}

// ============ Stake ETH function ============
async function stakeETH(amountInETH) {
  const amountWei = parseEther(amountInETH.toString());

  return executeMiniLendTx({
    functionName: "stakeEth",
    args: [],
    value: amountWei,
  });
}

// ============ Withdraw ETH function ============
async function withdrawETH(amountInETH) {
  const amountWei = parseEther(amountInETH.toString());

  return executeMiniLendTx({
    functionName: "withdrawCollateralEth",
    args: [amountWei],
  });
}

// ============ Repay ETH function ============
async function repayAsset(tokenAddress, amount, user) {
  const amountWei = parseEther(amount.toString());

  return executeMiniLendTx({
    functionName: "repayAsset",
    args: [tokenAddress, amountWei],
    account: user,
  });
}

// ============ Borrow function ============
async function borrowAsset(selectedTokenAddress, amount) {
  const amountWei = parseEther(amount.toString());
  const tokenString = selectedTokenAddress;

  return executeMiniLendTx({
    functionName: "borrowAsset",
    args: [tokenString, amountWei],
  });
}

const borrow = document.getElementById("connectWalletBtn2");
if (borrow) {
  document.getElementById("connectWalletBtn2").onclick = async () => {
    const amt = document.getElementById("borrowInput").value;
    // console.log(getuserAddress());
    if (!amt || isNaN(amt)) {
      alert("Please enter a valid amount of ETH to borrow.");
      return;
    }
    document.getElementById("connectWalletBtn2").disabled = true; // Disable button to prevent multiple clicks
    try {
      await borrowAsset(selectedTokenAddress, amt);
      alert("Borrowing successful!");
    } catch (err) {
      alert("Borrowing failed: " + err.message);
    } finally {
      document.getElementById("connectWalletBtn2").disabled = false; // Re-enable button
    }
  };
}

const repay = document.getElementById("connectWalletBtn3");
if (repay) {
  document.getElementById("connectWalletBtn3").onclick = async () => {
    const amt = document.getElementById("repayInput").value;
    // console.log(getuserAddress());
    if (!amt || isNaN(amt)) {
      alert("Please enter a valid amount of ETH to repay.");
      return;
    }
    document.getElementById("connectWalletBtn3").disabled = true; // Disable button to prevent multiple clicks
    try {
      const user = userAddress || getuserAddress();
      await approveIfNeeded({
        tokenAddress: selectedTokenAddress,
        owner: user,
        spender: CONTRACTS.sepolia.myContract.address,
        amount: amt,
      });
      await repayAsset(selectedTokenAddress, amt, user);
      alert("Repayment successful!");
    } catch (err) {
      alert("Repayment failed: " + err.message);
    } finally {
      document.getElementById("connectWalletBtn3").disabled = false; // Re-enable button
    }
  };
}

const withdraw = document.getElementById("connectWalletBtn4");

if (withdraw) {
  document.getElementById("connectWalletBtn4").onclick = async () => {
    const eth = document.getElementById("withdrawInput").value;
    // console.log(getuserAddress());
    if (!eth || isNaN(eth)) {
      alert("Please enter a valid amount of ETH to withdraw.");
      return;
    }
    document.getElementById("connectWalletBtn4").disabled = true; // Disable button to prevent multiple clicks
    try {
      await withdrawETH(eth);
      alert("Withdrawal successful!");
    } catch (err) {
      alert("Withdrawal failed: " + err.message);
    } finally {
      document.getElementById("connectWalletBtn4").disabled = false; // Re-enable button
    }
  };
}

const stake = document.getElementById("connectWalletBtn1");

if (stake) {
  document.getElementById("connectWalletBtn1").onclick = async () => {
    const eth = document.getElementById("stakeInput").value;
    // console.log(getuserAddress());
    if (!eth || isNaN(eth)) {
      alert("Please enter a valid amount of ETH to stake.");
      return;
    }
    document.getElementById("connectWalletBtn1").disabled = true; // Disable button to prevent multiple clicks
    try {
      await stakeETH(eth);
      alert("Staking successful!");
    } catch (err) {
      alert("Staking failed: " + err.message);
    } finally {
      document.getElementById("connectWalletBtn1").disabled = false; // Re-enable button
    }
  };
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

function disconnectWallet() {
  userAddress = null;
  localStorage.removeItem("connected");
  localStorage.removeItem("userAddress");
  localStorage.clear();
}

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
        onAction: () => {
          handleDisconnect();
          location.reload(); // optional
        },
      });
      return;
    }

    // CASE 1: Not connected
    setModalState(MODAL_STATE.CONNECT, {
      onAction: async () => {
        try {
          await connectWallet();
          location.href = "page1.html";
          closeModal();
        } catch (err) {
          // WRONG NETWORK TRANSITION
          if (err.message === "WRONG_NETWORK") {
            setModalState(MODAL_STATE.WRONG_NETWORK, {
              expectedName: EXPECTED_CHAIN.name,
              onAction: async () => {
                try {
                  await switchNetwork();
                  location.href = "page1.html"; // optional: redirect after network switch
                  closeModal();
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

export function handleDisconnect() {
  disconnectWallet(); // clear app state
  location.href = "index.html"; // go back to home
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Initializing DApp...");

  await refreshUserState(); // Refresh user state on page load (if connected)
  //  Check if wallet is already connected
  await watchWalletConnection();
});

async function watchWalletConnection() {
  if (!window.ethereum) return;

  // Detect account changes
  window.ethereum.on("accountsChanged", async (accounts) => {
    if (!accounts || accounts.length === 0) {
      // Wallet disconnected
      console.log("Wallet disconnected");
      userAddress = null;
      connectHeaderBtn.innerText = "Connect Wallet";
      // if (window.location.pathname.endsWith("page1.html")) {
      //   location.href = "index.html";
      // }
      return;
    }

    // Account switched
    userAddress = accounts[0];
    console.log("Account changed:", userAddress);

    connectHeaderBtn.innerText = shortenAddress(userAddress);

    // Optional: reinitialize contract if needed
    miniLend = getMiniLendContract(walletClient);

    // Optional: refresh user balances
    await refreshUserState();
  });

  // Detect chain change (recommended)
  window.ethereum.on("chainChanged", () => {
    console.log("Network changed — reloading...");
    window.location.reload();
  });

  // Check if already connected on page load
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  if (accounts.length > 0) {
    userAddress = accounts[0];
    console.log("Wallet already connected:", userAddress);
    connectHeaderBtn.innerText = shortenAddress(userAddress);
    if (window.location.pathname.endsWith("index.html")) {
      location.href = "page1.html";
    }
  }
}

async function refreshUserState() {
  console.log("Refreshing user state...");
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  userAddress = accounts.length > 0 ? accounts[0] : null;
  console.log("Current user address:", userAddress);
  console.log("Public client:", publicClient);

  if (!userAddress || !publicClient) {
    await connectWallet();
    console.log("Public client:", publicClient);
    if (window.location.pathname.endsWith("index.html")) {
      location.href = "page1.html";
    }
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

    const [, stakedAmount, debtAsset, debtAmount] = user;

    // Getting wallet balance
    const balanceWei = await publicClient.getBalance({
      address: userAddress,
    });

    // Getting USD price of staked ETH
    const usdPriceEth = await getUsdPrice(ETH, stakedAmount);
    // Getting USD price of debt asset
    // const usdPriceDebt = await getUsdPrice(selectedTokenAddress, debtAmount);

    // Getting available borrow amount in USD
    const availableBorrowUsd = await availableToBorrow(
      userAddress,
      selectedTokenAddress,
    );
    const avail = parseEther(availableBorrowUsd.toString());
    const availableBorrowUsdPrice = await getUsdPrice(
      selectedTokenAddress,
      avail,
    );

    console.log("Available to borrow (LINK):", availableBorrowUsd);

    if (availableBorrowUsd === 0) {
      document.getElementById("connectWalletBtn2").disabled = true; // Disable borrow button if nothing is available to borrow
    }

    if (debtAmount) {
      const usdPrice = await getUsdPrice(debtAsset, debtAmount);
      document.getElementById("borrowedUsdValue").textContent =
        `${usdPrice} USD`;
    }

    // Refresh UI with fetched data
    document.getElementById("usdOutput").textContent = `${usdPriceEth} USD`;

    document.getElementById("borrowLimit1").textContent =
      `${Number(availableBorrowUsd).toFixed(3)} ${tokenSymbol}____${availableBorrowUsdPrice} USD`;

    // `$${availableBorrowUsd}`;

    document.getElementById("stakedEth").textContent =
      formatEther(stakedAmount);

    document.getElementById("debt").textContent = tokenSymbol;

    document.getElementById("walletEthBalance").textContent =
      Number(formatEther(balanceWei)).toFixed(3) + " ETH";

    document.getElementById("borrowed1").textContent =
      Number(formatEther(debtAmount)).toFixed(3) + " " + tokenSymbol;

    document.getElementById("borrowed2").textContent =
      Number(formatEther(debtAmount)).toFixed(3) + " " + tokenSymbol;

    console.log("User state refreshed successfully.");
  } catch (err) {
    console.error("Failed to refresh user state:", err);
  }
}
