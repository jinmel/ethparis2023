import { ethers } from "hardhat";

async function main() {

  const UserRegistry = await ethers.getContractFactory("UserRegistry");
  const userRegistry = await UserRegistry.deploy(
    "0x7730Edfb83212BABe9396064d765a3d5afEc671a"
  );
  console.log(`Contract Address: ${userRegistry.address}`);

//   const tx = await userRegistry.registerUser(1, ethers.constants.AddressZero)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// https://gnosis-chiado.blockscout.com/address/0xF45354a2e28af6047f18c85A9724368b7c296B95
// https://goerli.etherscan.io/address/0x9e41d00B2a6857491DC4a0aE5164215077348975