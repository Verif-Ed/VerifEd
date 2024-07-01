import { useWallet, SuiChainId } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useMemo } from "react";
import usewalletStore from "../store/walletStore";

const createLottoContractAddr = new Map([
  [
    "sui:testnet",
    "0x6dd7d9f8071c87df0ec4c5c272a978803e1e3bf6af2704d65d20f83296a0168f::verif_ed::join_test",
    // "0x5ea6aafe995ce6506f07335a40942024106a57f6311cb341239abf2c3ac7b82f::nft::mint",
  ],
  // Add other networks if needed
]);

// let val = {
//   id: {
//     id: "0x2a8265103eb8cbe1e81fe54ff1f40099b02184532c01c4a303b1cc7ec5ed40fe",
//   },
//   table: {
//     fields: {
//       id: {
//         id: "0x543761706d09540b0fa5119659c68b460a95ac8949768f34edb3accddb378425",
//       },
//       size: "0",
//     },
//     type: "0x2::table::Table<u64, 0xa2fc1b66ce0666be1dfba897a01f2f1b271b850ac7a9cb8046ecaa7ea488a7b3::verif_ed::Test>",
//   },
//   test_count: "0",
// };

const SendSuiTx = () => {
  const wallet = useWallet();
  const { isWalletConnected } = usewalletStore();
  // const { balance } = useAccountBalance();
  const lottoContractAddr = useMemo(() => {
    if (!wallet.chain) return "";
    return createLottoContractAddr.get(wallet.chain.id) ?? "";
  }, [wallet]);
  console.log("lottoContractAddr", lottoContractAddr, wallet.chain?.id);

  // function uint8arrayToHex(value: Uint8Array | undefined) {
  //   if (!value) return "";
  //   // @ts-ignore
  //   return value.toString("hex");
  // }
  // const moduleName = "verif_ed";
  // const functionName = "join_test";
  const verifDirId =
    "0x8cefb07599e4a1037d74b9e9300a15aaeb703ed7aaa4361c8bf8c1217d46e0be";
  let testId: number = 1;
  const name = "Bob";
  const certificateId = 12345;
  const dateTimestamp = 1625155;

  async function handleExecuteMoveCall(target: string | undefined) {
    if (!target) return;
    const sharedObjectArg = {
      Object: {
        Shared: {
          objectId: verifDirId,
          initialSharedVersion: 1311462, // Ensure this matches the correct initial version
          mutable: true,
        },
      },
    };
    try {
      const tx = new TransactionBlock();

      // Add the other arguments as pure values
      // tx.addPureArg(testId, 'u64');
      // tx.addPureArg(name, 'String');
      // tx.addPureArg(certificateId, 'u64');
      // tx.addPureArg(dateTimestamp, 'u64');
      tx.moveCall({
        target: target as any,
        arguments: [
          // tx.sharedObjectRef(sharedObjectArg),
          tx.object(sharedObjectArg),
          tx.pure(testId),
          tx.pure(name),
          tx.pure(certificateId),
          tx.pure(dateTimestamp),
        ], // No additional arguments needed for create_lotto
      });

      // const gasBudget = 10000; // Adjust this value as needed

      // Add the other arguments as pure values

      // Move call setup

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
        <>
          <button
            className="btn"
            onClick={() => handleExecuteMoveCall(lottoContractAddr)}
          >
            Create Lotto {chainName(wallet.chain?.id)}
          </button>
          <button className="btn" onClick={() => handleSignMsg()}>
            Create msg {chainName(wallet.chain?.id)}
          </button>
        </>
      )}
    </>
  );
};
export default SendSuiTx;
