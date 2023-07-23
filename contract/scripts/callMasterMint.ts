import { arrayify } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const erc7007Addr = "0x6f8776C3144bc0E6b818140f7837CbDA30E33f8E";
  const erc7007 = await ethers.getContractAt("ERC7007", erc7007Addr);

  const aigcData = arrayify("0x1234");
  const tx = await erc7007.masterMint(aigcData);
  const receipt = await tx.wait();

  console.log(`receipt: ${JSON.stringify(receipt)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// https://gnosis-chiado.blockscout.com/address/0xF45354a2e28af6047f18c85A9724368b7c296B95
