// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

interface IUserRegistry {
    function isUserExist(address userAddr) external view returns (bool);

    function registerUser(uint256 worldCoinId, address userAddr) external;
}
