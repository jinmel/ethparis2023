// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import { ByteHasher } from "./libraries/ByteHasher.sol";
import { ISignUp } from "./interfaces/ISignUp.sol";
import { IWorldIDRouter } from "./interfaces/IWorldIDRouter.sol";
import { WorldIDVerification } from "./interfaces/WorldIDVerification.sol";

contract SignUp is ISignUp {
    using ByteHasher for bytes;

    address public immutable worldIDRouter;

    constructor(address _worldIDRouter) {
        worldIDRouter = _worldIDRouter;
    }

    function verify(
        WorldIDVerification calldata verif
    ) external returns (bool) {
        uint256 signalHash = abi.encodePacked(verif.signal).hashToField();
        uint256 appIDHash = abi.encodePacked(verif.appID).hashToField();
        uint256 externalNullifierHash = abi
            .encodePacked(appIDHash, verif.actionID)
            .hashToField();

        try
            IWorldIDRouter(worldIDRouter).verifyProof(
                verif.root,
                verif.group, // `0` for phone and `1` for orb.
                signalHash,
                verif.nullifierHash,
                externalNullifierHash,
                verif.proof
            )
        {} catch {
            revert("SignUp: invalid WorldIDVerification");
        }

        return true;
    }
}
