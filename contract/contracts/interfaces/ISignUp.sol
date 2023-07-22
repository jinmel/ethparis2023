// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import { WorldIDVerification } from "./WorldIDVerification.sol";

interface ISignUp {
    function verify(
        WorldIDVerification calldata worldIDVerification
    ) external returns (bool);
}
