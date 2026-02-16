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
const tokenMetaCache = {}; // simple in-memory cache for token metadata
let walletClient;
let publicClient;
let userAddress = null;
let miniLend;
let chainId = null;
let currentDebtWei = 0n;

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
  tokenSymbol = null,
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

    updateUI(tokenSymbol);
    return receipt;
  } catch (error) {
    console.error("Transaction error:", error);
    throw error;
  }
}

// ============ Stake ETH function ============
async function stakeETH(amountInETH) {
  try {
    // Check if initialized
    if (!userAddress) {
      await connectWallet();
    }

    if (!miniLend) {
      console.log("Initializing contract...");
      miniLend = loadContract(walletClient);
      console.log("Contract initialized:", miniLend);
    }

    // Convert to wei
    const amountWei = parseEther(amountInETH.toString());

    // Send transaction
    console.log("Sending stake transaction...");

    const hash = await walletClient.writeContract({
      address: CONTRACTS.sepolia.myContract.address,
      abi: CONTRACTS.sepolia.myContract.abi,
      functionName: "stakeEth",
      args: [],
      account: userAddress,
      value: amountWei,
    });

    console.log("Transaction sent! Hash:", hash);

    // Wait for confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (receipt.status === "success") {
      console.log("Staking successful!", receipt);
      // updateUI("success", receipt);

      return receipt;
    } else {
      throw new Error("Transaction failed");
    }
  } catch (error) {
    console.error("Staking error:", error);

    // Handle specific errors
    if (error.message.includes("insufficient funds")) {
      // alert("Insufficient ETH balance!");
      console.log("Insufficient funds - check your wallet balance.");
    } else if (error.message.includes("user rejected")) {
      // alert("Transaction rejected by user");
      console.log("User rejected transaction.");
    } else if (error.message.includes("execution reverted")) {
      // alert("Contract execution failed - check conditions");
      console.log("Contract execution reverted - check conditions.");
    }

    // updateUI("error", error.message);
    throw error;
  }
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

export async function borrowAsset(tokenSymbol, amount) {
  const token = TOKENS[tokenSymbol];
  if (!token) throw new Error("Unsupported token");

  const tokenAddress = token.address;

  // Get cached decimals
  const decimals = await getTokenDecimals(tokenAddress);

  const amountUnits = parseUnits(amount.toString(), decimals);
  console.log("Borrowing with params:", {
    tokenSymbol: tokenSymbol,
    tokenAddress: tokenAddress,
    amount: amount.toString(),
    amountUnits: amountUnits.toString(),
    decimals: decimals,
    token: token,
  });

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
  console.log("Repaying with params:", {
    tokenSymbol: tokenSymbol,
    tokenAddress: tokenAddress,
    amount: amount.toString(),
    amountUnits: amountUnits.toString(),
    decimals: decimals,
    token: token,
  });

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
          await connectWallet();
          location.href = "page1.html"; // optional: redirect after connection
          closeModal();
        } catch (err) {
          // WRONG NETWORK TRANSITION
          if (err.message === "WRONG_NETWORK") {
            setModalState(MODAL_STATE.WRONG_NETWORK, {
              expectedName: EXPECTED_CHAIN.name,
              onAction: async () => {
                try {
                  await switchNetwork();
                  location.href = "index.html"; // optional: force reload to reset state
                  location.reload();
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
  console.log(formatEther(104489248056523438n));

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
    console.log(getUserDebt(userAddress));

    const userBalance = await publicClient.getBalance({
      address: userAddress,
    });

    // console.log("User balance:", formatEther(userBalance), "ETH");

    document.getElementById("userAddress").textContent =
      shortenAddress(userAddress);

    document.getElementById("userBalance").textContent =
      `${Number(formatEther(userBalance)).toFixed(3)} ETH`;

    document.getElementById("walletEthBalance").textContent =
      `${Number(formatEther(userBalance)).toFixed(3)} ETH`;
  }

  // if (window.location.pathname.endsWith("page1.html")) {
  //   location.href = "index.html";
  // }
}

async function updateUI(tokenSymbol) {
  const selectedToken = TOKENS[tokenSymbol];
  const selectedTokenAddress = selectedToken.address;

  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  userAddress = accounts.length > 0 ? accounts[0] : null;
  console.log("UI user address:", userAddress);

  if (!userAddress || !publicClient) {
    await loadContract();
    console.log("Public client:", publicClient);
    console.log("User address after connection:", userAddress);
  }

  try {
    const user = await publicClient.readContract({
      address: CONTRACTS.sepolia.myContract.address,
      abi: CONTRACTS.sepolia.myContract.abi,
      functionName: "getUser",
      args: [userAddress],
    });
    // destructure tuple
    const [, stakedAmount, ,] = user;

    document.getElementById("stakedEth").textContent =
      formatEther(stakedAmount);

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

    document.getElementById("borrowLimit").textContent =
      `${Number(availableBorrowUsd).toFixed(3)} ${tokenSymbol}___${availableBorrowUsdPrice} USD`;
  } catch (err) {
    console.error("Error updating UI:", err);
  }
}

export async function getUserDebt(userAddress) {
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

    const [, , , debtAmount] = user;
    console.log(debtAmount);

    return debtAmount; // bigint
  } catch (err) {
    console.error("unable to get user info:", err);
  }
}

export async function loadRepayMax(user, whichToken) {
  try {
    currentDebtWei = await getUserDebt(user);

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
