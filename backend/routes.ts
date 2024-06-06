import { Router, Request, Response } from "express";
import { hashToField } from "./hashing";
import { isBrowser } from "browser-or-node";
import { VerificationLevel } from "./types";
import { sign } from "crypto";

export const router = Router();

export interface ISuccessResult {
  proof: string;
  merkle_root: string;
  nullifier_hash: string;
  verification_level: VerificationLevel;
}
export interface IVerifyResponse {
  success: boolean;
  code?: string;
  detail?: string;
  attribute?: string | null;
}

export async function verifyCloudProof(
  proof: ISuccessResult,
  app_id: `app_${string}`,
  action: string,
  signal?: string,
  endpoint?: URL | string
): Promise<IVerifyResponse> {
  if (isBrowser) {
    throw new Error("verifyCloudProof can only be used in the backend.");
  }
  console.log(action, "this is action");

  const response = await fetch(
    endpoint ?? `https://developer.worldcoin.org/api/v2/verify/${app_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...proof,
        action,
        signal_hash: hashToField(signal ?? "").digest,
      }),
    }
  );
  console.log("response", await response.json());

  if (response.ok) {
    return { success: true };
  } else {
    return { success: false, ...(await response.json()) } as IVerifyResponse;
  }
}
// Route endpoints
router.get("/hello", (req: Request, res: Response) => {
  res.send({ message: "Hello, world!" });
});

router.post("/data", async (req: Request, res: Response) => {
  console.log("from the baclend");

  const proof = req.body;
  const app_id = process.env.APP_ID as `app_${string}`;
  const action = process.env.ACTION_ID as string;

  const verifyRes = (await verifyCloudProof(
    proof,
    app_id,
    action
  )) as IVerifyResponse;

  if (verifyRes.success) {
    // This is where you should perform backend actions if the verification succeeds
    // Such as, setting a user as "verified" in a database
    res.status(200).send(verifyRes);
  } else {
    // This is where you should handle errors from the World ID /verify endpoint.
    // Usually these errors are due to a user having already verified.
    res.status(400).send(verifyRes);
  }
  // res.send({ receivedData: req.body, proof, app_id, action });
});

// // Additional routes can be added here
// import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//
// };
