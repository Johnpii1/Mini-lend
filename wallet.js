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
    // "I COMMENTED BECAUSE THI IMPLEMENTATION I NOT NEEDED NOW"
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

// ============ txHandler ============
async function handleTx(sendTxFn, successMessage) {
  try {
    // 1. Send transaction
    const hash = await sendTxFn();

    // 2. Wait for mining
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (receipt.status !== "success") {
      throw new Error("Transaction reverted");
    }

    return receipt;
  } catch (error) {
    console.error(error);
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
      miniLend = getMiniLendContract(walletClient);
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

export function handleDisconnect() {
  disconnectWallet(); // clear app state
  location.href = "index.html"; // go back to home
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Initializing DApp...");

  // 1. Check if wallet is already connected
  await checkExistingConnection();
});

async function checkExistingConnection() {
  if (window.ethereum && window.ethereum.selectedAddress) {
    window.ethereum.on("accountsChanged", (userAddress) => {
      if (userAddress.length === 0) {
        // Wallet disconnected
        console.log("Wallet disconnected, reloading...");
        // setTimeout(() => window.location.reload(), 100);
      }
    });
    console.log("Wallet already connected:", window.ethereum.selectedAddress);
    connectHeaderBtn.innerText = shortenAddress(
      window.ethereum.selectedAddress,
    );
  }
}
