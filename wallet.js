import {
  createWalletClient,
  createPublicClient,
  custom,
  http,
} from "https://esm.sh/viem";
import { setModalState, MODAL_STATE, closeModal } from "./modalController.js";

const modal = document.getElementById("modalOverlay");
const connectBtn = document.getElementById("connectWalletBtn");
const connectHeaderBtn = document.getElementById("headerConnect");
let walletClient;
let publicClient;
let account = null;

// ============ Anvil Local Blockchain ============
const anvil = {
  id: 31337,
  name: "Anvil Local",
  network: "anvil",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
  },
};

const rpcUrl = anvil.rpcUrls.default.http[0];

// shorten address
function shortenAddress(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

// testing mode: always reset
localStorage.setItem("hideMetaMaskWarning", "false");

// =========== WALLET CLIENT & PUBLIC CLIENT ============
async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("NO_WALLET");
  }

  walletClient = createWalletClient({
    chain: anvil,
    transport: custom(window.ethereum),
  });

  publicClient = createPublicClient({
    chain: anvil,
    transport: http(rpcUrl),
  });

  const addresses = await walletClient.requestAddresses();
  account = addresses[0];
  connectHeaderBtn.innerText = shortenAddress(account);
  return account;
}

function disconnectWallet() {
  account = null;
  localStorage.removeItem("connected");
}

document.querySelectorAll(".openModal").forEach((btn) => {
  btn.addEventListener("click", () => {
    // CASE 3: No wallet detected
    if (!window.ethereum) {
      setModalState(MODAL_STATE.NO_WALLET);
      return;
    }

    // CASE 2: Wallet already connected
    if (account) {
      setModalState(MODAL_STATE.DISCONNECT, {
        account,
        onAction: () => {
          disconnectWallet();
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
          // location.href = "dashboard.html";
          closeModal();
        } catch (err) {
          setModalState(MODAL_STATE.ERROR, {
            message: err.message,
          });
        }
      },
    });
  });
});
