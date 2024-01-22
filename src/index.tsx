import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { ThirdwebProvider, metamaskWallet, rainbowWallet, en, coreWallet, walletConnect } from "@thirdweb-dev/react";
import { Avalanche } from "@thirdweb-dev/chains";

const activeChain = "avalanche";



const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.REACT_APP_TEMPLATE_CLIENT_ID}
      locale={en()}
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        coreWallet({ recommended: true }),
        walletConnect({ recommended: true }),
        rainbowWallet({ recommended: true }),
      ]}
      supportedChains={[Avalanche]}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);

