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

const connectHeaderBtn = document.getElementById("headerConnect");
let walletClient;
let publicClient;
let userAddress = null;
let miniLend;

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

// ============ Stake ETH function ============
async function stakeETH(amountInETH) {
  try {
    // Check if initialized
    if (!userAddress) {
      await connectWallet();
    }

    if (!miniLend) {
      console.log("Initializing contract...");
      miniLend = getMiniLendContract(walletClient);
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
      await refreshUserState(); // Refresh user state after staking
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

// ============ Withdraw ETH function ============
async function withdrawETH(amountInETH) {
  try {
    // Check if initialized
    if (!userAddress) {
      await connectWallet();
    }

    if (!miniLend) {
      console.log("Initializing contract...");
      miniLend = getMiniLendContract(walletClient);
    }

    // Convert to wei
    const amountWei = parseEther(amountInETH.toString());

    // Send transaction
    console.log("Sending Withdrawal transaction...");

    const hash = await walletClient.writeContract({
      address: CONTRACTS.sepolia.myContract.address,
      abi: CONTRACTS.sepolia.myContract.abi,
      functionName: "withdrawCollateralEth",
      args: [amountWei],
      account: userAddress,
    });

    console.log("Transaction sent! Hash:", hash);

    // Wait for confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (receipt.status === "success") {
      console.log("Staking successful!", receipt);
      // updateUI("success", receipt);
      await refreshUserState(); // Refresh user state after staking
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
    const user = await publicClient.readContract({
      address: CONTRACTS.sepolia.myContract.address,
      abi: CONTRACTS.sepolia.myContract.abi,
      functionName: "getUser",
      args: [userAddress],
    });
    console.log("Fetched user state:", user);
    const [, stakedAmount] = user;

    console.log("Updating UI with staked amount:", stakedAmount);
    document.getElementById("stakedEth").textContent =
      formatEther(stakedAmount);
    refreshWalletBalance();
    console.log("User state refreshed successfully.");
  } catch (err) {
    console.error("Failed to refresh user state:", err);
  }
}

async function refreshWalletBalance() {
  if (!userAddress || !publicClient) return;

  try {
    const balanceWei = await publicClient.getBalance({
      address: userAddress,
    });

    document.getElementById("walletEthBalance").textContent =
      Number(formatEther(balanceWei)).toFixed(3) + " ETH";

    // document.getElementById("walletEthBalance").textContent = balanceEth;
  } catch (err) {
    console.error("Failed to fetch wallet balance:", err);
  }
}
