// modalController.js
const modal = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const modalActionBtn = document.getElementById("connectWalletBtn");
const modalFooter = document.getElementById("modalFooter");
const closeBtn = document.getElementById("closeModal");



export const MODAL_STATE = {
  CONNECT: "CONNECT",
  DISCONNECT: "DISCONNECT",
  NO_WALLET: "NO_WALLET",
  WRONG_NETWORK: "WRONG_NETWORK",
  ERROR: "ERROR",
};

let currentAction = null;

// ---- OPEN / CLOSE ----
export function openModal() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

export function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

export function disconnectModal() {}

// ---- RENDER MODAL STATE ----
export function setModalState(state, payload = {}) {
  modalActionBtn.onclick = null; // reset old actions

  switch (state) {
    case MODAL_STATE.CONNECT:
      modalTitle.textContent = "Connect Your Wallet";
      modalMessage.textContent =
        "Link your digital wallet to start staking assets and accessing stable coin loans on Minilend.";
      modalActionBtn.textContent = "Connect Wallet";

      currentAction = payload.onAction;
      break;

    case MODAL_STATE.DISCONNECT:
      modalTitle.textContent = "Wallet Connected";
      modalMessage.textContent = `Connected as ${payload.account}`;
      modalActionBtn.textContent = "Disconnect Wallet";
      modalFooter.textContent = "All your activities are secure and private.";

      currentAction = payload.onAction;
      break;

    case MODAL_STATE.NO_WALLET:
      modalTitle.textContent = "No Wallet Detected 🚨";
      modalMessage.textContent = "You need MetaMask to use Minilend.";
      modalActionBtn.textContent = "Install MetaMask";
      modalFooter.textContent = "It's free and easy to set up.";

      currentAction = () => {
        window.open("https://metamask.io/download/", "_blank");
      };
      break;

    case MODAL_STATE.WRONG_NETWORK:
      modalTitle.textContent = "Wrong Network";
      modalMessage.textContent = `Please switch to ${payload.expectedName}.`;
      modalActionBtn.textContent = "Switch Network";

      currentAction = payload.onAction;
      break;

    case MODAL_STATE.ERROR:
      modalTitle.textContent = "Error" + "⚠️";
      modalMessage.textContent = payload.message || "Something went wrong.";
      modalActionBtn.textContent = "Try Again";
      modalFooter.textContent = "";

      currentAction = payload.onAction || closeModal;
      break;
  }

  modalActionBtn.onclick = currentAction;
  openModal();
}

// close button
console.log("closeBtn:", closeBtn);
closeBtn?.addEventListener("click", closeModal);
