import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import * as dotenv from "dotenv";
import "hardhat-change-network";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  paths: {
    sources: "./contracts",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      blockGasLimit: 30_000_000,
      forking: {
        url: "https://rpc.ankr.com/eth",
        enabled: true,
        blockNumber: 17749850,
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    ethereum: {
      url: "https://rpc.ankr.com/eth",
      chainId: 1,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      chainId: 5,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    chiado: {
      url: "https://rpc.chiadochain.net",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 10200
    },
    mantle: {
      url: "https://rpc.testnet.mantle.xyz",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 5001
    }
  },
  etherscan: {
    apiKey: {
      ethereum: `${process.env.ETHER_SCAN_API_KEY}`,
      goerli: `${process.env.ETHER_SCAN_API_KEY}`,
    },
  },
};

export default config;
