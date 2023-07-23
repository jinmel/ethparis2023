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

export interface WorldIDVerification {
  root: BigNumber;
  group: BigNumber;
  signal: string;
  nullifierHash: BigNumber;
  appID: string;
  actionID: string;
  proof: BigNumber[];
}

app.get("/test", async (req: Request, res: Response) => {
  res.json({
    number: 1,
  });
});

app.post("/register", async (req: Request, res: Response) => {
  const data = req.body;
  const userAddr = data.userAddr as string;
  const group = BigNumber.from(data.group as string);
  const signal = data.signal as string;
  const nullifierHash = BigNumber.from(data.nullifierHash as string);
  const appID = data.appId as string;
  const actionId = data.actionId as string;
  const root = await ethers.utils.defaultAbiCoder.decode(
    ["uint256"],
    data.root as string
  )[0];

  const proof = await ethers.utils.defaultAbiCoder.decode(
    ["uint256[8]"],
    data.proof as string
  )[0];

  // check if user is regitered
  const isRegistered: boolean = await userRegistryContract.isUserExist(
    userAddr
  );
  if (isRegistered) {
    // res.sendStatus(404);
    res.json({
      status: 1,
    });
    return;
  }

  console.log(`isRegistered: ${isRegistered}`);

  const xxx = await signUpContract.worldIDRouter();
  console.log(`xxx: ${xxx}`);

  const worldIDVerif: WorldIDVerification = {
    root: root,
    group: group,
    signal: signal,
    nullifierHash: nullifierHash,
    appID: appID,
    actionID: actionId,
    proof: proof,
  };

  const verifyTx: ContractTransaction = await signUpContract.verify(
    worldIDVerif
  );

  const receipt = await verifyTx.wait();

  console.log(`receipt: ${JSON.stringify(receipt)}`);

  // register on worldcoin to get world id
  const registerUserTx: ContractTransaction =
    await userRegistryContract.registerUser(nullifierHash, userAddr);

  await registerUserTx.wait();

  res.json({
    status: 1,
  });
});

app.listen(PORT, (): void => {
  console.log("SERVER IS UP ON PORT:", PORT);
});
