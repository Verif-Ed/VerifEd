import {
  ConnectButton,
  useAccountBalance,
  useWallet,
  SuiChainId,
  ErrorCode,
  formatSUI,
} from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useMemo } from "react";
import usewalletStore from "../store/walletStore";

const createLottoContractAddr = new Map([
  [
    "sui:testnet",
    "0x1cb62f009c0c85af90601ca691a30af02bcbcc22ef139523a203dc0c558dbdcd::sui_lotto::create_lotto",
    // "0x5ea6aafe995ce6506f07335a40942024106a57f6311cb341239abf2c3ac7b82f::nft::mint",
  ],
  // Add other networks if needed
]);

const SendSuiTx = () => {
  const wallet = useWallet();
  const { isWalletConnected } = usewalletStore();
  const { balance } = useAccountBalance();
  const lottoContractAddr = useMemo(() => {
    if (!wallet.chain) return "";
    return createLottoContractAddr.get(wallet.chain.id) ?? "";
  }, [wallet]);

  function uint8arrayToHex(value: Uint8Array | undefined) {
    if (!value) return "";
    // @ts-ignore
    return value.toString("hex");
  }

  async function handleExecuteMoveCall(target: string | undefined) {
    if (!target) return;

    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: target as any,
        arguments: [], // No additional arguments needed for create_lotto
      });

      // const gasBudget = 10000; // Adjust this value as needed

      const resData = await wallet.signAndExecuteTransactionBlock({
        // @ts-ignore
        transactionBlock: tx,
        options: {},
        // gasBudget,
      });
      console.log("executeMoveCall success", resData);
      alert("executeMoveCall succeeded (see response in the console)");
    } catch (e) {
      console.error("executeMoveCall failed", e);
      alert("executeMoveCall failed (see response in the console)");
    }
  }
  async function handleSignMsg() {
    if (!wallet.account) return;
    try {
      const msg = "Hello world!";
      const msgBytes = new TextEncoder().encode(msg);
      const result = await wallet.signPersonalMessage({
        message: msgBytes,
      });
      const verifyResult = await wallet.verifySignedMessage(
        result,
        wallet.account.publicKey
      );
      console.log("verify signedMessage", verifyResult);
      if (!verifyResult) {
        alert(`signMessage succeed, but verify signedMessage failed`);
      } else {
        alert(`signMessage succeed, and verify signedMessage succeed!`);
      }
    } catch (e) {
      console.error("signMessage failed", e);
      alert("signMessage failed (see response in the console)");
    }
  }

  const chainName = (chainId: string | undefined) => {
    switch (chainId) {
      case SuiChainId.MAIN_NET:
        return "Mainnet";
      case SuiChainId.TEST_NET:
        return "Testnet";
      case SuiChainId.DEV_NET:
        return "Devnet";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      {lottoContractAddr && isWalletConnected && (
        <button
          className="btn"
          onClick={() => handleExecuteMoveCall(lottoContractAddr)}
        >
          Create Lotto {chainName(wallet.chain?.id)}
        </button>
      )}
    </>
  );
};
export default SendSuiTx;
