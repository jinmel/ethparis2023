import { ethers } from "hardhat";

async function main() {
  const ERC7007 = await ethers.getContractFactory("ERC7007");
  const erc7007 = await ERC7007.deploy(
    "0x7730Edfb83212BABe9396064d765a3d5afEc671a",
    "0xF45354a2e28af6047f18c85A9724368b7c296B95"
  );
  console.log(`Contract Address: ${erc7007.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// https://gnosis-chiado.blockscout.com/address/0x98bE2E4874a8DF479813Da390F68e31023B98c53
// https://goerli.etherscan.io/address/0x08A2876155647a5478cd9dAb729A3Dc872C5dEE3