import express, { Application, Response, Request } from "express";
import { BigNumber, ethers, Wallet, ContractTransaction } from "ethers";
import * as dotenv from "dotenv";
import cors from "cors";
import UserRegistryAbi from "./abi/UserRegistryAbi.json";
import SignUpAbi from "./abi/SignUpAbi.json";

const app: Application = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;

dotenv.config();
const privateKey = process.env.PRIVATE_KEY!;
const worldCoinRpcUrl = process.env.WORLDCOIN_RPC_URL!;
const targetRpcUrl = process.env.TARGET_RPC_URL!;
const userRegistryAddr = process.env.USER_REGISTRY_ADDR!;
const signUpAddr = process.env.SIGN_UP_ADDR!;

// const rpcUrl = `https://goerli.infura.io/v3/${infuraKey}`;
const worldCoinProvider = new ethers.providers.JsonRpcProvider(worldCoinRpcUrl);
const targetProvider = new ethers.providers.JsonRpcProvider(targetRpcUrl);

const worldCoinSigner = new ethers.Wallet(privateKey, worldCoinProvider);
const targetSigner = new ethers.Wallet(privateKey, targetProvider);

const userRegistryContract = new ethers.Contract(
  userRegistryAddr,
  UserRegistryAbi,
  targetSigner
);

const signUpContract = new ethers.Contract(
  signUpAddr,
  SignUpAbi,
  worldCoinSigner
);
// const xx = new User

app.get("/test", async (req: Request, res: Response) => {
  res.json({
    number: 1,
  });
});

app.post("/register", async (req: Request, res: Response) => {
  const data = req.body;
  const userAddr = data.userAddr as string;
  const root = BigNumber.from(data.root as string);
  const group = BigNumber.from(data.group as string);
  const signal = data.signal as string;
  const nullifierHash = BigNumber.from(data.nullifierHash as string);
  const appID = data.appId as string;
  const actionId = data.actionId as string;
  const proof = data.proof.map((p: string) => BigNumber.from(p));

  // check if user is regitered
  const isRegistered: boolean = await userRegistryContract.isUserExist(
    userAddr
  );
  if (isRegistered) {
    res.sendStatus(404);
  }

  console.log(`isRegistered: ${isRegistered}`);
  //   // register on worldcoin to get world id
  //   const worldId = 5;
  //   // send to user registry
  //   await userRegistryContract.registerUser(worldId, userAddr);

  const xxx = await signUpContract.worldIDRouter();
  console.log(`xxx: ${xxx}`);

  const verifyTx: ContractTransaction = await signUpContract.verify(
    root,
    group,
    signal,
    nullifierHash,
    appID,
    actionId,
    proof
  );

  const receipt = await verifyTx.wait();

  console.log(`receipt: ${JSON.stringify(receipt)}`);

  res.json({
    status: 1,
  });
});

app.listen(PORT, (): void => {
  console.log("SERVER IS UP ON PORT:", PORT);
});
