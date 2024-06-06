import {
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";

import { Transaction } from "@mysten/sui/transactions";
import { useState } from "react";

function MyComponent() {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [digest, setDigest] = useState("");
  const currentAccount = useCurrentAccount();

  return (
    <div style={{ padding: 20 }}>
      <ConnectButton />
      {currentAccount && (
        <>
          <div>
            <button
              onClick={() => {
                signAndExecuteTransaction(
                  {
                    transaction: new Transaction(),
                    chain: "sui:devnet",
                  },
                  {
                    onSuccess: (result) => {
                      console.log("executed transaction", result);
                      setDigest(result.digest);
                    },
                  }
                );
              }}
            >
              Sign and execute transaction
            </button>
          </div>
          <div>Digest: {digest}</div>
        </>
      )}
    </div>
  );
}

export default MyComponent;
