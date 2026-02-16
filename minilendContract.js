export const CONTRACTS = {
  sepolia: {
    myContract: {
      address: "0x751B8eC585Ba3bdc38690e663151a7ceb4861a72",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
          ],
          name: "approveToken",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "tokens",
              type: "address[]",
            },
            {
              internalType: "address[]",
              name: "feeds",
              type: "address[]",
            },
            {
              internalType: "uint256",
              name: "_ltv",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_liquidationThreshold",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_liquidationBonus",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_closeFactor",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "bonus",
              type: "uint256",
            },
          ],
          name: "BadBonus",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "ltv",
              type: "uint256",
            },
          ],
          name: "Badltv",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "availableToBorrow",
              type: "uint256",
            },
          ],
          name: "BorrowLimitExceeded",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "balance",
              type: "uint256",
            },
          ],
          name: "BorrowedAmountNotFullyRepaid",
          type: "error",
        },
        {
          inputs: [],
          name: "FeedDataNotFinalized",
          type: "error",
        },
        {
          inputs: [],
          name: "InsufficientCollateral",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "poolBalance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "requestedAmount",
              type: "uint256",
            },
          ],
          name: "InsufficientPoolBalance",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "addr",
              type: "address",
            },
          ],
          name: "InvalidAddress",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidAmount",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "asset",
              type: "address",
            },
          ],
          name: "InvalidAsset",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidCloseFactor",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidDecimals",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "int256",
              name: "price",
              type: "int256",
            },
          ],
          name: "InvalidPriceData",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "threshold",
              type: "uint256",
            },
          ],
          name: "InvalidThreshold",
          type: "error",
        },
        {
          inputs: [],
          name: "LengthMismatch",
          type: "error",
        },
        {
          inputs: [],
          name: "NoActivePosition",
          type: "error",
        },
        {
          inputs: [],
          name: "NoCollateralProvided",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "collateralBalance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "userInput",
              type: "uint256",
            },
          ],
          name: "NotEnoughCollateral",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "amountPaid",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "expectedAmount",
              type: "uint256",
            },
          ],
          name: "OverPaymentNotSupported",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "OwnableInvalidOwner",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "OwnableUnauthorizedAccount",
          type: "error",
        },
        {
          inputs: [],
          name: "PositionHealthy",
          type: "error",
        },
        {
          inputs: [],
          name: "ReentrancyGuardReentrantCall",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
          ],
          name: "SafeERC20FailedOperation",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "data",
              type: "uint256",
            },
          ],
          name: "StalePriceData",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
          ],
          name: "TokenAlreadyApproved",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
          ],
          name: "TokenNotApproved",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "TransferFailed",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "newBonus",
              type: "uint256",
            },
          ],
          name: "BonusUpdated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "borrowAsset",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "ETHCollateralWithdrawn",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "ethAmount",
              type: "uint256",
            },
          ],
          name: "EthStaked",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "borrower",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "repayAmount",
              type: "uint256",
            },
          ],
          name: "liquidate",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "liquidator",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "borrower",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "repayAmount",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "seizedCollateral",
              type: "uint256",
            },
          ],
          name: "Liquidation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "token",
              type: "address",
            },
          ],
          name: "NewTokenApproved",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "feed",
              type: "address",
            },
          ],
          name: "PriceFeedUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "token",
              type: "address",
            },
          ],
          name: "TokenRevoked",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "usdAmount",
              type: "uint256",
            },
          ],
          name: "USDBorrowed",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "usdAmount",
              type: "uint256",
            },
          ],
          name: "USDRepaid",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "newltv",
              type: "uint256",
            },
          ],
          name: "ltvUpdated",
          type: "event",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "repayAmount",
              type: "uint256",
            },
          ],
          name: "repayAsset",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
          ],
          name: "revokeTokenApproval",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              internalType: "address",
              name: "feed",
              type: "address",
            },
          ],
          name: "setFeed",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_bonus",
              type: "uint256",
            },
          ],
          name: "setLiquidationBonus",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_ltv",
              type: "uint256",
            },
          ],
          name: "setltv",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "stakeEth",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "fallback",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "withdrawCollateralEth",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
          ],
          name: "_borrowableAmount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "approvedTokenList",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "approvedTokens",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "ETH_ADDRESS",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getApprovedTokensCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
          ],
          name: "getContractBalance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
          ],
          name: "getLatestPrice",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "getUsdValue",
          outputs: [
            {
              internalType: "uint256",
              name: "usdValue",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "getUser",
          outputs: [
            {
              internalType: "address",
              name: "stakedAsset",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "stakedAmount",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "debtAsset",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "debtAmount",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
          ],
          name: "isTokenApproved",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "priceFeeds",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "tokenIndex",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "userPositionHealth",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "users",
          outputs: [
            {
              internalType: "address",
              name: "stakedAsset",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "stakedAmount",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "debtAsset",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "debtAmount",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
    },
  },
};
