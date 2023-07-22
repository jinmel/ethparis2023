import express, { Application, Response, Request } from "express";
import { ethers, Wallet } from "ethers";
import * as dotenv from "dotenv";
import cors from "cors";
import userRegistryJson from "../../contract/artifacts/contracts/UserRegistry.sol/UserRegistry.json";
import { UserRegistry } from "../../contract/typechain-types/contracts/UserRegistry";

const app: Application = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;

dotenv.config();
const privateKey = process.env.PRIVATE_KEY!;
const worldCoinRpcUrl = process.env.WORLDCOIN_RPC_URL!;
const targetRpcUrl = process.env.TARGET_RPC_URL!;
const userRegistryAddr = process.env.USER_REGISTRY_ADDR!;

// const rpcUrl = `https://goerli.infura.io/v3/${infuraKey}`;
const worldCoinProvider = new ethers.providers.JsonRpcProvider(worldCoinRpcUrl);
const targetProvider = new ethers.providers.JsonRpcProvider(targetRpcUrl);

const worldCoinSigner = new ethers.Wallet(privateKey, worldCoinProvider);
const targetSigner = new ethers.Wallet(privateKey, targetProvider);

const userRegistryInterface = new ethers.utils.Interface(userRegistryJson.abi);
const userRegistryContract = new ethers.Contract(
  userRegistryAddr,
  userRegistryJson.abi,
  targetSigner
);
// const xx = new User

app.post("/register", async (req: Request, res: Response) => {
  const data = req.body;
  const userAddr = data.userAddress as string;

  // check if user is registered
  const isRegistered: boolean = await userRegistryContract.isUserExist(
    userAddr
  );
  if (isRegistered) {
    res.sendStatus(404);
  }

  // register on worldcoin to get world id
  const worldId = 5;

  // send to user registry
  await userRegistryContract.registerUser(worldId, userAddr);

  res.json({
    status: 1,
  });
});
