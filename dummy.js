// Currently not in use, but will be the main modal controller in the future.
// For now, it serves as a placeholder to test the modal functionality without affecting the wallet connection logic.
const modal = document.getElementById("modalOverlay");
const titleEl = document.getElementById("modalTitle");
const messageEl = document.getElementById("modalMessage");
const actionBtn = document.getElementById("connectWalletBtn");
const footerEl = document.getElementById("modalFooter");
const closeBtn = document.getElementById("closeModal");

export function openModal() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

export function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

export function renderModal(config) {
  const {
    title,
    message,
    actionText,
    footer = "",
    onAction = closeModal,
  } = config;

  titleEl.textContent = title;
  messageEl.textContent = message;
  actionBtn.textContent = actionText;
  footerEl.textContent = footer;

  actionBtn.onclick = onAction;
  openModal();
}

closeBtn?.addEventListener("click", closeModal);

// modalStates.js
export const MODAL_STATE = {
  CONNECT: "CONNECT",
  DISCONNECT: "DISCONNECT",
  NO_WALLET: "NO_WALLET",
  WRONG_NETWORK: "WRONG_NETWORK",
  ERROR: "ERROR",
};

export function getModalConfig(state, payload = {}) {
  const configs = {
    CONNECT: {
      title: "Connect Your Wallet",
      message:
        "Link your digital wallet to start staking assets and accessing stable coin loans on Minilend.",
      actionText: "Connect Wallet",
      footer: "We do not tore any of your personal data.",
      onAction: payload.onAction,
    },

    DISCONNECT: {
      title: "Wallet Connected",
      message: `Connected as ${payload.account}`,
      actionText: "Disconnect Wallet",
      footer: "All your activities are secure and private.",
      onAction: payload.onAction,
    },

    NO_WALLET: {
      title: "No Wallet Detected 🚨",
      message: "You need MetaMask to use Minilend.",
      actionText: "Install MetaMask",
      footer: "It's free and easy to set up.",
      onAction: () => window.open("https://metamask.io/download/", "_blank"),
    },

    WRONG_NETWORK: {
      title: "Wrong Network",
      message: `Please switch to ${payload.expectedName}.`,
      actionText: "Switch Network",
      onAction: payload.onAction,
    },

    ERROR: {
      title: "Error ⚠️",
      message: payload.message || "Something went wrong.",
      actionText: "Try Again",
      onAction: payload.onAction,
    },
  };

  return configs[state];
}

// modalService.js
export function showModal(state, payload) {
  const config = getModalConfig(state, payload);
  if (!config) return;

  renderModal(config);
}

// // test
// document.getElementById("openConnect").addEventListener("click", () => {
//   showModal(MODAL_STATE.CONNECT, {
//     onAction: () => {
//       console.log("Connecting wallet...");
//     },
//   });
// });
