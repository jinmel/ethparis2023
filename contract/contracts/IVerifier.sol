// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

interface IVerifier {
    function verify(
        bytes[] memory pubInputs,
        bytes memory proof
    ) external view returns (bool);
}
