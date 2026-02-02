import {
  createWalletClient,
  createPublicClient,
  custom,
  http,
} from "https://esm.sh/viem";

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

// ========\wallet Detection and connection ============
function detectWallet() {
  const hideWarning = localStorage.getItem("hideMetaMaskWarning");
  if (hideWarning === "true") return;

  if (!window.ethereum) {
    const modal = document.getElementById("walletModal");
    const message = document.getElementById("walletMessage");
    const installBtn = document.getElementById("installBtn");

    // detect mobile
    const isMobile = /android|iphone|ipad|mobile/i.test(navigator.userAgent);

    if (isMobile) {
      message.textContent = "MetaMask Mobile is required to use this DApp.";
      installBtn.onclick = () =>
        window.open("https://metamask.app.link/", "_blank");
    } else {
      message.textContent =
        "MetaMask browser extension is required to use this DApp.";
      installBtn.onclick = () =>
        window.open(
          "https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
          "_blank",
        );
    }

    modal.style.display = "flex";

    document.getElementById("closeBtn").onclick = () => {
      modal.style.display = "none";

      if (document.getElementById("dontShow").checked) {
        localStorage.setItem("hideMetaMaskWarning", "true");
      }
    };
  }
}

// =========== WALLET CLIENT & PUBLIC CLIENT ============
async function connectWallet() {
  if (!window.ethereum) {
    detectWallet();
  }

  try {
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
  } catch (error) {
    console.error("Error connecting wallet:", error);
    alert("Failed to connect wallet.");
  }
}

function disconnectWallet() {
  account = null;
}

connectBtn.addEventListener("click", async () => {
  if (account) {
    // if account is connedcted, show disconnect option
  } else await connectWallet();
});
