import * as React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MetaMaskSDK } from "@metamask/sdk";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import {
  WagmiConfig,
  WindowProvider,
  configureChains,
  createConfig,
} from "wagmi";
import {
  gnosisChiado,
  goerli,
  polygonZkEvmTestnet,
  celoAlfajores,
  celoCannoli,
  lineaTestnet,
  hardhat,
} from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Web3Modal } from "@web3modal/react";

import { Collection } from "./pages/Collection";
import { Breed } from "./pages/Breed";
import { Mint } from "./pages/Mint";

// Env vars
const PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

// Wagmi setup
const chains = [
  gnosisChiado,
  goerli,
  polygonZkEvmTestnet,
  celoAlfajores,
  celoCannoli,
  lineaTestnet,
  hardhat,
];

const MMSDK = new MetaMaskSDK({
  injectProvider: true,
  dappMetadata: { name: "ZKML AiArt" },
});

const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId: PROJECT_ID }),
]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Metamask SDK",
        getProvider() {
          return MMSDK.getProvider() as unknown as WindowProvider;
        },
      },
    }),
    ...w3mConnectors({ projectId: PROJECT_ID, chains }),
  ],
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const router = createBrowserRouter([
  { path: "/", element: <Collection /> },
  {
    path: "/breed",
    element: <Breed />,
  },
  { path: "/breed/mint", element: <Mint /> },
]);

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RouterProvider router={router} />
    </WagmiConfig>
    <Web3Modal projectId={PROJECT_ID} ethereumClient={ethereumClient} />
  </React.StrictMode>,
);
