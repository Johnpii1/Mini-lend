// import { checkExistingConnection } from "./wallet.js";
import { shortenAddress } from "./wallet.js";
// await checkExistingConnection();

export function renderLiquidationOpportunity({
  borrower,
  debt,
  collateral,
  bonus,
}) {
  const container = document.getElementById("liquidationContainer");

  const box = document.createElement("div");
  box.className = "h-[100px] w-fit rounded-[5px] bg-[#D7CBB1]";

  box.innerHTML = `
    <div class="flex flex-row gap-12 items-center py-2 px-4 md:gap-[5rem]">
      <div class="logo flex flex-col gap-2">
        <h5 class="text-[14px] font-semibold">Borrower</h5>
        <p class="text-[#4E8141] text-[13px]">${shortenAddress(borrower)}</p>
      </div>

      <div class="logo flex flex-col gap-2">
        <h5 class="text-[14px] font-semibold">Debt</h5>
        <p class="text-[#4E8141] text-[13px]">$${debt}</p>
      </div>

      <div class="logo flex flex-col gap-2">
        <h5 class="text-[14px] font-semibold">Collateral</h5>
        <p class="text-[#4E8141] text-[13px]">$${collateral}</p>
      </div>

      <div class="logo flex flex-col gap-2">
        <h5 class="text-[14px] font-semibold">Bonus</h5>
        <p class="text-[#4E8141] text-[12px]">${bonus}%</p>
      </div>
    </div>

    <div class="logo flex justify-center items-center">
      <button 
        class="w-[50px] h-auto bg-[#6DD054] rounded-[7px]"
        onclick="liquidatePosition('${borrower}')"
      >
        Go
      </button>
    </div>
  `;

  container.appendChild(box);
}

export function clearLiquidations() {
  const container = document.getElementById("liquidationContainer");
  container.innerHTML = "";
}
