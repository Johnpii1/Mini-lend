import { disconnectWallet } from "./wallet.js";

//FOR MODULAR1
const openBtn1 = document.querySelectorAll(".Modaled1");
const closeBnt1 = document.getElementById("closeModal1");
const modals1 = document.getElementById("modalOverlay1");

openBtn1.forEach((bnt) => {
  bnt.addEventListener("click", () => {
    modals1.classList.remove("hidden");
    modals1.classList.add("flex");
  });
});

closeBnt1.addEventListener("click", () => {
  modals1.classList.add("hidden");
  modals1.classList.remove("flex");
});

modals1.addEventListener("click", (e) => {
  if (e.target === modals1) {
    modals1.classList.add("hidden");
    modals1.classList.remove("flex");
  }
});

//FOR MODULAR2
const openBtn2 = document.querySelectorAll(".Modaled2");
const closeBnt2 = document.getElementById("closeModal2");
const modals2 = document.getElementById("modalOverlay2");

openBtn2.forEach((bnt) => {
  bnt.addEventListener("click", () => {
    modals2.classList.remove("hidden");
    modals2.classList.add("flex");
  });
});

closeBnt2.addEventListener("click", () => {
  modals2.classList.add("hidden");
  modals2.classList.remove("flex");
});

modals2.addEventListener("click", (e) => {
  if (e.target === modals2) {
    modals2.classList.add("hidden");
    modals2.classList.remove("flex");
  }
});

//FOR MODULAR3
const openBtn3 = document.querySelectorAll(".Modaled3");
const closeBnt3 = document.getElementById("closeModal3");
const modals3 = document.getElementById("modalOverlay3");

openBtn3.forEach((bnt) => {
  bnt.addEventListener("click", () => {
    modals3.classList.remove("hidden");
    modals3.classList.add("flex");
  });
});

closeBnt3.addEventListener("click", () => {
  modals3.classList.add("hidden");
  modals3.classList.remove("flex");
});

modals3.addEventListener("click", (e) => {
  if (e.target === modals3) {
    modals3.classList.add("hidden");
    modals3.classList.remove("flex");
  }
});

//FOR MODULAR4
const openBtn4 = document.querySelectorAll(".Modaled4");
const closeBnt4 = document.getElementById("closeModal4");
const modals4 = document.getElementById("modalOverlay4");

openBtn4.forEach((bnt) => {
  bnt.addEventListener("click", () => {
    modals4.classList.remove("hidden");
    modals4.classList.add("flex");
  });
});

closeBnt4.addEventListener("click", () => {
  modals4.classList.add("hidden");
  modals4.classList.remove("flex");
});

modals4.addEventListener("click", (e) => {
  if (e.target === modals4) {
    modals4.classList.add("hidden");
    modals4.classList.remove("flex");
  }
});

//FOR MODULAR5
// SELECT ELEMENTS
const openBtn5 = document.querySelectorAll(".Modaled5");
const modal5 = document.getElementById("modalOverlay5");
const closeBtn5 = document.getElementById("closeModal5");

// OPEN MODAL
openBtn5.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal5.classList.remove("hidden");
    modal5.classList.add("flex"); // needed for center alignment
  });
});

// CLOSE MODAL
closeBtn5.addEventListener("click", () => {
  modal5.classList.add("hidden");
});

//FOR MODULAR5
// SELECT ELEMENTS
const openBtn6 = document.querySelectorAll(".Modaled6");
const modal6 = document.getElementById("modalOverlay6");
const closeBtn6 = document.getElementById("closeModal6");

// OPEN MODAL
openBtn6.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal6.classList.remove("hidden");
    modal6.classList.add("flex"); // needed for center alignment
  });
});

// CLOSE MODAL
closeBtn6.addEventListener("click", () => {
  modal6.classList.add("hidden");
});

// WALLET DISCONNECT
document
  .getElementById("disconnectWalletBtn")
  .addEventListener("click", async () => {
    await disconnectWallet();
    location.href = "index.html"; // optional: redirect to home after disconnect
  });

const ETH_PRICE = 3200;

const ethInputs = document.querySelectorAll(".ethInput");
const usdOutputs = document.querySelectorAll(".usdOutput");

ethInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    const eth = Number(input.value);

    if (!eth) {
      usdOutputs[index].textContent = "$0";
      return;
    }

    const usd = eth * ETH_PRICE;
    usdOutputs[index].textContent = "$" + usd.toFixed(2);
  });
});
