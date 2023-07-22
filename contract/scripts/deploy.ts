import { execSync } from "child_process";
import { Contract } from "ethers";
import { ethers } from "hardhat";

export async function deploySignUp(worldIDRouter: string): Promise<Contract> {
  const SignUp = await ethers.getContractFactory("SignUp");
  const signUp = await SignUp.deploy(worldIDRouter);

  return await signUp.deployed();
}

async function main() {
  execSync("npx hardhat clean && yarn compile", { stdio: "inherit" });

  const args = process.argv.slice(2);

  if (args.length > 3) {
    console.log(
      "Deploy: ts-node ./scripts/deploy.ts polygon signUp worldIDRouter_address"
    );
    throw new Error("Wrong arguments");
  }

  const network = args[0];
  const type = args[1];
  const worldIDRouterAddr = args[2];

  const hre = require("hardhat");

  await hre.changeNetwork(network);

  console.log(`Deploy: start deploying ${type} on ${network}`);

  let contract: Contract;

  if (type === "signUp") {
    contract = await deploySignUp(worldIDRouterAddr);
  } else {
    console.log(
      "Deploy: Wrong arguments. The second argument must be accountFactory or entryPoint."
    );
    throw new Error("Wrong arguments");
  }
  console.log(`Deploy: ${type} is deployed at ${contract.address}`);

  console.log(`Deploy: wait 1 min to let this fact be propagated`);

  await new Promise((timeout) => setTimeout(timeout, 60000));

  console.log(`Deploy: start verifying it`);

  if (type === "signUp") {
    await hre.run("verify:verify", {
      address: contract.address,
      constructorArguments: [worldIDRouterAddr],
    });
  } else {
    console.log(
      "Deploy: Wrong arguments. The second argument must be accountFactory or entryPoint."
    );

    throw new Error("Wrong arguments");
  }
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
