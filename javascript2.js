import {
  disconnectWallet,
  borrowAsset,
  repayAsset,
  withdrawETH,
  stakeETH,
  spinner,
} from "./wallet.js";

// FOR HEALTH FACTOR
// Hide all first
// const safe = document.getElementById("safeStatus");
// const warning = document.getElementById("warningStatus");
// const trigger = document.getElementById("liquidateStatus");
const liquidation = document.getElementById("liquidationModal");
const closeLiquidation = document.getElementById("closeLiquidationModal");

// export function updateHealthStatus(healthFactor) {
//   // Show appropriate one
//   if (healthFactor >= 2) {
//     warning.classList.add("hidden");
//     trigger.classList.add("hidden");
//     safe.classList.remove("hidden");
//   } else if (healthFactor >= 1 && healthFactor < 2) {
//     safe.classList.add("hidden");
//     warning.classList.remove("hidden");
//   } else {
//     safe.classList.add("hidden");
//     warning.classList.add("hidden");
//     trigger.classList.remove("hidden");
//     liquidation.classList.remove("hidden");
//     liquidation.classList.add("flex");
//   }
// }

closeLiquidation.addEventListener("click", () => {
  liquidation.classList.add("hidden");
  liquidation.classList.remove("flex");
});

//FOR MODULAR1
const openBtn1 = document.querySelectorAll(".Modaled1");
const closeBnt1 = document.getElementById("closeModal1");
const modals1 = document.getElementById("modalOverlay1");

openBtn1.forEach((bnt) => {
  bnt.addEventListener("click", () => {
    modals1.classList.remove("hidden");
    modals1.classList.add("flex");
    liquidation.classList.add("hidden");
    liquidation.classList.remove("flex");
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
    liquidation.classList.add("hidden");
    liquidation.classList.remove("flex");
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

//FOR MODULAR6
// SELECT ELEMENTS
const openBtn6 = document.querySelectorAll(".Modaled6");
const modal6 = document.getElementById("modalOverlay6");
const closeBtn6 = document.getElementById("closeModal6");

// OPEN MODAL
openBtn6.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal6.classList.remove("hidden");
    modal6.classList.add("flex");
  });
});

// CLOSE MODAL
closeBtn6.addEventListener("click", () => {
  modal6.classList.add("hidden");
});

//SEND DROP DOWN MENU FOR DESKTOP
document.addEventListener("DOMContentLoaded", () => {
  const walletModal = document.getElementById("modalOverlay5");
  const sendModal = document.getElementById("sendModal");

  const sendBtn = document.querySelector(".send_btns");
  const backBtn = document.getElementById("backToWallet");

  const closeWallet = document.getElementById("closeModal5");
  const closeSend = document.getElementById("closeSendModal");

  // OPEN SEND MODAL
  sendBtn.addEventListener("click", () => {
    walletModal.classList.add("hidden");
    sendModal.classList.remove("hidden");
    sendModal.classList.add("flex"); // IMPORTANT (because you used items-center)
  });

  // BACK TO WALLET
  backBtn.addEventListener("click", () => {
    sendModal.classList.add("hidden");
    walletModal.classList.remove("hidden");
    walletModal.classList.add("flex");
  });

  // CLOSE BUTTONS
  closeWallet.addEventListener("click", () => {
    walletModal.classList.add("hidden");
  });

  closeSend.addEventListener("click", () => {
    sendModal.classList.add("hidden");
  });
});

//SEND DROP DOWN MENU FOR DESKTOP
document.addEventListener("DOMContentLoaded", () => {
  const walletModals = document.getElementById("modalOverlay6");
  const sendModals = document.getElementById("sendModal1");

  const sendBtns = document.querySelector(".send_btns1");
  const backBtns = document.getElementById("backToWallet1");

  const closeWallets = document.getElementById("closeModal6");
  const closeSends = document.getElementById("closeSendModal1");

  // OPEN SEND MODAL
  sendBtns.addEventListener("click", () => {
    walletModals.classList.add("hidden");
    sendModals.classList.remove("hidden");
    sendModals.classList.add("flex"); // IMPORTANT (because you used items-center)
  });

  // BACK TO WALLET
  backBtns.addEventListener("click", () => {
    sendModals.classList.add("hidden");
    walletModals.classList.remove("hidden");
    walletModals.classList.add("flex");
  });

  // CLOSE BUTTONS
  closeWallets.addEventListener("click", () => {
    walletModals.classList.add("hidden");
  });

  closeSends.addEventListener("click", () => {
    sendModals.classList.add("hidden");
  });
});

// WALLET DISCONNECT
document
  .getElementById("USER_DISCONNET")
  .addEventListener("click", async () => {
    await disconnectWallet();
  });

document
  .getElementById("disconnectMobile")
  .addEventListener("click", async () => {
    await disconnectWallet();
  });

// Borrow and Repay and withdraw
const stake = document.getElementById("connectWalletBtn1");

if (stake) {
  document.getElementById("connectWalletBtn1").onclick = async () => {
    const eth = document.getElementById("stakeInput").value;
    // console.log(getuserAddress());
    if (!eth || isNaN(eth) || eth == 0) {
      stake.textContent = "Invalid Input";
      return;
    }
    stake.disabled = true; // Disable button to prevent multiple clicks
    try {
      stake.innerHTML = `
        ${spinner}
        <span>Staking...</span>
      `;
      await stakeETH(eth);
      stake.textContent = "✓ Success";
      setTimeout(() => {
        modals1.classList.add("hidden");
        modals1.classList.remove("flex");
      }, 1500);
    } catch (err) {
      stake.innerHTML = "Failed";
    } finally {
      setTimeout(() => {
        stake.disabled = false;
        stake.innerHTML = "Stake";
      }, 1500);
    }
  };
}

const borrow = document.getElementById("connectWalletBtn2");

borrow.onclick = async () => {
  const amt = document.getElementById("borrowInput").value;
  const selectedSymbol = document.getElementById("tokenSelect").value;
  console.log("Borrowing", amt, selectedSymbol);

  if (!amt || isNaN(amt) || amt == 0) {
    borrow.textContent = "Invalid Input";
    return;
  }

  // this.disabled = true;

  try {
    borrow.innerHTML = `
        ${spinner}
        <span>Borrowing...</span>
      `;

    await borrowAsset(selectedSymbol, amt);

    borrow.disabled = false;
    borrow.textContent = "✓ Success";
    setTimeout(() => {
      modals2.classList.add("hidden");
      modals2.classList.remove("flex");
    }, 1500);
  } catch (err) {
    borrow.disabled = false;
    borrow.innerHTML = "Failed";
  } finally {
    setTimeout(() => {
      borrow.disabled = false;
      borrow.innerHTML = "Borrow";
    }, 1500);
  }
};

const repay = document.getElementById("connectWalletBtn3");
repay.onclick = async () => {
  const amt = document.getElementById("repayInput").value;
  const selectedSymbol = document.getElementById("tokenSelect2").value;
  console.log("Repaying", amt, selectedSymbol);

  if (!amt || isNaN(amt) || amt == 0) {
    repay.textContent = "Invalid Input";
    return;
  }

  repay.disabled = true;

  try {
    repay.innerHTML = `
        ${spinner}
        <span>Repaying...</span>
      `;
    await repayAsset(selectedSymbol, amt);
    repay.textContent = "✓ Success";
    setTimeout(() => {
      modals3.classList.add("hidden");
      modals3.classList.remove("flex");
    }, 1500);
  } catch (err) {
    repay.innerHTML = "Failed";
  } finally {
    setTimeout(() => {
      repay.disabled = false;
      repay.innerHTML = "Repay";
    }, 1500);
  }
};

const withdraw = document.getElementById("connectWalletBtn4");

if (withdraw) {
  document.getElementById("connectWalletBtn4").onclick = async () => {
    const eth = document.getElementById("withdrawInput").value;
    // console.log(getuserAddress());
    if (!eth || isNaN(eth) || eth == 0) {
      withdraw.textContent = "Invalid Input";
      return;
    }
    withdraw.disabled = true; // Disable button to prevent multiple clicks
    try {
      withdraw.innerHTML = `
        ${spinner}
        <span>Withdrawing...</span>
      `;
      await withdrawETH(eth);
      withdraw.textContent = "✓ Sucess";
      setTimeout(() => {
        modals4.classList.add("hidden");
        modals4.classList.remove("flex");
      }, 1500);
    } catch (err) {
      withdraw.textContent = "Failed";
      // alert("Withdrawal failed: " + err.message);
    } finally {
      setTimeout(() => {
        withdraw.disabled = false;
        withdraw.innerHTML = "Withdraw";
      }, 1500);
    }
  };
}

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
