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
import { CONTRACTS, TOKENS } from "./minilendContract.js";
import { linkinfo } from "./linkAbi.js";

const connectHeaderBtn = document.getElementById("headerConnect");
const tokenMetaCache = {}; // simple in-memory cache for token metadata
let walletClient;
let publicClient;
let userAddress = null;
let miniLend;
let chainId = null;

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
    abi: erc20Abi,
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

export async function borrowAsset(tokenSymbol, amount) {
  const token = TOKENS[tokenSymbol];
  if (!token) throw new Error("Unsupported token");

  const tokenAddress = token.address;

  // Get cached decimals
  const decimals = await getTokenDecimals(tokenAddress);

  const amountUnits = parseUnits(amount.toString(), decimals);

  return executeMiniLendTx({
    functionName: "borrowAsset",
    args: [tokenAddress, amountUnits],
  });
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
