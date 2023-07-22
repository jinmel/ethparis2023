import { ethers } from "hardhat";
import { deploySignUp } from "./deploy";

async function main() {
  const worldIdRouterAddr = "0x163b09b4fE21177c455D850BD815B6D583732432";
  const signUpContract = await deploySignUp(worldIdRouterAddr);

  console.log(`signUpContract: ${signUpContract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
