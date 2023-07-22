// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "./IUserRegistry.sol";

contract UserRegistry is IUserRegistry {
    mapping(uint256 worldCoinId => address userAddress)
        public userWorldCoinMapping;
    mapping(address userAddress => uint256 worldCoinId)
        public userWorldCoinReverseMapping;

    address public relayerAddress;

    event UserRegister(uint256 worldCoinId, address userAddr);

    modifier onlyRelayer() {
        require(msg.sender == relayerAddress);
        _;
    }

    constructor(address _relayerAddr) {
        relayerAddress = _relayerAddr;
    }

    function isUserExist(address userAddr) public view returns (bool) {
        return userWorldCoinReverseMapping[userAddr] != 0;
    }

    function registerUser(
        uint256 worldCoinId,
        address userAddr //onlyRelayer
    ) public {
        userWorldCoinMapping[worldCoinId] = userAddr;
        userWorldCoinReverseMapping[userAddr] = worldCoinId;
        emit UserRegister(worldCoinId, userAddr);
    }
}
