//FOR HEADER BACKGROUND
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("bg-[#2b0f0f]", "shadow-lg");
  } else {
    header.classList.remove("bg-[#2b0f0f]", "shadow-lg");
  }
});



//FOR MOBILE FQ AND WHITE PAPER
const headerBtn = document.getElementById("headers");
const headermenus = document.querySelector(".menus");
const closeBtns = document.getElementById("closebtn");

headerBtn.addEventListener("click", () => {
  headermenus.classList.toggle("hidden");
});

 closeBtns.addEventListener("click", () => {
    headermenus.classList.toggle("hidden");
  });





import {
  createWalletClient,
  createPublicClient,
  custom,
  http,
} from "https://esm.sh/viem";
import { setModalState, MODAL_STATE, closeModal } from "./modalController.js";
// import {
//   renderModal,
//   setModalState,
//   getModalConfig,
//   MODAL_STATE,
//   closeModal,
// } from "./dummy.js";
import { EXPECTED_CHAIN } from "./config.js";

const connectHeaderBtn = document.getElementById("headerConnect");
let walletClient;
let publicClient;
let account = null;

// shorten address
export function shortenAddress(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

export function getAccount() {
  const savedAccount = localStorage.getItem("account");
  if (savedAccount) {
    account = savedAccount;
  }
  return account;
}

function updateAccount(newAccount) {
  account = newAccount;
  localStorage.setItem("account", newAccount);
  localStorage.setItem("connected", "true");
}

// testing mode: always reset
localStorage.setItem("hideMetaMaskWarning", "false");

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
  // const chainId = await walletClient.getChainId();

  // if (chainId !== EXPECTED_CHAIN.id) {
  //   throw new Error("WRONG_NETWORK");
  // }

  const addresses = await walletClient.requestAddresses();
  account = addresses[0];
  connectHeaderBtn.innerText = shortenAddress(account);
  updateAccount(account);
  return account;
}

function disconnectWallet() {
  account = null;
  localStorage.removeItem("connected");
  localStorage.removeItem("account");
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
    if (account) {
      setModalState(MODAL_STATE.DISCONNECT, {
        account,
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
            message: err.message,
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
