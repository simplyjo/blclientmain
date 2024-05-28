import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from "redux";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { thunk } from "redux-thunk";
import reducers from "./Reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'));

const Blast = {
  "chain": "ETH",
  "chainId": 81457,
  "explorers": [
    {
      "name": "Blastscan",
      "url": "https://blastscan.io",
      "standard": "EIP3091"
    },
    {
      "name": "Blast Explorer",
      "url": "https://blastexplorer.io",
      "standard": "EIP3091"
    },
    {
      "name": "dexguru",
      "url": "https://blast.dex.guru",
      "standard": "EIP3091",
      "icon": {
        "url": "ipfs://bafybeifc2h3x7jgy4x4nmg2m54ghbvmkfu6oweujambwefzqzew5vujhsi",
        "width": 400,
        "height": 400,
        "format": "jpg"
      }
    }
  ],
  "faucets": [],
  "features": [],
  "icon": {
    "url": "ipfs://bafybeifc2h3x7jgy4x4nmg2m54ghbvmkfu6oweujambwefzqzew5vujhsi",
    "width": 400,
    "height": 400,
    "format": "jpg"
  },
  "infoURL": "https://blast.io",
  "name": "Blast",
  "nativeCurrency": {
    "name": "Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "networkId": 81457,
  "parent": {
    "type": "L2",
    "chain": "eip155-1",
    "bridges": [
      {
        "url": "https://blast.io/en/bridge"
      }
    ]
  },
  "redFlags": [],
  "rpc": [
    "https://rpc.blast.io",
    "https://rpc.ankr.com/blast",
    "https://blastl2-mainnet.public.blastapi.io",
    "https://blast.blockpi.network/v1/rpc/public",
    "https://blast.din.dev/rpc"
  ],
  "shortName": "blastmainnet",
  "slug": "blast",
  "testnet": false
}

const chain = Blast;

root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={chain}
      supportedChains={[chain]}
      clientId={"6ca59a62b7927b0e7eca45b19e0f2d05"}
      autoConnect={true}
      dAppMeta={{
        name: "Blastarians",
        description: "First-ever pixelated NFTs art on Blast, where creativity meets ultimate yield.",
        logoUrl: "https://d391b93f5f62d9c15f67142e43841acc.ipfscdn.io/ipfs/bafybeidegspfztn5lucchy4u43l45ydjym7qs4s25datr5vklrydy6qfvy/vdG2EsS2_400x400.jpg",
        url: "https://blastarians.xyz",
        isDarkMode: true,
      }}
    >
      <Provider
        store={store}
      >
        <App />
      </Provider>
    </ThirdwebProvider>
  </React.StrictMode>
);

reportWebVitals();
