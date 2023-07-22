import {
  setBalance,
  takeSnapshot,
} from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySignUp } from "../scripts/deploy";
import { WorldIDVerification } from "../scripts/interfaces/component";

describe("Unit test", function () {
  before(async function () {
    // World ID Router on Ethereum mainnet.
    this.worldIDRouter = "0x163b09b4fE21177c455D850BD815B6D583732432";

    this.user = (await ethers.getSigners())[0];

    // Airdrop user.
    await setBalance(this.user.address, ethers.utils.parseEther("10000"));

    // World ID verification.
    this.root = await ethers.utils.defaultAbiCoder.decode(
      ["uint256"],
      "0x2f85c32b46e626a3758e51d2419e1daf9c9311283cb20e7464904c90d03d751e"
    )[0];
    this.group = 1;
    this.signal = "";
    this.nullifierHash = await ethers.utils.defaultAbiCoder.decode(
      ["uint256"],
      "0x2fa9f1941d38f1f23b6bba33ab6527ba0df09d0eead60f96b4eda0a308c698fc"
    )[0];
    this.appID = "app_574b973f44f8e4ce8aef8b29c16aea75";
    this.actionID = "signup";
    this.proof = await ethers.utils.defaultAbiCoder.decode(
      ["uint256[8]"],
      "0x1bff17602ddc47599def741a7b4fe14f6a6da2114ef459e608827e91af76cdb50ce5e642a86184e056d63f978508b70953a20d0dd495cd83cad7382eedefc93f2449ffb44446ce8d759634688cee46950e67ab06c6d20165d3d24fdcd3a55a72013ae8db0f19f352ca89a958119daeb03e9c7e3725c51b0d69f38430c1e809471a8f28447aa546d8fac9e404e608aa36139c69de3b5274cac94f626d249c581d2229bc17cd857a34cbf4758d31f673df1bfffe56d3621f16d4617bf16022ae8f1cc614b8fdfe79ee1f01346bfe4b8f53b58109d686455e4faf3c4c26b6a4795b0822c5c43d414c399dc3dc83344d27f6b7fa8988d12484066b468034410f5187"
    )[0];

    // SignUp contract.
    this.signUp = await deploySignUp(this.worldIDRouter);

    // Take snapshot.
    this.snapshot = await takeSnapshot();
  });

  beforeEach(async function () {
    // Restore snapshot.
    await this.snapshot.restore();
  });

  describe("Verify", async function () {
    it("should succeed to verify on-chain", async function () {
      const worldIDVerif: WorldIDVerification = {
        root: this.root,
        group: this.group,
        signal: this.signal,
        nullifierHash: this.nullifierHash,
        appID: this.appID,
        actionID: this.actionID,
        proof: this.proof,
      };

      console.log(worldIDVerif);
      // console.log(JSON.stringify(worldIDVerif));

      await expect(this.signUp.connect(this.user).verify(worldIDVerif)).not.to
        .be.reverted;
    });
  });
});
