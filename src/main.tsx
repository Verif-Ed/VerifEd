import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { WalletProvider } from "@suiet/wallet-kit";
import "@mysten/dapp-kit/dist/index.css";

import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ConnectModal } from "@mysten/wallet-kit";
const queryClient = new QueryClient();
const networks = {
  localnet: { url: getFullnodeUrl("localnet") },
  devnet: { url: getFullnodeUrl("devnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <SuiClientProvider networks={networks} defaultNetwork="devnet">
      <WalletProvider>
        <App />
      </WalletProvider>
    </SuiClientProvider>
  </QueryClientProvider>
);
