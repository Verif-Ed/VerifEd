import { create } from "zustand";

type Wallet = {
  name: string | undefined;
  address: string | undefined;
  chain: {
    name: string | undefined;
    id: string | undefined;
    rpcUrl: string | undefined;
  };
  connected: boolean;
};

interface WalletState {
  wallet: Wallet;
  isWalletConnected: boolean;
  setWallet: (wallet: Wallet) => void;
  setWalletConnected: (isConnected: boolean) => void;
}
const usewalletStore = create<WalletState>((set) => ({
  wallet: {
    name: "",
    address: "",
    chain: {
      name: "",
      id: "",
      rpcUrl: "",
    },
    connected: false,
  },
  isWalletConnected: false,
  setWallet: (wallet) => set({ wallet }),
  setWalletConnected: (isConnected) => set({ isWalletConnected: isConnected }),
}));
export default usewalletStore;
