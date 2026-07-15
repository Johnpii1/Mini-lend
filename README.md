# MiniLend dApp 🏦

A Simple Crypto-Backed Lending System (Built with Solidity, Foundry, Viem & Anvil)

MiniLend is a decentralized lending application where users can:

✅ Stake ETH as collateral
✅ Borrow a mock USD token (MockUSDT) based on collateral value
✅ Repay borrowed tokens
✅ Withdraw their collateral

This project is designed with **learning and experimentation in mind**, especially for beginners entering the Web3 space.
Link to project contract: [Minilend Contract](https://github.com/Osfoce/Mini-Lend_-Defi-project-/tree/main/src/contracts)

---

## 🚀 Prerequisites

Before you begin, make sure you have the following installed:

### ✅ Foundry (Forge + Anvil)

Foundry is used for:

* Compiling smart contracts
* Running the local blockchain (Anvil)
* Deploying contracts using deployment scripts

Install Foundry:

```bash
curl -L https://foundry.paradigm.xyz | bash
```

Reload your terminal:

```bash
source ~/.bashrc
```

Install components:

```bash
foundryup
```

Verify:

```bash
forge --version
anvil --version
```
❗❗❗ If Forge is showing an error, it might be using zoe forge library, and that is not what we want
run 
```bash
export PATH="$HOME/.foundry/bin:$PATH"
```
to change the path and confirm the forge with 
```bash
which forge
```
It should show 
```bash
/.foundry/bin/forge
```

---

## 🧱 Step 1: Start Anvil (Local Blockchain)

Anvil simulates a local Ethereum network with funded accounts.

Run:

```bash
anvil
```

You should see something like:

```
Listening on 127.0.0.1:8545
```

and a list of 10 private keys + addresses funded with 10,000 ETH.

✅ Keep this terminal running
❗ Do NOT close it

---

## 🔑 Step 2: Set Your Private Key

From the Anvil output, copy the first private key:

Example:

```
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

Create a `.env` file:

```
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

✅ No quotes
✅ No spaces

---

## 📦 Step 3: Deploy the Contracts

This project contains two contracts:

1. `MockUSDT.sol` – a mintable ERC20 token
2. `MiniLend.sol` – the lending logic

Deployment is done using a Foundry deploy script.

Run:

```bash
source .env
forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --broadcast --private-key $PRIVATE_KEY
```

If successful, the output will show something like:

```
Deployed MockUSDT at: 0x....
Deployed MiniLend at: 0x....
```

✅ COPY both contract addresses
You will need them in the DApp

---

## 🦊 Step 4: Connect Anvil to MetaMask

Open MetaMask → top network dropdown → Add Network

Click:

**Add network manually**

Enter:

```
Network Name: Anvil
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency Symbol: ETH
```

Save. (Chrome browser preferred)

---

### ✅ Import a funded account

Click:

MetaMask → Account → Import Account

Paste the same private key from `.env`

Now MetaMask shows:

✅ Local network
✅ 10,000 ETH balance

---

## 🌐 Step 5: Run the DApp Frontend

If your frontend is static:

Open `index.html` in a browser

OR run a simple server:

```bash
npx serve.
```

or

```bash
python3 -m http.server
```

---

## 🪝 Step 6: Connect Wallet (IMPORTANT!)

Your dApp **must connect to MetaMask BEFORE loading contracts**

If you load contracts first:

❌ publicClient will not attach properly
❌ walletClient will have no account
❌ calls will fail

So:

1. Open the DApp
2. Click **Connect Wallet**
3. MetaMask will pop up
4. Accept connection

You should now see something like:

```
Connected: 0x643...345
```

---

## 🧳 Step 7: Load Contract Addresses

Paste:

✅ MiniLend contract address
✅ MockUSDT token address

Then click:

👉 Load Contracts

If successful:

```
Contracts loaded
```

---

## 🧪 Step 8: Test the dApp Features

Now you can interact:

### ✅ Stake ETH

Enter an amount (e.g. 1)

Click:

🟩 Stake

Expected:

* Your staked balance increases
* Contract ETH balance increases

---

### ✅ Borrow USD

Enter the amount within the LTV limit

Click:

🟨 Borrow

Expected:

* Your mock USDT balance increases
* Contract USDT decreases or mints

---

### ✅ Approve Spending

Before repaying, you must approve MiniLend to spend your USDT

Click:

🟦 Approve

---

### ✅ Repay Loan

Enter the amount to repay

Click:

🟥 Repay

---

### ✅ Withdraw ETH

Only works when:

✅ You have fully repaid
✅ You have staked ETH

---

## 🧠 Common Mistakes & Fixes

| Problem              | Cause                                      | Fix                            |
| -------------------- | ------------------------------------------ | ------------------------------ |
| No MetaMask popup    | Not served with HTTP / module import error | Use local server               |
| Cannot load contract | Wallet not connected first                 | Connect wallet before load     |
| Balance shows 0      | Wrong address or wrong chain               | Check Anvil + MetaMask network |
| ABI invalid          | Importing wrong field                      | Use `abi: MiniLendAbi.abi`     |

---

## 📦 Project Structure

```
contracts/
  MiniLend.sol
  MockUSDT.sol

script/
  Deploy.s.sol

frontend/
  index.html
  script.js
  abi/
```

---

## ✅ What You Learned

By following this guide, you learned:

✅ How to run a local blockchain (Anvil)
✅ How deployment scripts work in Foundry
✅ How to connect MetaMask to a local chain
✅ How to connect a DApp to MetaMask using Viem
✅ How to interact with deployed contracts

This is the **exact journey every Web3 developer goes through**, and now you have a full working workflow.

---

## ❤️ Final Words

This project exists because:

> "I was once a newbie who couldn't do anything without detailed steps."

If this README helps even one developer avoid frustration, then it has achieved its purpose.

Keep building.
Keep learning.
Your progress is inspiring. 🚀🔥

---
