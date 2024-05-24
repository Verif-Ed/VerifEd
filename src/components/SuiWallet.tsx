// Sui Imports
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useWalletKit } from "@mysten/wallet-kit";

export const useMoveCalls = () => {
  const client = new SuiClient({ url: getFullnodeUrl("devnet") });
  const { signAndExecuteTransactionBlock } = useWalletKit();

  const packageObjectId = "0x…"; // deployed object id for creating developer card
  const tx = new TransactionBlock(); // Create a transaction block
  const devhub = tx.object("0x…");

  // Move Calls

  //  const handleCreateDeveloperCard = async () => {
  //  try {
  //  const [coin] = tx.splitCoins(tx.gas, [1]) // define payment coin

  //  // Calls the create_card function from the devcard package
  //  tx.moveCall({
  //   target: ${packageObjectId}::devcard::create_card,
  //   arguments: [
  //   tx.pure.string('Matt Patt'), // name
  //   tx.pure.string('Frontend Developer'), // title
  //   tx.pure.string(
  //    'https://example_url.png',
  //   ), // img_url
  //   tx.pure.u8(3), // years_of_experience
  //   tx.pure.string('JavaScript, Typescript, Next.js, Node.js'), // technologies
  //   tx.pure.string('https://mattpatt.dev'), // portfolio
  //   tx.pure.string('matt.patt@dev.com'), // contact
  //   coin, // payment coin
  //   devhub, // devhub obj
  //   ],
  //  });

  //  // Sign and execute the transaction block
  //  const result = await signAndExecuteTransactionBlock({ transactionBlock: tx });
  //  console.log(result);
  //  } catch (error) {

  //  // Handle the error
  //  console.error(error);
  //  }

  //  }

  //  const updateCardDescriptionFunction = async () => {

  //  try {

  //   // Calls update_card_description function from the devcard package
  //   tx.moveCall({
  //   target: ${packageObjectId}::devcard::update_card_description,
  //   arguments: [
  //    devhub, // devhub obj
  //    tx.pure.string('New description'),
  //    tx.pure.u64(2)
  //   ],
  //   });

  //   // Sign and execute the transaction block
  //   const result = await signAndExecuteTransactionBlock({ transactionBlock: tx });
  //   console.log({result})
  //  } catch (error) {

  //   // Handle the error
  //   console.error(error);
  //  }

  //  }

  //  const deactivateCard = async () => {

  //   try {

  //   // Calls deactivate_card function from the devcard package
  //   tx.moveCall({
  //    target: ${packageObjectId}::devcard::deactivate_card,
  //    arguments: [
  //    devhub, // devhub obj
  //    tx.pure.u64(1)
  //    ],
  //   });

  //   // Sign and execute the transaction block
  //   const result = await signAndExecuteTransactionBlock({ transactionBlock: tx });
  //   console.log({result})
  //   } catch (error) {

  //   // Handle the error
  //   console.error(error);
  //   }

  //   }

  //  return {handleCreateDeveloperCard, updateCardDescritonFunction, deactivateCard}
};
