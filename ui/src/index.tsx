import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
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
import { ApiClient } from "./services/clients";
import { Mint } from "./pages/Mint";

// Env vars
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

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

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
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
    ...w3mConnectors({ projectId, chains }),
  ],
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const apiClientContext = createContext(new ApiClient("http://localhost:8080"));

const router = createBrowserRouter([
  { path: "/", element: <Collection /> },
  {
    path: "/breed",
    element: <Breed />,
  },
  { path: "/breed/mint", element: <Mint /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RouterProvider router={router} />
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </React.StrictMode>,
);
